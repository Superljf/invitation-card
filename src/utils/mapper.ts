import type { FormData } from '../types/formData'
import { dateLinesToChinese, timeToChinese } from './chineseNumber'

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

/** 模板四：竖排款，支持并列（公历|农历、新郎|新娘） */
export type LineItem = string | [string, string]
export type VariableItem = boolean | [boolean, boolean]

export interface Template4Data {
  title: string
  recipientLines: string[]
  recipientVariable: boolean[]
  dateLines: LineItem[]
  dateVariable: VariableItem[]
  coupleLines: LineItem[]
  coupleVariable: VariableItem[]
  inviteLines: string[]
  inviteVariable: boolean[]
  timeLines: string[]
  timeVariable: boolean[]
  locationLines: string[]
  locationVariable: boolean[]
  signatureLines: LineItem[]
  signatureVariable: VariableItem[]
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

export function mapToTemplate4(f: FormData): Template4Data {
  const [date1, date2, date3] = dateLinesToChinese(f.solarDate, f.lunar)
  const timeZh = timeToChinese(f.time)
  const recipient = f.recipient || '张三先生'
  return {
    title: '柬请',
    recipientLines: ['送呈', recipient, '台启'],
    recipientVariable: [false, true, false],
    dateLines: [date1, [date2, date3]],
    dateVariable: [true, [true, true]],
    coupleLines: ['为', [`新郎${f.groom}`, `新娘${f.bride}`], '举行', f.eventPhrase],
    coupleVariable: [false, [true, true], false, true],
    inviteLines: [f.inviteLine1, f.inviteLine2],
    inviteVariable: [false, false],
    timeLines: ['时间', timeZh],
    timeVariable: [false, true],
    locationLines: ['席设', f.location],
    locationVariable: [false, true],
    signatureLines: [[f.groom, f.bride], f.inviteClosing],
    signatureVariable: [[true, true], false],
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
