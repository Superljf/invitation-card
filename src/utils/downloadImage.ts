import { toJpeg } from 'html-to-image'

/** 导出倍率：在 DOM 上先放大再栅格化，避免手机端先截小图再拉伸发糊 */
const EXPORT_SCALE = 3

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export function isWeChat() {
  return /MicroMessenger/i.test(navigator.userAgent)
}

function dataUrlToFile(dataUrl: string, filename: string) {
  const byteString = atob(dataUrl.split(',')[1] || '')
  const mime = dataUrl.match(/data:([^;]+)/)?.[1] || 'image/jpeg'
  const bytes = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i)
  }
  return new File([bytes], filename, { type: mime })
}

function captureOptions(node: HTMLElement) {
  const width = node.offsetWidth || 360
  const height = node.offsetHeight || 600
  return {
    cacheBust: true,
    pixelRatio: 1,
    skipFonts: true,
    quality: 0.95,
    width: width * EXPORT_SCALE,
    height: height * EXPORT_SCALE,
    canvasWidth: width * EXPORT_SCALE,
    canvasHeight: height * EXPORT_SCALE,
    style: {
      transform: `scale(${EXPORT_SCALE})`,
      transformOrigin: 'top left',
    },
  }
}

/** 导出请柬为高清 JPEG（微信会把 PNG 再压成 JPEG，直接出 JPEG 少一次发糊） */
export async function exportInvitationDataUrl(node: HTMLElement) {
  return toJpeg(node, captureOptions(node))
}

/** 将请柬导出并下载/分享；微信内返回图片地址，由页面长按保存 */
export async function downloadNodeAsPng(node: HTMLElement, filename: string) {
  const dataUrl = await exportInvitationDataUrl(node)
  const jpegName = filename.replace(/\.png$/i, '.jpg')
  const file = dataUrlToFile(dataUrl, jpegName)

  // 微信内置浏览器：交给页面展示，用户长按保存才是原图
  if (isWeChat()) {
    return dataUrl
  }

  if (isMobile() && navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({ files: [file], title: jpegName })
    return
  }

  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.download = jpegName
  link.href = url
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}
