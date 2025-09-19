'use client'

import React, { useCallback, useState } from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { useImageStore } from '@/store/image-store'

export function UploadZone() {
  const { addImages } = useImageStore()
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFiles = useCallback((files: FileList) => {
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    )
    
    if (imageFiles.length > 0) {
      addImages(imageFiles)
    }
  }, [addImages])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
        ${isDragOver 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
          : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
        }
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          {isDragOver ? (
            <ImageIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          ) : (
            <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {isDragOver ? '释放文件开始压缩' : '拖拽图片到这里'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            或者 <span className="text-blue-600 dark:text-blue-400 font-medium">点击选择文件</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            支持 JPEG、PNG、WebP、AVIF、SVG、GIF 格式
          </p>
        </div>
      </div>
    </div>
  )
}