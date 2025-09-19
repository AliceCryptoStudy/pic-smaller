'use client'

import React from 'react'
import { useImageStore } from '@/store/image-store'
import { formatFileSize } from '@/lib/utils'

export function StatsPanel() {
  const { images } = useImageStore()
  
  const totalFiles = images.length
  const originalSize = images.reduce((sum, img) => sum + img.originalSize, 0)
  const compressedSize = images.reduce((sum, img) => sum + (img.compressedSize || 0), 0)
  const compressionRatio = originalSize > 0 ? ((originalSize - compressedSize) / originalSize * 100) : 0

  if (totalFiles === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        压缩统计
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-blue-500">📁</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">总文件数</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalFiles}
          </div>
        </div>
        
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-green-500">💾</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">原始大小</span>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatFileSize(originalSize)}
          </div>
        </div>
        
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-purple-500">📉</span>
           <span className="text-sm text-gray-600 dark:text-gray-400">压缩后大小</span>
          </div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatFileSize(compressedSize)}
          </div>
        </div>
      </div>
      
      {compressedSize > 0 && (
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">节省空间</span>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatFileSize(originalSize - compressedSize)} ({compressionRatio.toFixed(1)}%)
            </div>
          </div>
        </div>
      )}
    </div>
  )
}