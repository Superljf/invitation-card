/** 传统中文字体栈：不落到苹方 / serif / sans-serif（iOS 上那就是苹方） */
export const FONT_HEITI = "SimHei, STHeiti, 'Heiti SC', 'STHeitiSC-Medium'"
export const FONT_SONG = "SimSun, 'Songti SC', STSong, SimHei, STHeiti, 'Heiti SC'"
export const FONT_FANGSONG = "FangSong, STFangsong, STFangSong, SimHei, STHeiti, 'Heiti SC'"
export const FONT_KAITI = "KaiTi, 'Kaiti SC', STKaiti, SimHei, STHeiti, 'Heiti SC'"
export const FONT_LISU = "LiSu, STLiti, STKaiti, SimHei, STHeiti, 'Heiti SC'"

export const NAME_FONT_OPTIONS = [
  { label: '黑体', value: FONT_HEITI },
  { label: '宋体', value: FONT_SONG },
  { label: '仿宋', value: FONT_FANGSONG },
  { label: '楷体', value: FONT_KAITI },
  { label: '隶书', value: FONT_LISU },
] as const

/** 姓名字号，默认中号 */
export const FONT_SIZE_OPTIONS = [
  { label: '较小', value: '0.875rem' },
  { label: '小', value: '1rem' },
  { label: '中', value: '1.125rem' },
  { label: '大', value: '1.25rem' },
  { label: '较大', value: '1.5rem' },
  { label: '特大', value: '1.75rem' },
] as const

export const DEFAULT_COUPLE_FONT_SIZE = '1.125rem'
export const DEFAULT_INVITE_NAME_FONT_SIZE = '1.125rem'
export const DEFAULT_TIME_LOCATION_FONT_SIZE = '1.125rem'

const LEGACY_FONT_MAP: Record<string, string> = {
  "'SimSun', serif": FONT_SONG,
  "'FangSong', serif": FONT_FANGSONG,
  "'Microsoft YaHei', sans-serif": FONT_HEITI,
  "'SimHei', sans-serif": FONT_HEITI,
  "'KaiTi', serif": FONT_KAITI,
  "'LiSu', serif": FONT_LISU,
}

/** 旧数据里的 serif/sans-serif 在手机上会变成苹方，这里换成传统字体 */
export function normalizeNameFont(font?: string) {
  if (!font) return FONT_HEITI
  if (LEGACY_FONT_MAP[font]) return LEGACY_FONT_MAP[font]
  if (/PingFang|苹方|serif|sans-serif/i.test(font)) return FONT_HEITI
  return font
}
