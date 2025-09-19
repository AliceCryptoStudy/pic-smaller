'use client'

import React from 'react'
import { useImageStore } from '@/store/image-store'

export function ResizeOptions() {
  const { resizeMode, setResizeMode, maxWidth, setMaxWidth, maxHeight, setMaxHeight } = useImageStore()

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          尺寸调整
        </label>
        <select
          value={resizeMode}
          onChange={(e) => setResizeMode(e.target.value as any)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="none">不调整尺寸</option>
          <option value="width">限制宽度</option>
          <option value="height">限制高度</option>
          <option value="both">限制宽高</option>
        </select>
      </div>

      {(resizeMode === 'width' || resizeMode === 'both') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            最大宽度 (px)
          </label>
          <input
            type="number"
            value={maxWidth || ''}
            onChange={(e) => setMaxWidth(e.target.value ? parseInt(e.target.value) : null)}
            placeholder="最大宽度"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {(resizeMode === 'height' || resizeMode === 'both') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            最大高度 (px)
          </label>
          <input
            type="number"
            value={maxHeight || ''}
            onChange={(e) => setMaxHeight(e.target.value ? parseInt(e.target.value) : null)}
            placeholder="最大高度"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}
    </div>
  )
}