/** 统一编辑层数据类型 */
export interface FormData {
  recipient: string // 送呈对象
  groom: string
  bride: string
  inviteName1: string // 敬邀姓名1，默认同新郎
  inviteName2: string // 敬邀姓名2，默认同新娘
  solarDate: string // 公历，如 2026-10-08
  solarWeekday: string // 星期，如 星期四
  lunar: string // 农历，手动填写，如 九月初八
  location: string // 席设
  time: string // 时间
  ceremonyText: string
  eventPhrase: string // 典礼类型，如 结婚喜宴
  inviteLine1: string
  inviteLine2: string
  inviteClosing: string // 敬邀
  // 字体设置
  nameFont: string // 姓名字体（收件人、新郎、新娘统一）
}

export const defaultFormData: FormData = {
  recipient: '张三先生',
  groom: '张三',
  bride: '李四',
  inviteName1: '张三',
  inviteName2: '李四',
  solarDate: '2026-10-08',
  solarWeekday: '星期四',
  lunar: '九月初八',
  location: '某某大酒店三楼宴会厅',
  time: '中午十二时整',
  ceremonyText: '举行婚礼典礼',
  eventPhrase: '结婚喜宴',
  inviteLine1: '敬备喜筵',
  inviteLine2: '恭请光临',
  inviteClosing: '敬邀',
  nameFont: "'SimSun', serif",
}

/** 合并请柬数据；旧数据没有敬邀姓名时，回退到新郎/新娘姓名 */
export function mergeFormData(partial?: Partial<FormData> | null): FormData {
  const merged: FormData = { ...defaultFormData, ...(partial || {}) }
  if (!partial || !partial.inviteName1) {
    merged.inviteName1 = merged.groom || defaultFormData.inviteName1
  }
  if (!partial || !partial.inviteName2) {
    merged.inviteName2 = merged.bride || defaultFormData.inviteName2
  }
  return merged
}
