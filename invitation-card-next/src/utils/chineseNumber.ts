/** 数字转中文大写（〇一二三四五六七八九十） */
const DIGITS = '〇一二三四五六七八九'

function digitToChinese(n: number): string {
  return String(n).split('').map(c => DIGITS[parseInt(c, 10)] ?? c).join('')
}

/** 年份：2024 → 二零二四年 */
export function yearToChinese(y: number): string {
  return digitToChinese(y) + '年'
}

/** 月份：9 → 九月，11 → 十一月 */
export function monthToChinese(m: number): string {
  if (m <= 10) return (m === 10 ? '十' : DIGITS[m]) + '月'
  return '十' + DIGITS[m - 10] + '月'
}

/** 日期：15 → 十五日 */
export function dayToChinese(d: number): string {
  if (d < 10) return DIGITS[d] + '日'
  if (d === 10) return '十日'
  if (d < 20) return '十' + DIGITS[d - 10] + '日'
  const tens = Math.floor(d / 10)
  const ones = d % 10
  return (tens === 2 ? '二十' : DIGITS[tens] + '十') + (ones > 0 ? DIGITS[ones] : '') + '日'
}

/** 公历日期：2024-09-15 → 公历九月十五 */
export function solarToChinese(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return `公历${monthToChinese(m)}${d < 10 ? DIGITS[d] : d === 10 ? '十' : d < 20 ? '十' + DIGITS[d - 10] : String(d)}`
}

/** 数字1-31转中文 */
function numToChinese(n: number): string {
  if (n < 10) return DIGITS[n]
  if (n === 10) return '十'
  if (n < 20) return '十' + DIGITS[n - 10]
  const t = Math.floor(n / 10)
  const o = n % 10
  return (t === 2 ? '二十' : DIGITS[t] + '十') + (o > 0 ? DIGITS[o] : '')
}

/** 公历日期完整：谨定于二零二四年、公历九月十五、农历九月初八 */
export function dateLinesToChinese(dateStr: string, lunar: string): [string, string, string] {
  const [y, m, d] = dateStr.split('-').map(Number)
  return [
    `谨定于${digitToChinese(y)}年`,
    `公历${monthToChinese(m)}${numToChinese(d)}日`,
    `农历${lunar}`,
  ]
}

/** 时间：阿拉伯数字转中文，时→点 */
export function timeToChinese(time: string): string {
  let r = time.replace(/时整?/g, '点')
  ;['12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'].forEach((s, i) => {
    const n = parseInt(s, 10)
    const zh = n === 10 ? '十' : n < 10 ? DIGITS[n] : '十' + DIGITS[n - 10]
    r = r.replace(new RegExp(s, 'g'), zh)
  })
  return r
}
