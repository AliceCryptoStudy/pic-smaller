'use client'

import React from 'react'
import { useImageStore } from '@/store/image-store'

export function FormatSelector() {
  const { outputFormat, setOutputFormat } = useImageStore()

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        输出格式
      </label>
      <div className="space-y-2">
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value as any)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="original">保持原格式</option>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
        </select>
      </div>
    </div>
  )
}