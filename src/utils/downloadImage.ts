import { toPng } from 'html-to-image'

/** 导出倍率：在 DOM 上先放大再栅格化，避免手机端先截小图再拉伸发糊 */
const EXPORT_SCALE = 3

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

function dataUrlToFile(dataUrl: string, filename: string) {
  const byteString = atob(dataUrl.split(',')[1] || '')
  const mime = dataUrl.match(/data:([^;]+)/)?.[1] || 'image/png'
  const bytes = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i)
  }
  return new File([bytes], filename, { type: mime })
}

/** 将请柬 DOM 导出为 PNG；手机端走系统分享保存，电脑端直接下载 */
export async function downloadNodeAsPng(node: HTMLElement, filename: string) {
  const width = node.offsetWidth || 360
  const height = node.offsetHeight || 600
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 1,
    skipFonts: true,
    width: width * EXPORT_SCALE,
    height: height * EXPORT_SCALE,
    canvasWidth: width * EXPORT_SCALE,
    canvasHeight: height * EXPORT_SCALE,
    style: {
      transform: `scale(${EXPORT_SCALE})`,
      transformOrigin: 'top left',
    },
  })
  const file = dataUrlToFile(dataUrl, filename)

  if (isMobile() && navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({ files: [file], title: filename })
    return
  }

  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.download = filename
  link.href = url
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}
