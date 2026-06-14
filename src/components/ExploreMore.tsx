'use client'

import { useRouter } from 'next/navigation'

interface Props {
  name: string
  date: string
  time?: string
  current: 'monthly' | 'career' | 'compatibility'
}

const PAGES = [
  { key: 'monthly', icon: '📅', title: '每月運程', desc: '未來12個月能量走勢' },
  { key: 'career', icon: '💼', title: '職業生涯', desc: '天賦優勢與職涯路線' },
  { key: 'compatibility', icon: '☯', title: '命格合盤', desc: '兩人緣分與互補分析' },
] as const

export default function ExploreMore({ name, date, time = '', current }: Props) {
  const router = useRouter()
  const others = PAGES.filter(p => p.key !== current)

  function go(key: string) {
    const params = new URLSearchParams({ name, date, ...(time ? { time } : {}) })
    router.push(`/${key}?${params.toString()}`)
  }

  return (
    <div className="mb-4">
      <p className="text-[11px] text-[#AAA] text-center tracking-wide mb-3">繼續探索</p>
      <div className="space-y-2">
        {others.map(p => (
          <button
            key={p.key}
            onClick={() => go(p.key)}
            className="w-full flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-3 active:opacity-70 transition-opacity text-left"
          >
            <span className="text-[20px]">{p.icon}</span>
            <div className="flex-1">
              <div className="text-[13px] font-medium text-[#0F2027]">{p.title}</div>
              <div className="text-[11px] text-[#888]">{p.desc}</div>
            </div>
            <span className="text-[12px] text-[#059669]">→</span>
          </button>
        ))}
      </div>
    </div>
  )
}
