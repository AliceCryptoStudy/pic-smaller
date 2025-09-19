'use client'

import React from 'react'
import { useImageStore } from '@/store/image-store'
import { Download, RotateCcw } from 'lucide-react'

export function CompressControls() {
  const { 
    images, 
    settings,
    isProcessing,
    compressImages, 
    downloadAll, 
    clearImages,
    setQuality,
    setOutputFormat,
    setResizeMode,
    setMaxWidth,
    setMaxHeight,
    setPngColors,
    setPngDithering,
    setGifColors,
    setGifDithering,
    setAvifQuality,
    setAvifSpeed,
    setTransparentFill
  } = useImageStore()
  
  const hasImages = images.length > 0
  const hasCompressedImages = images.some(img => img.status === 'completed')
  const hasPendingImages = images.some(img => img.status === 'pending')

  const resetSettings = () => {
    setQuality(0.75)
    setOutputFormat('original')
    setResizeMode('none')
    setMaxWidth(null)
    setMaxHeight(null)
    setPngColors(128)
    setPngDithering(0.5)
    setGifColors(128)
    setGifDithering(false)
    setAvifQuality(50)
    setAvifSpeed(8)
    setTransparentFill('#FFFFFF')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          ⚙️ 压缩设置
        </h3>
        <button
          onClick={resetSettings}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          重置选项
        </button>
      </div>
      
      <div className="space-y-6">
        {/* 调整图片尺寸 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            调整图片尺寸
          </label>
          <select
            value={settings.resizeMode}
            onChange={(e) => setResizeMode(e.target.value as any)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
          >
            <option value="none">选择调整模式</option>
            <option value="fitWidth">设置宽度，高度自动缩放</option>
            <option value="fitHeight">设置高度，宽度自动缩放</option>
            <option value="setShort">设置短边，长边自动缩放</option>
            <option value="setLong">设置长边，短边自动缩放</option>
            <option value="setCropRatio">裁剪模式，设置裁剪比例</option>
            <option value="setCropSize">裁剪模式，设置裁剪尺寸</option>
          </select>
          
          {(settings.resizeMode === 'fitWidth' || settings.resizeMode === 'fitHeight') && (
            <div className="grid grid-cols-2 gap-3">
              {settings.resizeMode === 'fitWidth' && (
                <input
                  type="number"
                  value={settings.maxWidth || ''}
                  onChange={(e) => setMaxWidth(e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="设置输出图片宽度"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
              {settings.resizeMode === 'fitHeight' && (
                <input
                  type="number"
                  value={settings.maxHeight || ''}
                  onChange={(e) => setMaxHeight(e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="设置输出图片高度"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>
          )}
        </div>

        {/* 设置输出格式 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            设置输出格式
          </label>
          <select
            value={settings.outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as any)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="original">选择输出图片格式</option>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WEBP</option>
            <option value="avif">AVIF</option>
          </select>
          
          {/* 透明填充色选择 */}
          {(settings.outputFormat === 'jpeg') && (
            <div className="mt-3">
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                选择透明填充色
              </label>
              <input
                type="color"
                value={settings.transparentFill}
                onChange={(e) => setTransparentFill(e.target.value)}
                className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* JPEG/WEBP参数 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            JPEG/WEBP参数
          </label>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  设置输出图片质量 (0-1)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {settings.quality.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={settings.quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
          </div>
        </div>

        {/* PNG参数 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            PNG参数
          </label>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  设置输出颜色数量 (2-256)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {settings.pngColors}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="256"
                step="1"
                value={settings.pngColors}
                onChange={(e) => setPngColors(parseInt(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  设置抖色系数 (0-1)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {settings.pngDithering.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={settings.pngDithering}
                onChange={(e) => setPngDithering(parseFloat(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
          </div>
        </div>

        {/* GIF参数 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            GIF参数
          </label>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="gifDithering"
                checked={settings.gifDithering}
                onChange={(e) => setGifDithering(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="gifDithering" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                开启抖色
              </label>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  设置输出颜色数量 (2-256)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {settings.gifColors}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="256"
                step="1"
                value={settings.gifColors}
                onChange={(e) => setGifColors(parseInt(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
          </div>
        </div>

        {/* AVIF参数 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            AVIF参数
          </label>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  设置输出图片质量 (1-100)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {settings.avifQuality}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={settings.avifQuality}
                onChange={(e) => setAvifQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  设置压缩速度 (1-10)
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {settings.avifSpeed}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={settings.avifSpeed}
                onChange={(e) => setAvifSpeed(parseInt(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>
          </div>
        </div>
      </div>
      
      {hasImages && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col gap-3">
            <button
              onClick={compressImages}
              disabled={isProcessing || !hasPendingImages}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isProcessing ? '🔄 压缩中...' : '▶️ 应用选项'}
            </button>
            
            {hasCompressedImages && (
              <button
                onClick={downloadAll}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                保存全部
              </button>
            )}
            
            <button
              onClick={clearImages}
              className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              清空列表
            </button>
          </div>
        </div>
      )}
    </div>
  )
}