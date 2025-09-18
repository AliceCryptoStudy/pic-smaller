'use client'

import React from 'react'
import { useImageStore } from '../../store/image-store'
import { formatFileSize } from '../../lib/utils'

export function StatsPanel() {
  const { images } = useImageStore()
  
  const totalFiles = images.length
  const completedFiles = images.filter(img => img.status === 'completed').length
  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0)
  const totalCompressedSize = images.reduce((sum, img) => sum + (img.compressedSize || 0), 0)
  const totalSaved = totalOriginalSize - totalCompressedSize
  const compressionRatio = totalOriginalSize > 0 ? Math.round((totalSaved / totalOriginalSize) * 100) : 0

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        📊 统计信息
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">📁</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">总文件数</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {completedFiles}/{totalFiles}
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">💾</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">原始大小</span>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatFileSize(totalOriginalSize)}
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-purple-500">📉</span>
           <span className="text-sm text-gray-600 dark:text-gray-400">压缩后大小</span>
          </div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatFileSize(totalCompressedSize)}
          </div>
        </div>
        
        {totalSaved > 0 && (
          <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-orange-500">🎯</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">节省空间</span>
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {formatFileSize(totalSaved)} ({compressionRatio}%)
            </div>
          </div>
        )}
      </div>
    </div>
  )
}