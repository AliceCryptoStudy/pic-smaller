'use client'

import React from 'react'
import { useImageStore } from '@/store/image-store'
import { QualitySlider } from './quality-slider'
import { FormatSelector } from './format-selector'
import { ResizeOptions } from './resize-options'
import { Download, RotateCcw } from 'lucide-react'

export function CompressControls() {
  const { images, compressAll, downloadAll, resetAll } = useImageStore()
  
  const hasImages = images.length > 0
  const hasCompressedImages = images.some(img => img.compressed)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        压缩设置
      </h2>
      
      <div className="space-y-4">
        <QualitySlider />
        <FormatSelector />
        <ResizeOptions />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={compressAll}
          disabled={!hasImages}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>🗜️</span>
          开始压缩
        </button>
        
        <button
          onClick={downloadAll}
          disabled={!hasCompressedImages}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          下载全部
        </button>
        
        <button
          onClick={resetAll}
          disabled={!hasImages}
          className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          重置
        </button>
      </div>
    </div>
  )
}