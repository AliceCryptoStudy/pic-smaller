'use client'

import { Header } from '@/components/layout/header'
import { UploadZone } from '@/components/upload/upload-zone'
import { ImagePreview } from '@/components/preview/image-preview'
import { CompressControls } from '@/components/controls/compress-controls'
import { StatsPanel } from '@/components/stats/stats-panel'
import { useImageStore } from '@/store/image-store'
import { motion } from 'framer-motion'

export default function Home() {
  const { images } = useImageStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            图小小
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            专业的在线图片压缩工具，支持多种格式，批量处理，本地压缩保护隐私
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 上传区域 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6 shadow-xl">
              <UploadZone />
              {images.length > 0 && (
                <div className="mt-8">
                  <ImagePreview />
                </div>
              )}
            </div>
          </motion.div>

          {/* 控制面板 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 shadow-xl">
              <CompressControls />
            </div>
            
            {images.length > 0 && (
              <div className="glass rounded-2xl p-6 shadow-xl">
                <StatsPanel />
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}