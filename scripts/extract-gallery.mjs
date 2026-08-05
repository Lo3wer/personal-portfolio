import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'fs'
import { join, parse, extname, basename } from 'path'
import exifr from 'exifr'
import sharp from 'sharp'
import heicConvert from 'heic-convert'
import piexif from 'piexifjs'

const THUMB_DIR = 'public/thumbnails'
const THUMB_SIZE = 64
const DELAY_MS = 1100

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function reverseGeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=10&accept-language=en`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'personal-portfolio/1.0' },
  })
  const data = await res.json()
  const a = data.address || {}
  const city = a.city || a.town || a.village || ''
  const country = a.country || ''

  let region = ''
  if (a.state && a.state !== city) {
    region = a.state
  } else if (a.county && a.county !== city) {
    region = a.county
  }

  if (!region && data.display_name) {
    const parts = data.display_name.split(', ').map(s => s.trim())
    const known = new Set([
      a.house_number, a.road, a.neighbourhood, a.suburb,
      a.city, a.town, a.village, a.hamlet,
      a.postcode, country, a.country_code,
    ].filter(Boolean))
    const extra = parts.filter(p => !known.has(p))
    region = extra[0] || ''
  }

  return [city, region, country].filter(Boolean).join(', ')
}

function ensureThumbDir() {
  if (!existsSync(THUMB_DIR)) mkdirSync(THUMB_DIR, { recursive: true })
}

function cleanThumbDir() {
  if (existsSync(THUMB_DIR)) {
    for (const f of readdirSync(THUMB_DIR)) {
      rmSync(join(THUMB_DIR, f))
    }
  }
}

function dms(v) {
  const d = Math.floor(v)
  const mf = (v - d) * 60
  const m = Math.floor(mf)
  const s = Math.round((mf - m) * 60)
  return [[d, 1], [m, 1], [s, 1]]
}

function toExifDate(date) {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}:${pad(date.getMonth() + 1)}:${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function rotateForOrientation(orientation) {
  switch (orientation) {
    case 3: return 180
    case 6: return 90
    case 8: return 270
    default: return 0
  }
}

function embedExif(jpegBuffer, { date, lat, lng }) {
  const zeroth = { [piexif.ImageIFD.ExifTag]: 0x8769 }
  const exif = {}
  if (date) exif[piexif.ExifIFD.DateTimeOriginal] = toExifDate(date)
  const gps = lat !== null && lng !== null ? {
    [piexif.GPSIFD.GPSVersionID]: [2, 2, 0, 0],
    [piexif.GPSIFD.GPSLatitudeRef]: lat >= 0 ? 'N' : 'S',
    [piexif.GPSIFD.GPSLatitude]: dms(Math.abs(lat)),
    [piexif.GPSIFD.GPSLongitudeRef]: lng >= 0 ? 'E' : 'W',
    [piexif.GPSIFD.GPSLongitude]: dms(Math.abs(lng)),
  } : {}
  const bytes = piexif.dump({ '0th': zeroth, 'Exif': exif, 'GPS': gps })
  return Buffer.from(piexif.insert(bytes, jpegBuffer.toString('binary')), 'binary')
}

async function convertHeicToJpg(filePath) {
  const ext = extname(filePath)
  if (!HEIC_EXTS.has(ext)) return null
  const jpgPath = filePath.slice(0, -ext.length) + '.jpg'
  if (existsSync(jpgPath)) {
    rmSync(filePath)
    console.log(`  ${basename(filePath)} → original removed (JPG already exists)`)
    return jpgPath
  }

  const original = readFileSync(filePath)
  const exif = await exifr.parse(original, { gps: true, pick: ['DateTimeOriginal', 'latitude', 'longitude', 'Orientation'] })
  const meta = await sharp(original).metadata()
  const orientation = meta.orientation || 1

  let jpeg = Buffer.from(await heicConvert({ buffer: original, format: 'JPEG', quality: 0.92 }))

  if (rotateForOrientation(orientation) !== 0) {
    jpeg = await sharp(jpeg).rotate(rotateForOrientation(orientation)).toBuffer()
  }

  jpeg = embedExif(jpeg, {
    date: exif?.DateTimeOriginal ?? null,
    lat: exif?.latitude ?? null,
    lng: exif?.longitude ?? null,
  })

  writeFileSync(jpgPath, jpeg)
  rmSync(filePath)
  console.log(`  ${basename(filePath)} → converted to JPG (orientation ${orientation})`)
  return jpgPath
}

async function generateThumbnail(srcPath, thumbPath) {
  try {
    await sharp(srcPath).rotate().resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover' }).toFile(thumbPath)
    console.log(`  thumbnail generated: ${basename(thumbPath)}`)
  } catch (e) {
    console.log(`  thumbnail failed: ${e.message}`)
  }
}

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.heic', '.HEIC', '.heif', '.HEIF', '.JPG', '.JPEG', '.PNG'])
const HEIC_EXTS = new Set(['.heic', '.HEIC', '.heif', '.HEIF'])
const GALLERY_DIR = 'public/images/gallery'
const STATIC_GALLERY_DIR = 'public/images/static_gallery'

function loadExistingEntries(filePath) {
  const map = {}
  try {
    const content = readFileSync(filePath, 'utf-8')
    const blockRegex = /  \{\n[\s\S]*?  \},/g
    const idRegex = /id:\s+'([^']+)'/
    let match
    while ((match = blockRegex.exec(content)) !== null) {
      const block = match[0]
      const idMatch = idRegex.exec(block)
      if (idMatch) {
        map[idMatch[1]] = block
      }
    }
  } catch {
    // File doesn't exist yet
  }
  return map
}

function writeDataFile(filePath, varName, entries) {
  const output = `// Auto-generated by scripts/extract-gallery.mjs
// Run: npm run extract-gallery

import type { MapPhoto } from '@/lib/photoMapData'

export const ${varName}: MapPhoto[] = [
${entries.join('\n')}
]
`

  console.log(output)
  writeFileSync(filePath, output, 'utf-8')
  console.log(`\nWritten to ${filePath} (${entries.length} photos)`)
}

async function processDirectory(dir, srcPrefix, outputFile, varName, existingMap, skipGeocode, moveNoGpsTo) {
  ensureThumbDir()
  const files = readdirSync(dir)
    .filter(f => IMAGE_EXTS.has(extname(f)))
    .sort()

  if (files.length === 0) {
    console.log('No images found in', dir)
    writeDataFile(outputFile, varName, [])
    return
  }

  const entries = []

  for (const file of files) {
    const filePath = join(dir, file)
    const convertedPath = await convertHeicToJpg(filePath)
    const processedFile = convertedPath ? basename(convertedPath) : file
    const processedPath = convertedPath || filePath
    const id = parse(processedFile).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const thumbPath = join(THUMB_DIR, processedFile)
    const thumbUrl = `/thumbnails/${processedFile}`
    await generateThumbnail(processedPath, thumbPath)

    if (existingMap && existingMap[id]) {
      let entry = existingMap[id]

      const existingSrc = entry.match(/src:\s*'([^']*)'/)?.[1] ?? ''
      const existingThumb = entry.match(/thumb:\s*'([^']*)'/)?.[1] ?? ''

      if (existingSrc && extname(existingSrc) !== extname(processedFile)) {
        entry = entry.replace(/src:\s*'([^']*)'/, `src: '${srcPrefix}/${processedFile}'`)
        console.log(`  ${file} → updated src to ${processedFile}`)
      }

      if (existingThumb && extname(existingThumb) !== extname(processedFile)) {
        entry = entry.replace(/thumb:\s*'([^']*)'/, `thumb: '${thumbUrl}'`)
      }

      if (!entry.includes('thumb:')) {
        entry = entry.replace(/^\s+src:/m, `    thumb: '${thumbUrl}',\n    src:`)
      }

      const latM = entry.match(/lat:\s*([^,\s]+)/)
      const lngM = entry.match(/lng:\s*([^,\s]+)/)
      const locM = entry.match(/location:\s*'([^']*)'/)
      const el = parseFloat(latM?.[1]), nl = parseFloat(lngM?.[1])

      if (!isNaN(el) && !isNaN(nl) && locM && !locM[1]) {
        const name = (await reverseGeocode(el, nl)).replace(/'/g, "\\'")
        entry = entry.replace(/location:\s*'[^']*'/, `location: '${name}'`)
        console.log(`  ${processedFile} → geocoded location: ${name}`)
        await sleep(DELAY_MS)
      } else {
        console.log(`  ${processedFile} → preserved existing entry`)
      }

      entries.push(entry)
      continue
    }

    const stats = statSync(processedPath)

    let lat = null
    let lng = null

    let timestamp
    try {
      const exif = await exifr.parse(processedPath, { gps: true })
      timestamp = exif?.DateTimeOriginal
        ? new Date(exif.DateTimeOriginal).toISOString().split('T')[0]
        : stats.birthtime.toISOString().split('T')[0]
      lat = exif?.latitude ?? null
      lng = exif?.longitude ?? null
      if (lat === null) console.log(`  ${processedFile} → no GPS data`)
    } catch (e) {
      console.log(`  ${processedFile} → error: ${e.message}`)
      timestamp = stats.birthtime.toISOString().split('T')[0]
    }

    if (lat === null && moveNoGpsTo) {
      const dest = join(moveNoGpsTo, processedFile)
      renameSync(processedPath, dest)
      console.log(`  ${processedFile} → moved to static_gallery/`)
      continue
    }

    const latStr = lat !== null ? lat.toFixed(4) : 'null'
    const lngStr = lng !== null ? lng.toFixed(4) : 'null'

    let location = ''

    if (!skipGeocode && lat !== null && lng !== null) {
      try {
        location = (await reverseGeocode(lat, lng)).replace(/'/g, "\\'")
        console.log(`  ${processedFile} → ${location}`)
        await sleep(DELAY_MS)
      } catch {
        console.log(`  ${processedFile} → geocode failed`)
      }
    }

    const entry = `  {
    id: '${id}',
    lat: ${latStr},
    lng: ${lngStr},
    src: '${srcPrefix}/${processedFile}',
    thumb: '${thumbUrl}',
    timestamp: '${timestamp}',
    comment: '',
    location: '${location}',
  },`

    entries.push(entry)
  }

  writeDataFile(outputFile, varName, entries)
}

async function main() {
  cleanThumbDir()
  ensureThumbDir()

  // Process gallery/ (preserve existing entries, move GPS-less images to static_gallery/)
  console.log('=== Gallery ===')
  const galleryExisting = loadExistingEntries('src/lib/galleryData.ts')
  await processDirectory(GALLERY_DIR, '/images/gallery', 'src/lib/galleryData.ts', 'galleryData', galleryExisting, false, STATIC_GALLERY_DIR)

  // Process static_gallery/ (preserve existing entries, no auto-geocode)
  console.log('\n=== Static Gallery ===')
  const staticExisting = loadExistingEntries('src/lib/staticGalleryData.ts')
  await processDirectory(STATIC_GALLERY_DIR, '/images/static_gallery', 'src/lib/staticGalleryData.ts', 'staticGalleryData', staticExisting, true)
}

main().catch(console.error)
