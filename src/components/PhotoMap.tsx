'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { MapPhoto } from '@/lib/photoMapData'
import type { Map as LeafletMap, TileLayer, Marker } from 'leaflet'
import PhotoDetailModal from './PhotoDetailModal'

type Props = {
  photos: MapPhoto[]
}

const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
const WORLD_BOUNDS: [[number, number], [number, number]] = [[-60, -180], [85, 180]]

function markerHtml(src: string): string {
  return `<div style="width:48px;height:48px;overflow:hidden;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);cursor:pointer;background:#e5e7eb;"><img src="${src}" alt="" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/></div>`
}

export default function PhotoMap({ photos }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  const tileLayerRef = useRef<TileLayer | null>(null)
  const markersRef = useRef<Marker[]>([])
  const observerRef = useRef<MutationObserver | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<MapPhoto | null>(null)
  const visiblePhotos = photos.filter(p => p.lat !== null && p.lng !== null && p.location)

  useEffect(() => {
    if (!mapRef.current) return
    let L: typeof import('leaflet')
    let map: LeafletMap
    let cancelled = false

    async function init() {
      const mod = await import('leaflet')
      await import('leaflet/dist/leaflet.css')
      if (cancelled) return
      L = mod

      const isDark = document.documentElement.classList.contains('dark')
      const containerWidth = mapRef.current!.clientWidth
      const tileSize = 256
      const minZoom = Math.max(1, Math.floor(Math.log2(containerWidth / tileSize)))

      map = L.map(mapRef.current!, {
        zoomControl: false,
        attributionControl: false,
        center: [20, 0],
        zoom: minZoom,
        minZoom,
        maxBounds: WORLD_BOUNDS,
        maxBoundsViscosity: 1,
      })

      L.control.zoom({ position: 'bottomright' }).addTo(map)

      tileLayerRef.current = L.tileLayer(isDark ? DARK_TILES : LIGHT_TILES, {
        maxZoom: 20,
        noWrap: true,
      }).addTo(map)

      visiblePhotos.forEach((photo) => {
        const icon = L.divIcon({
          className: '',
          html: markerHtml(photo.src),
          iconSize: [48, 48],
          iconAnchor: [24, 24],
        })

        const marker = L.marker([photo.lat!, photo.lng!], { icon }).addTo(map)
        marker.on('click', () => setSelectedPhoto(photo))
        markersRef.current.push(marker)
      })

      mapInstanceRef.current = map

      observerRef.current = new MutationObserver(() => {
        const dark = document.documentElement.classList.contains('dark')
        if (tileLayerRef.current) {
          map.removeLayer(tileLayerRef.current)
        }
        tileLayerRef.current = L.tileLayer(dark ? DARK_TILES : LIGHT_TILES, {
          maxZoom: 20,
          noWrap: true,
        }).addTo(map)
      })
      observerRef.current.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })
    }

    init()

    return () => {
      cancelled = true
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      markersRef.current = []
      tileLayerRef.current = null
    }
  }, [photos])

  useEffect(() => {
    if (!selectedPhoto && mapInstanceRef.current) {
      requestAnimationFrame(() => mapInstanceRef.current?.invalidateSize())
    }
  }, [selectedPhoto])

  return (
    <>
      <div
        ref={mapRef}
        className="w-full rounded-xl overflow-hidden isolate bg-[#f2efe9] dark:bg-[#222]"
        style={{ height: '70vh', minHeight: '400px' }}
      />
      {selectedPhoto && createPortal(
        <PhotoDetailModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />,
        document.body
      )}
    </>
  )
}
