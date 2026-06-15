'use client'

import { useState } from 'react'

const WANT_MORE_OPTIONS = ['感情運／桃花', '財運與投資時機', '事業轉換建議', '健康能量調整', '家庭與親子關係', '流年大運詳解']
const SOURCE_OPTIONS = ['朋友推薦', 'YouTube', 'Instagram', 'Google 搜尋', 'LINE 群組']

interface Props {
  name: string
}

export default function FeedbackForm({ name }: Props) {
  const [wantMore, setWantMore] = useState<string[]>([])
  const [source, setSource] = useState<string[]>([])
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')
  const [anon, setAnon] = useState(false)
  const [sent, setSent] = useState(false)

  function toggle(list: string[], setList: (v: string[]) => void, val: string) {
    setList(list.includes(val) ? list.filter(x => x !== val) : [...list, val])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      window.gtag?.('event', 'feedback_submitted', { wantMore: wantMore.join(','), source: source.join(',') })
    }
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, wantMore, source, freeText: text, email }),
    })
    setSent(true)
  }

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden mb-4">
      {sent ? (
        <div className="p-5 text-center">
          <p className="text-[20px] mb-1">🙏</p>
          <p className="text-[14px] font-medium text-[#0F2027]">謝謝你的回饋！</p>
          <p className="text-[12px] text-[#888] mt-1">我們會根據大家的需求持續優化悟明。</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4">
          <p className="text-[13px] font-medium text-[#0F2027] mb-1">幫我們做得更好 👋</p>
          <p className="text-[11px] text-[#AAA] mb-4">你的回饋決定我們下一步建什麼</p>

          <p className="text-[12px] font-medium text-[#0F2027] mb-2">你還想探索什麼？（可多選）</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {WANT_MORE_OPTIONS.map(opt => (
              <button key={opt} type="button"
                onClick={() => toggle(wantMore, setWantMore, opt)}
                className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${wantMore.includes(opt) ? 'bg-[#059669] text-white border-[#059669]' : 'bg-white text-[#555] border-[#E5E7EB]'}`}>
                {opt}
              </button>
            ))}
          </div>

          <p className="text-[12px] font-medium text-[#0F2027] mb-2">你從哪裡知道悟明？</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {SOURCE_OPTIONS.map(opt => (
              <button key={opt} type="button"
                onClick={() => toggle(source, setSource, opt)}
                className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${source.includes(opt) ? 'bg-[#059669] text-white border-[#059669]' : 'bg-white text-[#555] border-[#E5E7EB]'}`}>
                {opt}
              </button>
            ))}
          </div>

          <p className="text-[12px] font-medium text-[#0F2027] mb-2">還有什麼想告訴我們？</p>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="任何建議或想法都歡迎..."
            rows={3}
            className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-[13px] text-[#0F2027] outline-none focus:border-[#059669] resize-none mb-3"
          />
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={anon}
              onChange={e => { setAnon(e.target.checked); if (e.target.checked) setEmail('') }}
              className="w-3.5 h-3.5 accent-[#059669]"
            />
            <span className="text-[12px] text-[#888]">匿名回饋</span>
          </label>
          {!anon && (
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email（讓我們可以回覆你）"
              className="w-full h-10 bg-white border border-[#E5E7EB] rounded-xl px-3 text-[13px] text-[#0F2027] outline-none focus:border-[#059669] mb-3"
            />
          )}
          <button type="submit"
            className="w-full h-10 bg-[#0F2027] text-white rounded-xl text-[13px] font-medium active:opacity-80 transition-opacity">
            送出回饋
          </button>
        </form>
      )}
    </div>
  )
}
