'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import type { MapPhoto } from '@/lib/photoMapData'

type Props = {
  photo: MapPhoto
  onClose: () => void
}

export default function PhotoDetailModal({ photo, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-auto max-h-[70vh]" style={{ aspectRatio: '4/3' }}>
          <Image
            src={photo.src}
            alt={photo.comment}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        <div className="p-6 space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">{photo.timestamp}</p>
          <p className="text-gray-700 dark:text-gray-300">{photo.comment}</p>
        </div>
      </div>
    </div>
  )
}
