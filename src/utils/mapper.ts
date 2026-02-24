import type { FormData } from '../types/formData'

/** 模板一：红金对称款渲染数据 */
export interface Template1Data {
  title: string
  mainSymbol: string
  dateBlock: { solar: string; lunar: string }
  names: { groom: string; bride: string }
  ceremonyText: string
  inviteText: [string, string]
  location: string
  time: string
}

/** 模板二：竖排传统款渲染数据 */
export interface Template2Data {
  opening: string
  solar: string
  lunar: string
  names: [string, string]
  ceremony: string
  invite: [string, string]
  location: string
  time: string
}

/** 模板三：白底祥云款渲染数据 */
export interface Template3Data {
  title: string
  namesLine: string
  solar: string
  lunar: string
  locationLine: string
  ceremonyText: string
  inviteLine: string
  time: string
}

function formatSolarChinese(dateStr: string, weekday: string): string {
  // 2026-10-08 -> 2026年10月8日
  const [y, m, d] = dateStr.split('-').map(Number)
  return `公历 ${y}年${m}月${d}日 ${weekday}`
}

function formatSolarChineseFull(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return `公历 ${y}年${m}月${d}日`
}

export function mapToTemplate1(f: FormData): Template1Data {
  return {
    title: '喜结良缘',
    mainSymbol: '囍',
    dateBlock: {
      solar: formatSolarChinese(f.solarDate, f.solarWeekday),
      lunar: `农历 ${f.lunar}`,
    },
    names: {
      groom: `${f.groom} 先生`,
      bride: `${f.bride} 女士`,
    },
    ceremonyText: f.ceremonyText,
    inviteText: [f.inviteLine1, f.inviteLine2],
    location: `席设：${f.location}`,
    time: `时间：${f.time}`,
  }
}

export function mapToTemplate2(f: FormData): Template2Data {
  return {
    opening: '谨定于',
    solar: formatSolarChineseFull(f.solarDate),
    lunar: `农历${f.lunar}`,
    names: [f.groom, f.bride],
    ceremony: f.ceremonyText.replace('典礼', '') || '举行婚礼',
    invite: [f.inviteLine1, f.inviteLine2],
    location: f.location,
    time: f.time,
  }
}

export function mapToTemplate3(f: FormData): Template3Data {
  const [y, m, d] = f.solarDate.split('-')
  const solarStr = `${y}年${m}月${d}日（${f.solarWeekday}）`
  return {
    title: '喜结良缘',
    namesLine: `${f.groom} ♥ ${f.bride}`,
    solar: solarStr,
    lunar: `农历 ${f.lunar}`,
    locationLine: `于 ${f.location}`,
    ceremonyText: f.ceremonyText,
    inviteLine: `${f.inviteLine1}  ${f.inviteLine2}`,
    time: `时间：${f.time}`,
  }
}
