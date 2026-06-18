'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CareerEntryPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', date: '', time: '', noTime: false, gender: 'male' })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) { setError('請輸入姓名'); return }
    if (!form.date) { setError('請輸入出生日期'); return }
    const params = new URLSearchParams({ name: form.name.trim(), date: form.date, gender: form.gender })
    if (form.time && !form.noTime) params.set('time', form.time)
    router.push(`/career-quiz?${params.toString()}`)
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-5 pt-4 pb-3 border-b border-[#F0FAF8]">
        <button onClick={() => router.back()} className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="悟明" className="h-8 w-8" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-[18px] font-medium tracking-wide text-[#059669]">悟明</span>
            <span className="text-[10px] text-[#AAA]">讀懂自己，導航人生</span>
          </div>
        </button>
        <button onClick={() => router.back()} className="text-[13px] text-[#059669]">← 返回</button>
      </nav>

      <div className="px-5 py-8 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="text-[36px] mb-3">💼</div>
          <h1 className="text-[20px] font-medium text-[#0F2027] mb-2">職涯天賦分析</h1>
          <p className="text-[13px] text-[#888] leading-relaxed">根據八字日主，深度解讀你的天賦優勢<br/>與最適合的職涯方向</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl overflow-hidden">
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#059669] mb-1.5">姓名</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="你的名字"
                className="w-full h-11 bg-white border border-[#86EFAC] rounded-xl px-3 text-[15px] text-[#0F2027] outline-none focus:border-[#059669] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#059669] mb-1.5">性別</label>
              <div className="flex gap-2">
                {[{ value: 'male', label: '男生' }, { value: 'female', label: '女生' }].map(g => (
                  <button key={g.value} type="button" onClick={() => setForm(p => ({ ...p, gender: g.value }))}
                    className={`flex-1 h-11 rounded-xl text-[14px] font-medium border transition-colors ${form.gender === g.value ? 'bg-[#059669] text-white border-[#059669]' : 'bg-white text-[#AAA] border-[#86EFAC]'}`}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#059669] mb-1.5">出生日期</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                className="w-full h-11 bg-white border border-[#86EFAC] rounded-xl px-3 pr-2 text-[15px] text-[#0F2027] outline-none focus:border-[#059669] transition-colors appearance-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#059669] mb-1.5">出生時間</label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                disabled={form.noTime}
                className="w-full h-11 bg-white border border-[#86EFAC] rounded-xl px-3 pr-2 text-[15px] text-[#0F2027] outline-none focus:border-[#059669] transition-colors appearance-none disabled:opacity-40"
              />
              <label className="flex items-center gap-1.5 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.noTime}
                  onChange={e => setForm(p => ({ ...p, noTime: e.target.checked, time: e.target.checked ? '' : p.time }))}
                  className="w-3.5 h-3.5 accent-[#059669]"
                />
                <span className="text-[11px] text-[#AAA]">不記得出生時間</span>
              </label>
            </div>
          </div>

          {error && <p className="text-[12px] text-red-500 px-5 pb-2">{error}</p>}

          <button
            type="submit"
            className="w-full h-14 bg-[#059669] text-white text-[16px] font-medium active:opacity-90 transition-opacity"
          >
            💼 開始職涯分析
          </button>
        </form>

        <p className="text-[11px] text-[#CCC] text-center mt-4">完全免費 · 約需 10-15 秒</p>

        <div className="mt-8">
          <p className="text-[11px] text-[#AAA] text-center mb-3">也想試試看</p>
          <div className="flex flex-col gap-2">
            <button onClick={() => router.push('/')} className="flex items-center gap-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl px-4 py-3 active:opacity-70 transition-opacity text-left">
              <span className="text-[18px]">☯</span>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#0F2027]">性格天賦解讀</div>
                <div className="text-[10px] text-[#888]">八字命盤 × 五行分析</div>
              </div>
              <span className="text-[11px] text-[#059669] font-medium">→</span>
            </button>
            <button onClick={() => router.push('/monthly-entry')} className="flex items-center gap-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl px-4 py-3 active:opacity-70 transition-opacity text-left">
              <span className="text-[18px]">📅</span>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#0F2027]">每月運程解讀</div>
                <div className="text-[10px] text-[#888]">未來12個月能量走勢</div>
              </div>
              <span className="text-[11px] text-[#059669] font-medium">→</span>
            </button>
            <button onClick={() => router.push('/compatibility')} className="flex items-center gap-3 bg-[#FFF1F2] border border-[#FECDD3] rounded-2xl px-4 py-3 active:opacity-70 transition-opacity text-left">
              <span className="text-[18px]">☯</span>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#0F2027]">緣分指數測試</div>
                <div className="text-[10px] text-[#888]">輸入兩人生日測緣分</div>
              </div>
              <span className="text-[11px] text-[#E11D48] font-medium">→</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
