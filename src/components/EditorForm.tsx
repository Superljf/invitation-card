import type { FormData } from '../types/formData'
import { getWeekday } from '../utils/weekday'

interface Props {
  data: FormData
  onChange: (data: FormData) => void
}

export function EditorForm({ data, onChange }: Props) {
  const update = (k: keyof FormData, v: string) => {
    const next = { ...data, [k]: v }
    if (k === 'solarDate') next.solarWeekday = getWeekday(v)
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-[400px]">
      <div>
        <label className="block text-sm text-gray-600 mb-1">新郎姓名</label>
        <input
          type="text"
          value={data.groom}
          onChange={e => update('groom', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-zhong-red/50 focus:border-zhong-red"
          placeholder="张三"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">新娘姓名</label>
        <input
          type="text"
          value={data.bride}
          onChange={e => update('bride', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-zhong-red/50 focus:border-zhong-red"
          placeholder="李四"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">婚礼日期（公历）</label>
        <input
          type="date"
          value={data.solarDate}
          onChange={e => update('solarDate', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-zhong-red/50 focus:border-zhong-red"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">农历日期（手动填写）</label>
        <input
          type="text"
          value={data.lunar}
          onChange={e => update('lunar', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-zhong-red/50 focus:border-zhong-red"
          placeholder="九月初八"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">举办地点</label>
        <input
          type="text"
          value={data.location}
          onChange={e => update('location', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-zhong-red/50 focus:border-zhong-red"
          placeholder="某某大酒店三楼宴会厅"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">典礼用语</label>
        <input
          type="text"
          value={data.ceremonyText}
          onChange={e => update('ceremonyText', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-zhong-red/50 focus:border-zhong-red"
          placeholder="举行婚礼典礼"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">时间</label>
        <input
          type="text"
          value={data.time}
          onChange={e => update('time', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-zhong-red/50 focus:border-zhong-red"
          placeholder="中午十二时整"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">敬邀语 第一行</label>
        <input
          type="text"
          value={data.inviteLine1}
          onChange={e => update('inviteLine1', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-zhong-red/50 focus:border-zhong-red"
          placeholder="敬备喜筵"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">敬邀语 第二行</label>
        <input
          type="text"
          value={data.inviteLine2}
          onChange={e => update('inviteLine2', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-zhong-red/50 focus:border-zhong-red"
          placeholder="恭请光临"
        />
      </div>
    </div>
  )
}
