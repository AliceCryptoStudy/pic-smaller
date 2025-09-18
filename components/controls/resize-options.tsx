'use client'

import React from 'react'
import { useImageStore } from '../../store/image-store'

export function ResizeOptions() {
  const { settings, updateSettings } = useImageStore()
  const { resizeMode, maxWidth, maxHeight } = settings

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        尺寸调整
      </label>
      <div className="space-y-3">
        <select
          value={resizeMode}
          onChange={(e) => setResizeMode(e.target.value as any)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="none">不调整尺寸</option>
          <option value="fit">等比缩放</option>
          <option value="fill">拉伸填充</option>
        </select>
        
        {resizeMode !== 'none' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                最大宽度
              </label>
              <input
                type="number"
                value={maxWidth || ''}
                onChange={(e) => setMaxWidth(e.target.value ? parseInt(e.target.value) : null)}
                placeholder="最大宽度"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                最大高度
              </label>
              <input
                type="number"
                value={maxHeight || ''}
                onChange={(e) => setMaxHeight(e.target.value ? parseInt(e.target.value) : null)}
                placeholder="最大高度"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}