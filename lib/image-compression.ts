import { CompressionSettings } from '@/types/image'

export async function compressImage(
  file: File,
  settings: CompressionSettings
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      try {
        // 计算目标尺寸
        let { width, height } = calculateDimensions(
          img.width,
          img.height,
          settings
        )

        canvas.width = width
        canvas.height = height

        if (!ctx) {
          reject(new Error('无法获取canvas上下文'))
          return
        }

        // 绘制图片
        ctx.drawImage(img, 0, 0, width, height)

        // 确定输出格式
        const outputFormat = getOutputFormat(file.type, settings.format)
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('图片压缩失败'))
              return
            }

            const compressedFile = new File(
              [blob],
              getOutputFileName(file.name, outputFormat),
              { type: outputFormat }
            )

            resolve(compressedFile)
          },
          outputFormat,
          settings.quality
        )
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error('图片加载失败'))
    }

    img.src = URL.createObjectURL(file)
  })
}

function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  settings: CompressionSettings
): { width: number; height: number } {
  let width = originalWidth
  let height = originalHeight

  // 如果没有设置最大尺寸，返回原始尺寸
  if (!settings.maxWidth && !settings.maxHeight) {
    return { width, height }
  }

  const aspectRatio = originalWidth / originalHeight

  if (settings.resizeMode === 'fit') {
    // 等比缩放，保持宽高比
    if (settings.maxWidth && width > settings.maxWidth) {
      width = settings.maxWidth
      height = width / aspectRatio
    }
    
    if (settings.maxHeight && height > settings.maxHeight) {
      height = settings.maxHeight
      width = height * aspectRatio
    }
  } else if (settings.resizeMode === 'fill') {
    // 填充模式，可能会改变宽高比
    if (settings.maxWidth) width = settings.maxWidth
    if (settings.maxHeight) height = settings.maxHeight
  }

  return {
    width: Math.round(width),
    height: Math.round(height)
  }
}

function getOutputFormat(originalType: string, formatSetting: string): string {
  if (formatSetting === 'original') {
    return originalType
  }
  
  const formatMap: Record<string, string> = {
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp'
  }
  
  return formatMap[formatSetting] || originalType
}

function getOutputFileName(originalName: string, outputFormat: string): string {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')
  const extension = outputFormat.split('/')[1]
  return `${nameWithoutExt}.${extension}`
}