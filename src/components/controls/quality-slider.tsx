'use client'

import React from 'react'
import { useImageStore } from '@/store/image-store'

export function QualitySlider() {
  const { quality, setQuality } = useImageStore()

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          压缩质量
        </label>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(quality * 100)}%
        </span>
      </div>
      <div className="space-y-2">
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.01"
          value={quality}
          onChange={(e) => setQuality(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>低质量</span>
          <span>高质量</span>
        </div>
      </div>
    </div>
  )
}