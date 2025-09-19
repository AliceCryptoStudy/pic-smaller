export interface ImageItem {
  id: string
  file: File
  originalSize: number
  compressedSize: number | null
  compressedFile: File | null
  status: 'pending' | 'processing' | 'completed' | 'error'
  preview: string
}

export interface CompressionSettings {
  quality: number
  outputFormat: 'original' | 'jpeg' | 'png' | 'webp' | 'avif'
  maxWidth: number | null
  maxHeight: number | null
  resizeMode: 'none' | 'fitWidth' | 'fitHeight' | 'setShort' | 'setLong' | 'setCropRatio' | 'setCropSize'
  pngColors: number
  pngDithering: number
  gifColors: number
  gifDithering: boolean
  avifQuality: number
  avifSpeed: number
  transparentFill: string
}

export interface CompressionResult {
  file: File
  originalSize: number
  compressedSize: number
  compressionRatio: number
}