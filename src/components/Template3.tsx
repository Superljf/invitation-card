import type { Template3Data } from '../utils/mapper'

interface Props {
  data: Template3Data
}

export function Template3({ data }: Props) {
  return (
    <div className="w-[320px] h-[427px] sm:w-[420px] sm:h-[560px] bg-white rounded-xl shadow-xl p-8 flex flex-col items-center justify-between font-serif border-4 border-zhong-red overflow-hidden relative">
      <div className="text-2xl font-bold text-zhong-red mt-4">{data.title}</div>
      <div className="text-lg text-zhong-gold font-semibold">{data.namesLine}</div>
      <div className="text-center text-zhong-red space-y-1 text-sm">
        <div>谨定于</div>
        <div>{data.solar}</div>
        <div>{data.lunar}</div>
      </div>
      <div className="text-center text-zhong-red text-sm">
        <div>{data.locationLine}</div>
        <div>{data.ceremonyText}</div>
      </div>
      <div className="text-zhong-gold font-medium">{data.inviteLine}</div>
      <div className="text-zhong-red text-sm">{data.time}</div>
      <div className="text-zhong-red/30 text-lg">～～～～～～～</div>
    </div>
  )
}
