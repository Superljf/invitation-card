const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

/** 从 YYYY-MM-DD 计算星期 */
export function getWeekday(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  if (isNaN(d.getTime())) return '星期四'
  return WEEKDAYS[d.getDay()] ?? '星期四'
}
