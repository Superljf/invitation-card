import type { Template1Data } from '../utils/mapper'

interface Props {
  data: Template1Data
}

export function Template1({ data }: Props) {
  return (
    <div className="w-[320px] h-[427px] sm:w-[420px] sm:h-[560px] bg-zhong-red rounded-xl shadow-xl p-8 flex flex-col items-center justify-between font-serif text-zhong-gold overflow-hidden">
      <div className="text-6xl font-bold mt-2">囍</div>
      <div className="text-2xl font-semibold">{data.title}</div>
      <div className="text-center space-y-1">
        <div>谨定于</div>
        <div className="text-base">{data.dateBlock.solar}</div>
        <div className="text-base">{data.dateBlock.lunar}</div>
      </div>
      <div className="text-center">为</div>
      <div className="text-center space-y-1">
        <div className="text-lg font-bold">{data.names.groom}</div>
        <div className="text-lg font-bold">{data.names.bride}</div>
      </div>
      <div>{data.ceremonyText}</div>
      <div className="text-center space-y-1">
        <div>{data.inviteText[0]}</div>
        <div>{data.inviteText[1]}</div>
      </div>
      <div className="text-sm text-center space-y-0.5 mt-2">
        <div>{data.location}</div>
        <div>{data.time}</div>
      </div>
      {/* 底部祥云装饰 */}
      <div className="text-zhong-gold/50 text-2xl mt-2">～～～～～～～</div>
    </div>
  )
}
