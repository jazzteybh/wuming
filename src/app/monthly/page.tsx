'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ExploreMore from '@/components/ExploreMore'
import FeedbackForm from '@/components/FeedbackForm'

interface MonthData {
  month: string
  theme: string
  energy: number
  desc: string
  action: string
}

const ACTION_STYLE: Record<string, string> = {
  default: 'bg-[#F0FDF4] border-[#BBF7D0] text-[#059669]',
  warn: 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]',
  neutral: 'bg-white border-[#E5E7EB] text-[#888]',
}

function getActionStyle(action: string): string {
  if (['低調保守', '謹慎行事', '休養生息', '沉澱蓄力'].some(k => action.includes(k.slice(0, 2)))) return ACTION_STYLE.neutral
  if (['留意', '注意', '謹慎'].some(k => action.includes(k))) return ACTION_STYLE.warn
  return ACTION_STYLE.default
}

function MonthlyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get('name') || ''
  const date = searchParams.get('date') || ''
  const time = searchParams.get('time') || ''

  const [monthly, setMonthly] = useState<MonthData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const now = new Date()
  const currentMonthLabel = `${now.getFullYear()}年${now.getMonth() + 1}月`

  useEffect(() => {
    if (!name || !date) { router.push('/'); return }
    if (typeof window !== 'undefined') {
      window.gtag?.('event', 'monthly_report_viewed', { name, date })
    }
    fetch('/api/monthly', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, date, time }),
    })
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setMonthly(d.monthly) })
      .catch(() => setError('網路錯誤，請重試'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
        <div className="text-center max-w-xs w-full">
          <div className="flex items-center justify-center gap-2 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon.svg" alt="悟明" className="h-8 w-8" />
            <span className="text-[18px] font-medium text-[#059669]">悟明</span>
          </div>
          <div className="w-14 h-14 border-2 border-[#BBF7D0] border-t-[#059669] rounded-full animate-spin mx-auto mb-6" />
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 mb-4">
            <p className="text-[24px] mb-2">📅</p>
            <p className="text-[15px] font-medium text-[#0F2027] mb-1">解讀 {name} 的未來12個月</p>
            <p className="text-[12px] text-[#888] leading-relaxed">根據你的八字推算每月能量走勢</p>
          </div>
          <p className="text-[11px] text-[#CCC]">深度解讀中，約需 15-20 秒</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
        <p className="text-[15px] text-red-500 mb-4">{error}</p>
        <button onClick={() => router.back()} className="text-[#059669] underline text-[14px]">返回</button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-5 pt-4 pb-3 border-b border-[#F0FAF8]">
        <button onClick={() => router.back()} className="text-left flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.svg" alt="悟明" className="h-8 w-8" />
          <div>
            <div className="text-xl font-medium tracking-wide text-[#059669]">悟明</div>
            <p className="text-[10px] text-[#AAA] leading-none mt-0.5">讀懂自己，導航人生</p>
          </div>
        </button>
        <button onClick={() => router.back()} className="text-[13px] text-[#059669]">← 返回命盤</button>
      </nav>

      <div className="px-5 py-5 max-w-lg mx-auto">

        <div className="text-center mb-5">
          <h1 className="text-[20px] font-medium text-[#0F2027] mb-1">{name} 的流年運程</h1>
          <p className="text-[12px] text-[#AAA]">未來12個月每月能量解讀</p>
          <div className="inline-flex items-center gap-1 text-[10px] text-[#059669] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full px-3 py-1 mt-2">
            根據八字日主推算 · 每月更新
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {monthly.map((m) => {
            const isCurrent = m.month === currentMonthLabel
            const actionStyle = getActionStyle(m.action)
            return (
              <div key={m.month} className={`rounded-2xl p-3.5 border relative ${isCurrent ? 'bg-[#F0FDF4] border-[#BBF7D0]' : 'bg-white border-[#E5E7EB]'}`}>
                {isCurrent && (
                  <span className="absolute top-2.5 right-2.5 bg-[#059669] text-white text-[9px] px-1.5 py-0.5 rounded-full">當前</span>
                )}
                <p className={`text-[10px] font-medium mb-1 ${isCurrent ? 'text-[#059669]' : 'text-[#AAA]'}`}>{m.month}</p>
                <p className="text-[13px] font-medium text-[#0F2027] mb-2 pr-6">{m.theme}</p>
                <div className="flex gap-1 mb-2.5">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= m.energy ? 'bg-[#059669]' : 'bg-[#E5E7EB]'}`} />
                  ))}
                </div>
                <p className="text-[11px] text-[#666] leading-snug mb-2.5">{m.desc}</p>
                <span className={`text-[10px] px-2.5 py-1 rounded-full border inline-block ${actionStyle}`}>{m.action}</span>
              </div>
            )
          })}
        </div>

        {/* Email capture */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 mb-6">
          {emailSent ? (
            <div className="text-center py-2">
              <p className="text-[20px] mb-1">✓</p>
              <p className="text-[14px] font-medium text-[#059669]">已訂閱！每月運勢將寄至你的信箱</p>
            </div>
          ) : (
            <>
              <p className="text-[14px] font-medium text-[#0F2027] mb-1">📩 每月運勢直送信箱</p>
              <p className="text-[12px] text-[#777] mb-3">每月自動更新，提前掌握能量走勢</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 h-10 bg-white border border-[#86EFAC] rounded-xl px-3 text-[14px] text-[#0F2027] outline-none focus:border-[#059669]"
                />
                <button
                  onClick={async () => {
                    if (!email) return
                    await fetch('/api/save-email', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, name, date, type: 'monthly', monthly, reading: '', bazi: null, lifePath: null, lifePathInfo: null }),
                    })
                    setEmailSent(true)
                  }}
                  className="h-10 px-4 bg-[#059669] text-white rounded-xl text-[13px] font-medium"
                >
                  寄送
                </button>
              </div>
              <p className="text-[10px] text-[#AAA] text-center mt-2">完全免費 · 隨時可取消</p>
            </>
          )}
        </div>

        <ExploreMore name={name} date={date} time={time} current="monthly" />
        <FeedbackForm name={name} />

        <p className="text-center text-[10px] text-[#CCC] pb-6">
          © 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議
        </p>
      </div>
    </main>
  )
}

export default function MonthlyPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#059669] border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <MonthlyContent />
    </Suspense>
  )
}
