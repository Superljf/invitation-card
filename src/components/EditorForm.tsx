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
    <div className="flex flex-col gap-4 w-full">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">送呈对象（选填）</label>
        <input
          type="text"
          value={data.recipient}
          onChange={e => update('recipient', e.target.value)}
          className="input-modern"
          placeholder="张三先生"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">新郎姓名</label>
        <input
          type="text"
          value={data.groom}
          onChange={e => update('groom', e.target.value)}
          className="input-modern"
          placeholder="张三"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">新娘姓名</label>
        <input
          type="text"
          value={data.bride}
          onChange={e => update('bride', e.target.value)}
          className="input-modern"
          placeholder="李四"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">姓名字体</label>
        <select
          value={data.nameFont}
          onChange={e => update('nameFont', e.target.value)}
          className="input-modern"
        >
          <option value="'SimSun', serif">宋体</option>
          <option value="'FangSong', serif">仿宋</option>
          <option value="'Microsoft YaHei', sans-serif">微软雅黑</option>
          <option value="'SimHei', sans-serif">黑体</option>
          <option value="'KaiTi', serif">楷体</option>
          <option value="'LiSu', serif">隶书</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">婚礼日期（公历）</label>
        <input
          type="date"
          value={data.solarDate}
          onChange={e => update('solarDate', e.target.value)}
          className="input-modern"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">农历日期（手动填写）</label>
        <input
          type="text"
          value={data.lunar}
          onChange={e => update('lunar', e.target.value)}
          className="input-modern"
          placeholder="九月初八"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">举办地点</label>
        <input
          type="text"
          value={data.location}
          onChange={e => update('location', e.target.value)}
          className="input-modern"
          placeholder="某某大酒店三楼宴会厅"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">典礼类型</label>
        <input
          type="text"
          value={data.eventPhrase}
          onChange={e => update('eventPhrase', e.target.value)}
          className="input-modern"
          placeholder="结婚喜宴"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">典礼用语</label>
        <input
          type="text"
          value={data.ceremonyText}
          onChange={e => update('ceremonyText', e.target.value)}
          className="input-modern"
          placeholder="举行婚礼典礼"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">时间</label>
        <input
          type="text"
          value={data.time}
          onChange={e => update('time', e.target.value)}
          className="input-modern"
          placeholder="中午十二时整"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">敬邀语 第一行</label>
        <input
          type="text"
          value={data.inviteLine1}
          onChange={e => update('inviteLine1', e.target.value)}
          className="input-modern"
          placeholder="敬备喜筵"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">敬邀语 第二行</label>
        <input
          type="text"
          value={data.inviteLine2}
          onChange={e => update('inviteLine2', e.target.value)}
          className="input-modern"
          placeholder="恭请光临"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">落款敬语</label>
        <input
          type="text"
          value={data.inviteClosing}
          onChange={e => update('inviteClosing', e.target.value)}
          className="input-modern"
          placeholder="敬邀"
        />
      </div>
  
    </div>
  )
}
