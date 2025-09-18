import React from 'react'
import { ThemeProvider } from './components/providers/theme-provider'
import { Header } from './components/layout/header'
import { UploadZone } from './components/upload/upload-zone'
import { ImagePreview } from './components/preview/image-preview'
import { CompressControls } from './components/controls/compress-controls'
import { StatsPanel } from './components/stats/stats-panel'
import { useImageStore } from './store/image-store'

function App() {
  const { images } = useImageStore()

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {images.length === 0 ? (
            <div className="max-w-4xl mx-auto">
              <UploadZone />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 图片预览区域 */}
              <div className="lg:col-span-3">
                <ImagePreview />
                <div className="mt-6">
                  <StatsPanel />
                </div>
              </div>
              
              {/* 控制面板 */}
              <div className="lg:col-span-1">
                <CompressControls />
              </div>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App