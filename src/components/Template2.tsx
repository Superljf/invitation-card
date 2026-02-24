import type { Template2Data } from '../utils/mapper'

interface Props {
  data: Template2Data
}

export function Template2({ data }: Props) {
  return (
    <div className="w-[320px] h-[427px] sm:w-[420px] sm:h-[560px] bg-zhong-red rounded-xl shadow-xl p-10 flex flex-col items-center justify-between font-serif text-zhong-gold overflow-hidden">
      <div className="text-5xl font-bold">囍</div>
      <div className="flex flex-col items-center gap-2 text-sm">
        <div>{data.opening}</div>
        <div>{data.solar}</div>
        <div>{data.lunar}</div>
        <div className="mt-2">为</div>
        <div className="font-bold text-base">{data.names[0]}</div>
        <div className="font-bold text-base">{data.names[1]}</div>
        <div className="mt-2">{data.ceremony}</div>
        <div>{data.invite[0]}</div>
        <div>{data.invite[1]}</div>
        <div className="mt-2">{data.location}</div>
        <div>{data.time}</div>
      </div>
      <div className="text-zhong-gold/50 text-xl">～～～</div>
    </div>
  )
}
