'use client'

import React, { useState } from 'react'
import { ImageItem } from '../../types/image'
import { useImageStore } from '../../store/image-store'
import { formatFileSize } from '../../lib/utils'

interface ImageCardProps {
  image: ImageItem
}

export function ImageCard({ image }: ImageCardProps) {
  const { removeImage, downloadImage } = useImageStore()
  const [showComparison, setShowComparison] = useState(false)

  const getStatusColor = (status: ImageItem['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: ImageItem['status']) => {
    switch (status) {
      case 'pending': return '待处理'
      case 'processing': return '处理中'
      case 'completed': return '已完成'
      case 'error': return '处理失败'
      default: return '未知状态'
    }
  }

  const compressionRatio = image.compressedSize 
    ? Math.round(((image.originalSize - image.compressedSize) / image.originalSize) * 100)
    : 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="aspect-video relative bg-gray-100 dark:bg-gray-700">
        <img
          src={image.preview}
          alt={image.file.name}
          className="w-full h-full object-cover"
        />
        
        {image.status === 'completed' && image.compressedFile && (
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
            title="对比查看"
          >
            👁️
          </button>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {image.file.name}
          </h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(image.status)}`}>
            {getStatusText(image.status)}
          </span>
        </div>
        
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
                <span>压缩率:</span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {compressionRatio}%
                </span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => removeImage(image.id)}
            className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            🗑️ 删除
          </button>
          
          {image.status === 'completed' && (
            <button
              onClick={() => downloadImage(image.id)}
              className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              💾 下载
            </button>
          )}
        </div>
      </div>
    </div>
  )
}