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
  format: 'original' | 'jpeg' | 'png' | 'webp'
  maxWidth: number | null
  maxHeight: number | null
  resizeMode: 'none' | 'fit' | 'fill' | 'crop'
}

export interface CompressionResult {
  file: File
  originalSize: number
  compressedSize: number
  compressionRatio: number
}