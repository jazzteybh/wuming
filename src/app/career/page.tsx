'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ELEMENT_EMOJI } from '@/lib/bazi'
import ExploreMore from '@/components/ExploreMore'

const SECTIONS = ['天賦優勢', '最適職涯路線', '工作風格', '職涯黃金期', '需要注意的職場盲點', '給你的職涯建議']

function parseCareer(text: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const pattern = new RegExp(`\\*\\*(${SECTIONS.join('|')})\\*\\*`)
  const parts = text.split(pattern)
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim()
    const content = (parts[i + 1] || '').trim().replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    sections[title] = content
  }
  return sections
}

const SECTION_ICON: Record<string, string> = {
  '天賦優勢': '⚡',
  '最適職涯路線': '🧭',
  '工作風格': '🎯',
  '職涯黃金期': '✦',
  '需要注意的職場盲點': '🔍',
  '給你的職涯建議': '💬',
}

function CareerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get('name') || ''
  const date = searchParams.get('date') || ''
  const time = searchParams.get('time') || ''

  const [careerText, setCareerText] = useState('')
  const [streaming, setStreaming] = useState(true)
  const [elementEmoji, setElementEmoji] = useState('')
  const [element, setElement] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  useEffect(() => {
    if (!name || !date) { router.push('/'); return }
    if (typeof window !== 'undefined') {
      window.gtag?.('event', 'career_report_viewed', { name, date })
    }

    let buffer = ''
    fetch('/api/career', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, date, time }),
    }).then(async res => {
      if (!res.body) { setError('網路錯誤，請重試'); setLoading(false); return }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          try {
            const msg = JSON.parse(trimmed.slice(5))
            if (msg.type === 'meta') {
              if (msg.bazi?.dayStemElement) {
                setElement(msg.bazi.dayStemElement)
                setElementEmoji(ELEMENT_EMOJI[msg.bazi.dayStemElement] || '')
              }
              setLoading(false)
            } else if (msg.type === 'text') {
              setCareerText(prev => prev + msg.text)
            } else if (msg.type === 'error') {
              setError(msg.error)
            }
          } catch { /* ignore parse errors */ }
        }
      }
      setStreaming(false)
    }).catch(() => { setError('網路錯誤，請重試'); setLoading(false); setStreaming(false) })
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
            <p className="text-[24px] mb-2">💼</p>
            <p className="text-[15px] font-medium text-[#0F2027] mb-1">分析 {name} 的職涯天賦</p>
            <p className="text-[12px] text-[#888] leading-relaxed">根據八字日主深度解讀適合你的職涯方向</p>
          </div>
          <p className="text-[11px] text-[#CCC]">深度解讀中，約需 10-15 秒</p>
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

  const sections = parseCareer(careerText)

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
          <div className="w-12 h-12 rounded-full bg-[#F0FDF4] border-2 border-[#059669] flex items-center justify-center text-[20px] mx-auto mb-3">
            {elementEmoji || '💼'}
          </div>
          <h1 className="text-[20px] font-medium text-[#0F2027] mb-1">{name} 的職涯天賦分析</h1>
          <p className="text-[12px] text-[#AAA]">根據八字日主 · {element ? `${element}屬性命格` : '深度命格解讀'}</p>
          <div className="inline-flex items-center gap-1 text-[10px] text-[#059669] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full px-3 py-1 mt-2">
            八字命格 × 五行屬性 · 專屬職涯方向
          </div>
        </div>

        {SECTIONS.map((title, i) => {
          const content = sections[title]
          const isLast = i === SECTIONS.length - 1
          return (
            <div key={title} className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-2.5">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[16px]">{SECTION_ICON[title]}</span>
                <p className="text-[13px] font-medium text-[#059669]">{title}</p>
              </div>
              {content ? (
                <div
                  className="text-[14px] text-[#444] leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: content + (streaming && isLast ? '<span class="inline-block w-0.5 h-4 bg-[#059669] animate-pulse ml-0.5 align-middle"></span>' : '') }}
                />
              ) : (
                <div className="space-y-2 animate-pulse">
                  <div className="h-3 bg-[#F0FDF4] rounded-full w-full" />
                  <div className="h-3 bg-[#F0FDF4] rounded-full w-5/6" />
                  <div className="h-3 bg-[#F0FDF4] rounded-full w-4/6" />
                </div>
              )}
            </div>
          )
        })}

        {/* Email Capture */}
        <div className="border border-[#BBF7D0] rounded-2xl overflow-hidden mb-4 mt-2">
          {emailSent ? (
            <div className="p-5 text-center">
              <p className="text-[20px] mb-1">✓</p>
              <p className="text-[14px] font-medium text-[#059669]">職涯報告已寄出！</p>
              <p className="text-[12px] text-[#888] mt-1">記得收藏那封信，隨時回來查看</p>
              <a
                href="https://www.instagram.com/wuming.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full h-10 border border-[#E5E7EB] rounded-xl text-[13px] text-[#888] flex items-center justify-center gap-2"
              >
                <span>追蹤悟明</span>
                <span className="text-[#C13584]">@wuming.app</span>
              </a>
            </div>
          ) : (
            <div className="bg-[#F0FDF4] p-4">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-[18px] leading-none mt-0.5">📩</span>
                <div>
                  <p className="text-[14px] font-medium text-[#0F2027] mb-0.5">把這份職涯分析寄到你的信箱</p>
                  <p className="text-[12px] text-[#777] leading-relaxed">
                    留下 Email，完整職涯報告將寄給你。<br />
                    <span className="text-[#E57373] font-medium">離開後資料將被清除。</span>
                  </p>
                </div>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  if (!email) return
                  setEmailLoading(true)
                  if (typeof window !== 'undefined') {
                    window.gtag?.('event', 'email_submitted', { page: 'career', name })
                  }
                  await fetch('/api/save-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, name, date, reading: careerText, bazi: null, lifePath: null, lifePathInfo: null }),
                  })
                  setEmailSent(true)
                  setEmailLoading(false)
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 h-10 bg-white border border-[#86EFAC] rounded-xl px-3 text-[14px] text-[#0F2027] outline-none focus:border-[#059669]"
                />
                <button type="submit" disabled={emailLoading}
                  className="h-10 px-4 bg-[#059669] text-white rounded-xl text-[13px] font-medium disabled:opacity-70">
                  {emailLoading ? '...' : '寄送'}
                </button>
              </form>
              <p className="text-[10px] text-[#AAA] text-center mt-2">完全免費 · 隨時可取消訂閱</p>
            </div>
          )}
        </div>

        <ExploreMore name={name} date={date} time={time} current="career" />

        <p className="text-center text-[10px] text-[#CCC] pb-6">
          © 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議
        </p>
      </div>
    </main>
  )
}

export default function CareerPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#059669] border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <CareerContent />
    </Suspense>
  )
}
