import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ImageItem, CompressionSettings } from '@/types/image'
import { compressImage } from '@/lib/image-compression'
import toast from 'react-hot-toast'

interface ImageStore {
  images: ImageItem[]
  settings: CompressionSettings
  isProcessing: boolean
  
  // Actions
  addImages: (files: File[]) => void
  removeImage: (id: string) => void
  clearImages: () => void
  updateSettings: (settings: Partial<CompressionSettings>) => void
  compressImages: () => Promise<void>
  downloadImage: (id: string) => void
  downloadAll: () => Promise<void>
  
  // Individual setting updates
  setQuality: (quality: number) => void
  setOutputFormat: (format: CompressionSettings['outputFormat']) => void
  setResizeMode: (mode: CompressionSettings['resizeMode']) => void
  setMaxWidth: (width: number | null) => void
  setMaxHeight: (height: number | null) => void
  setPngColors: (colors: number) => void
  setPngDithering: (dithering: number) => void
  setGifColors: (colors: number) => void
  setGifDithering: (dithering: boolean) => void
  setAvifQuality: (quality: number) => void
  setAvifSpeed: (speed: number) => void
  setTransparentFill: (color: string) => void
}

export const useImageStore = create<ImageStore>()(
  devtools(
    (set, get) => ({
      images: [],
      settings: {
        quality: 0.75,
        outputFormat: 'original',
        maxWidth: null,
        maxHeight: null,
        resizeMode: 'none',
        pngColors: 128,
        pngDithering: 0.5,
        gifColors: 128,
        gifDithering: false,
        avifQuality: 50,
        avifSpeed: 8,
        transparentFill: '#FFFFFF'
      },
      isProcessing: false,

      addImages: (files: File[]) => {
        const newImages: ImageItem[] = files.map((file) => ({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalSize: file.size,
          compressedSize: null,
          compressedFile: null,
          status: 'pending',
          preview: URL.createObjectURL(file),
        }))

        set((state) => ({
          images: [...state.images, ...newImages],
        }))

        toast.success(`已添加 ${files.length} 张图片`)
      },

      removeImage: (id: string) => {
        set((state) => {
          const image = state.images.find(img => img.id === id)
          if (image?.preview) {
            URL.revokeObjectURL(image.preview)
          }
          if (image?.compressedFile) {
            URL.revokeObjectURL(URL.createObjectURL(image.compressedFile))
          }
          
          return {
            images: state.images.filter((img) => img.id !== id),
          }
        })
      },

      clearImages: () => {
        const { images } = get()
        images.forEach((image) => {
          if (image.preview) {
            URL.revokeObjectURL(image.preview)
          }
          if (image.compressedFile) {
            URL.revokeObjectURL(URL.createObjectURL(image.compressedFile))
          }
        })
        
        set({ images: [] })
        toast.success('已清空所有图片')
      },

      updateSettings: (newSettings: Partial<CompressionSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }))
      },

      setQuality: (quality: number) => {
        set((state) => ({
          settings: { ...state.settings, quality }
        }))
      },

      setOutputFormat: (outputFormat: CompressionSettings['outputFormat']) => {
        set((state) => ({
          settings: { ...state.settings, outputFormat }
        }))
      },

      setResizeMode: (resizeMode: CompressionSettings['resizeMode']) => {
        set((state) => ({
          settings: { ...state.settings, resizeMode }
        }))
      },

      setMaxWidth: (maxWidth: number | null) => {
        set((state) => ({
          settings: { ...state.settings, maxWidth }
        }))
      },

      setMaxHeight: (maxHeight: number | null) => {
        set((state) => ({
          settings: { ...state.settings, maxHeight }
        }))
      },

      setPngColors: (pngColors: number) => {
        set((state) => ({
          settings: { ...state.settings, pngColors }
        }))
      },

      setPngDithering: (pngDithering: number) => {
        set((state) => ({
          settings: { ...state.settings, pngDithering }
        }))
      },

      setGifColors: (gifColors: number) => {
        set((state) => ({
          settings: { ...state.settings, gifColors }
        }))
      },

      setGifDithering: (gifDithering: boolean) => {
        set((state) => ({
          settings: { ...state.settings, gifDithering }
        }))
      },

      setAvifQuality: (avifQuality: number) => {
        set((state) => ({
          settings: { ...state.settings, avifQuality }
        }))
      },

      setAvifSpeed: (avifSpeed: number) => {
        set((state) => ({
          settings: { ...state.settings, avifSpeed }
        }))
      },

      setTransparentFill: (transparentFill: string) => {
        set((state) => ({
          settings: { ...state.settings, transparentFill }
        }))
      },

      compressImages: async () => {
        const { images, settings } = get()
        const pendingImages = images.filter(img => img.status === 'pending')
        
        if (pendingImages.length === 0) {
          toast.error('没有需要压缩的图片')
          return
        }

        set({ isProcessing: true })
        
        try {
          for (const image of pendingImages) {
            set((state) => ({
              images: state.images.map((img) =>
                img.id === image.id ? { ...img, status: 'processing' } : img
              ),
            }))

            try {
              const compressedFile = await compressImage(image.file, settings)
              
              set((state) => ({
                images: state.images.map((img) =>
                  img.id === image.id
                    ? {
                        ...img,
                        status: 'completed',
                        compressedFile,
                        compressedSize: compressedFile.size,
                      }
                    : img
                ),
              }))
            } catch (error) {
              console.error('压缩失败:', error)
              set((state) => ({
                images: state.images.map((img) =>
                  img.id === image.id ? { ...img, status: 'error' } : img
                ),
              }))
            }
          }
          
          toast.success('图片压缩完成！')
        } finally {
          set({ isProcessing: false })
        }
      },

      downloadImage: (id: string) => {
        const image = get().images.find((img) => img.id === id)
        if (!image?.compressedFile) {
          toast.error('图片尚未压缩完成')
          return
        }

        const url = URL.createObjectURL(image.compressedFile)
        const a = document.createElement('a')
        a.href = url
        a.download = `compressed_${image.file.name}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        toast.success('图片下载成功')
      },

      downloadAll: async () => {
        const { images } = get()
        const compressedImages = images.filter(img => img.compressedFile)
        
        if (compressedImages.length === 0) {
          toast.error('没有已压缩的图片可下载')
          return
        }

        if (compressedImages.length === 1) {
          get().downloadImage(compressedImages[0].id)
          return
        }

        // 使用 JSZip 打包多个文件
        const JSZip = (await import('jszip')).default
        const zip = new JSZip()

        compressedImages.forEach((image) => {
          if (image.compressedFile) {
            zip.file(`compressed_${image.file.name}`, image.compressedFile)
          }
        })

        const content = await zip.generateAsync({ type: 'blob' })
        const url = URL.createObjectURL(content)
        const a = document.createElement('a')
        a.href = url
        a.download = 'compressed_images.zip'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        toast.success('压缩包下载成功')
      },
    }),
    {
      name: 'image-store',
    }
  )
)