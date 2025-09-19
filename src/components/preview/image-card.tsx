'use client'

import React, { useState } from 'react'
import { Download, Eye, Trash2, RotateCcw } from 'lucide-react'
import { ImageItem } from '@/types/image'
import { useImageStore } from '@/store/image-store'
import { formatFileSize } from '@/lib/utils'

interface ImageCardProps {
  image: ImageItem
}

export function ImageCard({ image }: ImageCardProps) {
  const { removeImage, compressImage } = useImageStore()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleDownload = () => {
    if (image.compressedBlob) {
      const url = URL.createObjectURL(image.compressedBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `compressed_${image.name}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const compressionRatio = image.compressedSize 
    ? ((image.originalSize - image.compressedSize) / image.originalSize * 100)
    : 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
        <img
          src={image.preview}
          alt={image.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-200"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-white truncate mb-2">
          {image.name}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>原始大小:</span>
            <span>{formatFileSize(image.originalSize)}</span>
          </div>
          
          {image.compressedSize && (
            <>
              <div className="flex justify-between">
                <span>压缩后:</span>
                <span className="text-green-600 dark:text-green-400">
                  {formatFileSize(image.compressedSize)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>节省:</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {compressionRatio.toFixed(1)}%
                </span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex gap-2 mt-4">
          {!image.compressed && (
            <button
              onClick={() => compressImage(image.id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              压缩
            </button>
          )}
          
          {image.compressed && (
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
            >
              <Download className="w-4 h-4" />
              下载
            </button>
          )}
          
          <button
            onClick={() => removeImage(image.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        {image.status === 'compressing' && (
          <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-sm text-blue-600 dark:text-blue-400">压缩中...</span>
            </div>
          </div>
        )}
        
        {image.status === 'error' && (
          <div className="mt-3 bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
            <span className="text-sm text-red-600 dark:text-red-400">压缩失败</span>
          </div>
        )}
      </div>
    </div>
  )
}