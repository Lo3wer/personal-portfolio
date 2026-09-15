'use client'

import { useEffect, useRef } from 'react'

export interface Character3DProps {
  className?: string
  modelUrl?: string
}

export default function Character3D({
  className,
  modelUrl = '/models/dinosaur.glb',
}: Character3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let animationId = 0
    let renderer: import('three').WebGLRenderer | null = null
    let controls: import('three/addons/controls/OrbitControls.js').OrbitControls | null = null
    let resizeObserver: ResizeObserver | null = null
    let themeObserver: MutationObserver | null = null
    let mixer: import('three').AnimationMixer | null = null
    let hasUserInteracted = false
    let onInteractionStart: (() => void) | null = null

    async function init() {
      const THREE = await import('three')
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js')
      const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')
      if (cancelled || !container) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
      camera.position.set(0, 2.2, 6.5)
      camera.lookAt(0, 1.5, 0)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      container.appendChild(renderer.domElement)
      renderer.domElement.style.display = 'block'
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      renderer.domElement.style.touchAction = 'pan-y'

      controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 1.5, 0)
      controls.enableZoom = false
      controls.enablePan = false
      controls.enableDamping = true
      controls.minPolarAngle = Math.PI * 0.25
      controls.maxPolarAngle = Math.PI * 0.65

      onInteractionStart = () => {
        hasUserInteracted = true
      }
      controls.addEventListener('start', onInteractionStart)

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 1.2))
      const key = new THREE.DirectionalLight(0xffffff, 2.2)
      key.position.set(4, 6, 4)
      scene.add(key)
      const rim = new THREE.DirectionalLight(0xffffff, 1.4)
      rim.position.set(-4, 3, -3)
      scene.add(rim)
      const setRimForTheme = () => {
        rim.color.setHex(document.documentElement.classList.contains('dark') ? 0x4a6b9f : 0x5eead4)
      }
      setRimForTheme()
      themeObserver = new MutationObserver(setRimForTheme)
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
      const bounce = new THREE.DirectionalLight(0xffffff, 0.7)
      bounce.position.set(0, -2, 3)
      scene.add(bounce)

      // Initial placeholder (waves until model is loaded or on load failure)
      const placeholder = buildPlaceholder(THREE)
      scene.add(placeholder.group)

      const pivotGroup = new THREE.Group()
      scene.add(pivotGroup)

      const modelState = {
        mode: 'placeholder' as 'placeholder' | 'clip' | 'wave' | 'static',
        arm: placeholder.leftArm as import('three').Object3D | null,
        armAxis: placeholder.armAxis as 'x' | 'z',
        armBase: placeholder.armBase,
        pivotGroup,
      }

      // Candidate models to try in sequence
      const candidateUrls = [
        modelUrl,
        '/models/dinosaur.glb',
        '/models/character.glb',
      ].filter((url, idx, self) => Boolean(url) && self.indexOf(url) === idx)

      const loader = new GLTFLoader()

      function tryLoadModel(urlIndex: number) {
        if (urlIndex >= candidateUrls.length) {
          // All candidates failed, stay with waving placeholder
          return
        }

        const currentUrl = candidateUrls[urlIndex]
        loader.load(
          currentUrl,
          (gltf) => {
            if (cancelled) return

            // Remove and dispose initial placeholder
            scene.remove(placeholder.group)
            placeholder.dispose()

            const model = gltf.scene

            // Center & normalize scale inside pivotGroup
            const box = new THREE.Box3().setFromObject(model)
            const size = box.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z) || 1
            const targetHeight = 3.4
            const scale = targetHeight / maxDim
            model.scale.setScalar(scale)

            // Recompute bounding box after scale and shift model to center at (0, 0, 0)
            box.setFromObject(model)
            const center = box.getCenter(new THREE.Vector3())
            model.position.sub(center)

            pivotGroup.add(model)
            pivotGroup.position.set(0, 1.5, 0)

            // Tier 1: Check for embedded animation clips
            if (gltf.animations && gltf.animations.length > 0) {
              mixer = new THREE.AnimationMixer(model)
              const waveClip =
                gltf.animations.find((clip) =>
                  /wave|hi|hello|greet|salute/i.test(clip.name)
                ) || gltf.animations[0]
              const action = mixer.clipAction(waveClip)
              action.play()
              modelState.mode = 'clip'
              return
            }

            // Tier 2: Check for skeletal arm/hand bones to wave procedurally
            let foundArm: import('three').Object3D | null = null
            model.traverse((o) => {
              if (foundArm) return
              const name = o.name.toLowerCase()
              if (
                name.includes('leftarm') ||
                name.includes('arm.l') ||
                name.includes('upperarm.l') ||
                name.includes('upper_arm.l') ||
                name.includes('leftupperarm') ||
                name.includes('mixamorig:leftarm') ||
                name.includes('mixamorigleftarm') ||
                name.includes('bip01 l upperarm')
              ) {
                foundArm = o
              }
            })

            if (foundArm) {
              const arm = foundArm as import('three').Object3D
              modelState.arm = arm
              modelState.armAxis = arm.name.toLowerCase().includes('mixamo') ? 'z' : 'x'
              modelState.armBase = arm.rotation[modelState.armAxis]
              modelState.mode = 'wave'
              return
            }

            // Tier 3: Static mesh fallback
            modelState.mode = 'static'
          },
          undefined,
          () => {
            // Try next candidate model
            tryLoadModel(urlIndex + 1)
          }
        )
      }

      tryLoadModel(0)

      const timer = new THREE.Timer()

      function animate(timestamp?: number) {
        animationId = requestAnimationFrame(animate)
        if (timestamp !== undefined) {
          timer.update(timestamp)
        } else {
          timer.update()
        }

        const delta = timer.getDelta()
        const t = timer.getElapsed()

        if (mixer) {
          mixer.update(delta)
        }

        // Slowly rotate initially, permanently stops once user interacts/moves it
        if (!hasUserInteracted && modelState.mode === 'static') {
          pivotGroup.rotation.y += delta * 0.5
        }

        if (
          (modelState.mode === 'wave' || modelState.mode === 'placeholder') &&
          modelState.arm
        ) {
          const wave = Math.sin(t * 4) * 0.45 + 0.25
          modelState.arm.rotation[modelState.armAxis] = modelState.armBase + wave
        }

        controls?.update()
        renderer?.render(scene, camera)
      }
      animate()

      const setSize = () => {
        if (!container || !renderer) return
        const w = container.clientWidth
        const h = container.clientHeight
        if (w === 0 || h === 0) return
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      setSize()
      resizeObserver = new ResizeObserver(setSize)
      resizeObserver.observe(container)
    }

    init()

    return () => {
      cancelled = true
      cancelAnimationFrame(animationId)
      if (controls && onInteractionStart) {
        controls.removeEventListener('start', onInteractionStart)
      }
      controls?.dispose()
      resizeObserver?.disconnect()
      themeObserver?.disconnect()
      mixer?.stopAllAction()
      renderer?.dispose()
      if (renderer && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [modelUrl])

  return (
    <div
      ref={containerRef}
      className={className}
      role="img"
      aria-label="3D model showcase"
      style={{ cursor: 'grab' }}
    />
  )
}

function buildPlaceholder(THREE: typeof import('three')) {
  const group = new THREE.Group()
  const disposables: { dispose: () => void }[] = []

  const skinMat = new THREE.MeshStandardMaterial({ color: 0xf1c27d, roughness: 0.7 })
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0x4f83cc, roughness: 0.5 })
  const pantsMat = new THREE.MeshStandardMaterial({ color: 0x37474f, roughness: 0.6 })
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x2d2d2d, roughness: 0.8 })
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4 })
  ;[skinMat, shirtMat, pantsMat, hairMat, eyeMat, pupilMat].forEach((m) => disposables.push(m))

  const add = (
    parent: import('three').Object3D,
    geo: import('three').BufferGeometry,
    mat: import('three').Material,
    x: number,
    y: number,
    z: number,
    rx = 0,
    ry = 0,
    rz = 0
  ) => {
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(x, y, z)
    mesh.rotation.set(rx, ry, rz)
    parent.add(mesh)
    disposables.push(geo)
  }

  const bodyGeo = new THREE.CapsuleGeometry(0.42, 1.1, 8, 16)
  add(group, bodyGeo, shirtMat, 0, 1.55, 0)
  const bellyGeo = new THREE.CapsuleGeometry(0.3, 0.35, 8, 16)
  add(group, bellyGeo, pantsMat, 0, 0.62, 0)

  const headGeo = new THREE.SphereGeometry(0.42, 32, 32)
  add(group, headGeo, skinMat, 0, 2.55, 0)
  const hairGeo = new THREE.SphereGeometry(0.44, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55)
  add(group, hairGeo, hairMat, 0, 2.58, 0)

  const eyeGeo = new THREE.SphereGeometry(0.07, 16, 16)
  const pupilGeo = new THREE.SphereGeometry(0.035, 12, 12)
  for (const side of [-1, 1]) {
    add(group, eyeGeo, eyeMat, 0.15 * side, 2.62, 0.36)
    add(group, pupilGeo, pupilMat, 0.15 * side, 2.62, 0.42)
  }

  const legGeo = new THREE.CapsuleGeometry(0.16, 0.75, 8, 12)
  for (const side of [-1, 1]) {
    add(group, legGeo, pantsMat, 0.18 * side, 0.35, 0)
  }

  const armGeo = new THREE.CapsuleGeometry(0.14, 0.7, 8, 12)
  const rightArm = new THREE.Group()
  rightArm.position.set(0.55, 2.15, 0)
  rightArm.rotation.z = -0.35
  const rightMesh = new THREE.Mesh(armGeo, shirtMat)
  rightMesh.position.y = -0.45
  rightArm.add(rightMesh)
  disposables.push(armGeo)
  group.add(rightArm)

  const leftArm = new THREE.Group()
  leftArm.position.set(-0.55, 2.15, 0)
  leftArm.rotation.z = -1.5
  const leftMesh = new THREE.Mesh(armGeo, shirtMat)
  leftMesh.position.y = -0.45
  leftArm.add(leftMesh)
  group.add(leftArm)

  group.position.y = -0.05

  return {
    group,
    leftArm,
    armAxis: 'z' as const,
    armBase: -1.5,
    dispose: () => disposables.forEach((d) => d.dispose()),
  }
}
