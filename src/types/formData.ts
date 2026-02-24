/** 统一编辑层数据类型 */
export interface FormData {
  groom: string
  bride: string
  solarDate: string // 公历，如 2026-10-08
  solarWeekday: string // 星期，如 星期四
  lunar: string // 农历，手动填写，如 九月初八
  location: string // 席设
  time: string // 时间
  ceremonyText: string
  inviteLine1: string
  inviteLine2: string
}

export const defaultFormData: FormData = {
  groom: '张三',
  bride: '李四',
  solarDate: '2026-10-08',
  solarWeekday: '星期四',
  lunar: '九月初八',
  location: '某某大酒店三楼宴会厅',
  time: '中午十二时整',
  ceremonyText: '举行婚礼典礼',
  inviteLine1: '敬备喜筵',
  inviteLine2: '恭请光临',
}
