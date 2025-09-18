'use client'

import React from 'react'
import { useImageStore } from '../../store/image-store'
import { QualitySlider } from './quality-slider'
import { FormatSelector } from './format-selector'
import { ResizeOptions } from './resize-options'

export function CompressControls() {
  const { images, isProcessing, compressImages, clearImages, downloadAll } = useImageStore()
  
  const hasImages = images.length > 0
  const hasCompressedImages = images.some(img => img.status === 'completed')
  const hasPendingImages = images.some(img => img.status === 'pending')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          ⚙️ 压缩设置
        </h3>
        
        <div className="space-y-4">
          <QualitySlider />
          <FormatSelector />
          <ResizeOptions />
        </div>
      </div>
      
      {hasImages && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            🚀 操作
          </h3>
          
          <div className="space-y-3">
            <button
              onClick={compressImages}
              disabled={isProcessing || !hasPendingImages}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
            >
              {isProcessing ? '🔄 压缩中...' : '🎯 开始压缩'}
            </button>
            
            {hasCompressedImages && (
              <button
                onClick={downloadAll}
                className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                📦 下载全部
              </button>
            )}
            
            <button
              onClick={clearImages}
              className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              🗑️ 清空列表
            </button>
          </div>
        </div>
      )}
    </div>
  )
}