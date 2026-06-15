'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', date: '', time: '', noTime: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.date) {
      setError('請填寫姓名和出生日期')
      return
    }
    setLoading(true)
    setError('')
    if (typeof window !== 'undefined') {
      window.gtag?.('event', 'form_submitted', { name: form.name, has_time: !!form.time })
    }
    const params = new URLSearchParams({
      name: form.name,
      date: form.date,
      time: form.time,
    })
    router.push(`/reading?${params.toString()}`)
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-5 pt-4 pb-3 border-b border-[#F0FAF8]">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.svg" alt="悟明" className="h-8 w-8" />
          <div>
            <span className="text-xl font-medium tracking-wide text-[#059669]">悟明</span>
            <p className="text-[10px] text-[#AAA] leading-none mt-0.5">讀懂自己，導航人生</p>
          </div>
        </div>
      </nav>

      <div className="px-5 pt-6 pb-4 max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-1 text-[11px] text-[#059669] bg-[#F0FDF4] rounded-full px-3 py-1">
            迷茫時，先讀懂自己
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] text-[#888]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] inline-block animate-pulse" />
            已解讀 1,200+ 人
          </div>
        </div>
        <h1 className="text-[28px] font-medium leading-snug text-[#0F2027] mb-2">
          讀懂自己，<br />
          <span className="text-[#059669]">導航人生</span>
        </h1>
        <p className="text-[13px] text-[#777] leading-relaxed mb-3">
          30秒天賦分析，完全免費，無需註冊
        </p>
        <div className="inline-flex items-center gap-2 text-[12px] text-[#059669] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full px-3 py-1.5 mb-5">
          <span>八字 × 星座 × 生命數字，三維度讀懂你</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl overflow-hidden">
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-[12px] font-medium text-[#059669] mb-1.5">你的名字</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jazz"
                  className="w-full h-11 bg-white border border-[#86EFAC] rounded-xl px-3 text-[15px] text-[#0F2027] placeholder-[#CCC] outline-none focus:border-[#059669] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#059669] mb-1.5">出生日期</label>
                <input
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  type="date"
                  className="w-full h-11 bg-white border border-[#86EFAC] rounded-xl px-3 pr-2 text-[15px] text-[#0F2027] outline-none focus:border-[#059669] transition-colors appearance-none"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#059669] mb-1.5">出生時間</label>
                <input
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  type="time"
                  disabled={form.noTime}
                  className="w-full h-11 bg-white border border-[#86EFAC] rounded-xl px-3 pr-2 text-[15px] text-[#0F2027] outline-none focus:border-[#059669] transition-colors appearance-none disabled:opacity-40"
                />
                <label className="flex items-center gap-1.5 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.noTime || false}
                    onChange={e => setForm(prev => ({ ...prev, noTime: e.target.checked, time: e.target.checked ? '' : prev.time }))}
                    className="w-3.5 h-3.5 accent-[#059669]"
                  />
                  <span className="text-[11px] text-[#AAA]">不記得出生時間</span>
                </label>
              </div>
            </div>

            {error && <p className="text-[12px] text-red-500 px-4 pb-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#059669] text-white text-[16px] font-medium flex items-center justify-center gap-2 disabled:opacity-70 active:opacity-90 transition-opacity"
            >
              {loading ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" />
                  生成中...
                </>
              ) : '✦ 解讀我的天賦'}
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-5 py-3">
          {['完全免費', '不儲存個資', '即時解讀'].map(t => (
            <span key={t} className="text-[11px] text-[#AAA] flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#059669] opacity-60 inline-block" />
              {t}
            </span>
          ))}
        </div>

        <div className="h-px bg-[#F0FAF8] my-1" />

        <div className="py-4">
          <p className="text-[11px] text-[#AAA] text-center tracking-wide mb-3">你將獲得</p>
          <div className="space-y-2">
            {[
              { icon: '☯', title: '八字命盤 × 性格天賦', desc: '五行分析、日主解讀、職涯關鍵字' },
              { icon: '💼', title: '職業生涯深度分析', desc: '天賦優勢、最適路線、工作風格' },
              { icon: '📅', title: '年度運勢 × 每月運程', desc: '2026流年 + 未來12個月能量走勢' },
            ].map(f => (
              <div key={f.title} className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-3">
                <span className="text-[18px]">{f.icon}</span>
                <div>
                  <div className="text-[12px] font-medium text-[#0F2027]">{f.title}</div>
                  <div className="text-[11px] text-[#888]">{f.desc}</div>
                </div>
                <span className="ml-auto text-[10px] text-[#CCC]">免費</span>
              </div>
            ))}
            <button
              onClick={() => router.push('/compatibility')}
              className="w-full flex items-center gap-3 bg-[#FFF1F2] border border-[#FECDD3] rounded-xl p-3 active:opacity-70 transition-opacity text-left"
            >
              <span className="text-[18px]">☯</span>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-[#0F2027]">緣分指數測試</div>
                <div className="text-[11px] text-[#888]">輸入兩人生日，解讀緣分與互補</div>
              </div>
              <span className="text-[11px] text-[#E11D48] font-medium">立即試 →</span>
            </button>
          </div>
        </div>

        <div className="h-px bg-[#F0FAF8] my-1" />

        <div className="py-4">
          <p className="text-[11px] text-[#AAA] text-center mb-3">或直接體驗單項功能</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => router.push('/career-entry')}
              className="flex flex-col items-center bg-white border border-[#E5E7EB] rounded-2xl py-3.5 px-2 active:opacity-70 transition-opacity"
            >
              <span className="text-[20px] mb-1">💼</span>
              <span className="text-[12px] font-medium text-[#0F2027]">職涯分析</span>
              <span className="text-[9px] text-[#AAA] mt-0.5">深度職涯天賦</span>
            </button>
            <button
              onClick={() => router.push('/monthly-entry')}
              className="flex flex-col items-center bg-white border border-[#E5E7EB] rounded-2xl py-3.5 px-2 active:opacity-70 transition-opacity"
            >
              <span className="text-[20px] mb-1">📅</span>
              <span className="text-[12px] font-medium text-[#0F2027]">每月運程</span>
              <span className="text-[9px] text-[#AAA] mt-0.5">未來12個月</span>
            </button>
            <button
              onClick={() => router.push('/compatibility')}
              className="flex flex-col items-center bg-[#FFF1F2] border border-[#FECDD3] rounded-2xl py-3.5 px-2 active:opacity-70 transition-opacity"
            >
              <span className="text-[20px] mb-1">☯</span>
              <span className="text-[12px] font-medium text-[#E11D48]">緣分指數</span>
              <span className="text-[9px] text-[#AAA] mt-0.5">測試你們緣分</span>
            </button>
          </div>
        </div>

        <div className="text-center pb-6">
          <a href="https://www.instagram.com/wuming.app" target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#C13584] mb-2 inline-block">Instagram @wuming.app</a>
          <p className="text-[10px] text-[#CCC]">© 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議 ·{' '}
          <a href="/privacy" className="underline hover:text-[#059669]">隱私權政策</a></p>
        </div>
      </div>
    </main>
  )
}
