'use client'

import React from 'react'
import { useImageStore } from '../../store/image-store'
import { ImageCard } from './image-card'

export function ImagePreview() {
  const { images } = useImageStore()

  if (images.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        图片列表 ({images.length})
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  )
}