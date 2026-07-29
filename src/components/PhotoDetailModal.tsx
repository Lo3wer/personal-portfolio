'use client'

import { useEffect } from 'react'
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
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.comment}
          className="w-full max-h-[calc(100vh-10rem)] object-cover rounded-t-2xl"
        />
        <div className="p-4 space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{photo.timestamp}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{photo.location}</p>
          {photo.comment && <p className="text-gray-700 dark:text-gray-300">{photo.comment}</p>}
        </div>
      </div>
    </div>
  )
}
