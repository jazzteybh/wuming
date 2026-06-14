'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', date: '', time: '', gender: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.date || !form.gender) {
      setError('請填寫姓名、出生日期和性別')
      return
    }
    setLoading(true)
    setError('')
    const params = new URLSearchParams({
      name: form.name,
      date: form.date,
      time: form.time,
      gender: form.gender,
    })
    router.push(`/reading?${params.toString()}`)
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-5 pt-4 pb-3 border-b border-[#F0FAF8]">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-[#059669] overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="悟明" style={{width: '160%', marginTop: '-30%', marginBottom: '-70%', filter: 'brightness(0) invert(1)'}} />
          </div>
          <div>
            <span className="text-xl font-medium tracking-wide">悟<span className="text-[#059669]">明</span></span>
            <p className="text-[10px] text-[#AAA] leading-none mt-0.5">讀懂自己，導航人生</p>
          </div>
        </div>
      </nav>

      <div className="px-5 pt-6 pb-4 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-1 text-[11px] text-[#059669] bg-[#F0FDF4] rounded-full px-3 py-1 mb-4">
          ✦ 命理 · 自我探索
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
                  className="w-full h-11 bg-white border border-[#86EFAC] rounded-xl px-3 text-[15px] text-[#0F2027] outline-none focus:border-[#059669] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#059669] mb-1">出生時間</label>
                  <p className="text-[10px] text-[#AAA] leading-snug mb-1.5">不記得？沒關係，<br/>跳過也能生成準確結果</p>
                  <input
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    type="time"
                    className="w-full h-11 bg-white border border-[#86EFAC] rounded-xl px-3 text-[15px] text-[#0F2027] outline-none focus:border-[#059669] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#059669] mb-1.5">性別</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full h-11 bg-white border border-[#86EFAC] rounded-xl px-3 text-[15px] text-[#0F2027] outline-none focus:border-[#059669] transition-colors"
                  >
                    <option value="" disabled>請選擇</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>
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
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: '☯', title: '八字命盤', desc: '五行分析與性格天賦' },
              { icon: '✦', title: '生命數字', desc: '人生課題與使命' },
              { icon: '💼', title: '職涯方向', desc: '適合產業與時機' },
              { icon: '📅', title: '今年運勢', desc: '2026 流年全年' },
            ].map(f => (
              <div key={f.title} className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3.5">
                <div className="text-lg mb-1.5">{f.icon}</div>
                <div className="text-[13px] font-medium text-[#0F2027] mb-0.5">{f.title}</div>
                <div className="text-[11px] text-[#888] leading-snug">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[10px] text-[#CCC] pb-6">
          © 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議 ·{' '}
          <a href="/privacy" className="underline hover:text-[#059669]">隱私權政策</a>
        </p>
      </div>
    </main>
  )
}
