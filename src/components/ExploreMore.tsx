'use client'

import { useRouter } from 'next/navigation'

interface Props {
  name: string
  date: string
  time?: string
  current: 'reading' | 'monthly' | 'career' | 'compatibility'
}

const PAGES = [
  { key: 'reading',       icon: '☯',  title: '性格天賦解讀', desc: '八字命盤 × 五行分析',    pink: false },
  { key: 'career-entry',  icon: '💼', title: '職涯天賦分析', desc: '深度職涯天賦解讀',        pink: false },
  { key: 'monthly-entry', icon: '📅', title: '每月運程解讀', desc: '未來12個月能量走勢',      pink: false },
  { key: 'compatibility', icon: '☯',  title: '緣分指數測試', desc: '輸入兩人生日測緣分',      pink: true  },
] as const

const CURRENT_KEY_MAP: Record<string, string> = {
  reading: 'reading',
  career: 'career-entry',
  monthly: 'monthly-entry',
  compatibility: 'compatibility',
}

export default function ExploreMore({ name, date, time = '', current }: Props) {
  const router = useRouter()
  const currentKey = CURRENT_KEY_MAP[current] ?? current
  const others = PAGES.filter(p => p.key !== currentKey)

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
            className={`w-full flex items-center gap-3 rounded-xl p-3 active:opacity-70 transition-opacity text-left border ${
              p.pink
                ? 'bg-[#FFF1F2] border-[#FECDD3]'
                : 'bg-[#F0FDF4] border-[#BBF7D0]'
            }`}
          >
            <span className="text-[20px]">{p.icon}</span>
            <div className="flex-1">
              <div className="text-[13px] font-medium text-[#0F2027]">{p.title}</div>
              <div className="text-[11px] text-[#888]">{p.desc}</div>
            </div>
            <span className={`text-[12px] font-medium ${p.pink ? 'text-[#E11D48]' : 'text-[#059669]'}`}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}
