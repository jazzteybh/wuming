'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ELEMENT_EMOJI } from '@/lib/bazi'
import ExploreMore from '@/components/ExploreMore'

const SECTIONS = ['合盤總覽', '你們的天然默契', '互補與成長', '相處的挑戰', '最佳合作模式', '給你們的話']

const SECTION_ICON: Record<string, string> = {
  '合盤總覽': '☯',
  '你們的天然默契': '✨',
  '互補與成長': '🌱',
  '相處的挑戰': '🔍',
  '最佳合作模式': '🎯',
  '給你們的話': '💬',
}

function parseCompatibility(text: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const allKeys = ['緣分指數', ...SECTIONS]
  const pattern = new RegExp(`\\*\\*(${allKeys.join('|')})\\*\\*`)
  const parts = text.split(pattern)
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim()
    const content = (parts[i + 1] || '').trim().replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    sections[title] = content
  }
  return sections
}

interface BaziResult {
  dayStem: string
  dayStemElement: string
}

interface CompatibilityResult {
  compatibility: string
  bazi1: BaziResult
  bazi2: BaziResult
  lifePath1: number
  lifePath2: number
}

function CompatibilityContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [name1, setName1] = useState(searchParams.get('name') || '')
  const [date1, setDate1] = useState(searchParams.get('date') || '')
  const [name2, setName2] = useState('')
  const [date2, setDate2] = useState('')

  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [scoreVisible, setScoreVisible] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name1 || !date1 || !name2 || !date2) {
      setError('請填寫兩人的姓名與出生日期')
      return
    }
    setError('')
    setLoading(true)
    window.gtag?.('event', 'compatibility_report_viewed', { name1, name2 })
    try {
      const res = await fetch('/api/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name1, date1, name2, date2 }),
      })
      const d = await res.json()
      if (d.error) setError(d.error)
      else { setResult(d); setTimeout(() => setScoreVisible(true), 150) }
    } catch {
      setError('網路錯誤，請重試')
    } finally {
      setLoading(false)
    }
  }

  const sections = result ? parseCompatibility(result.compatibility) : {}
  const score = parseInt((sections['緣分指數'] || '').replace(/\D/g, '')) || 0

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
          <p className="text-[28px] mb-2">☯</p>
          <h1 className="text-[20px] font-medium text-[#0F2027] mb-1">天作之合</h1>
          <p className="text-[12px] text-[#AAA]">輸入兩人生日，解讀命格緣分</p>
          <div className="inline-flex items-center gap-1 text-[10px] text-[#059669] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full px-3 py-1 mt-2">
            八字合盤 · 五行互補分析
          </div>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            {/* Person 1 */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4">
              <p className="text-[11px] font-medium text-[#059669] mb-3 tracking-wide">第一位</p>
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] text-[#888] mb-1">姓名</label>
                  <input
                    value={name1}
                    onChange={e => setName1(e.target.value)}
                    placeholder="Jazz"
                    className="w-full h-10 bg-white border border-[#86EFAC] rounded-xl px-3 text-[14px] text-[#0F2027] placeholder-[#CCC] outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#888] mb-1">出生日期</label>
                  <input
                    type="date"
                    value={date1}
                    onChange={e => setDate1(e.target.value)}
                    className="w-full h-10 bg-white border border-[#86EFAC] rounded-xl px-3 text-[14px] text-[#0F2027] outline-none focus:border-[#059669]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center text-[20px] py-1">×</div>

            {/* Person 2 */}
            <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-2xl p-4">
              <p className="text-[11px] font-medium text-[#E11D48] mb-3 tracking-wide">第二位</p>
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] text-[#888] mb-1">姓名</label>
                  <input
                    value={name2}
                    onChange={e => setName2(e.target.value)}
                    placeholder="另一半或朋友的名字"
                    className="w-full h-10 bg-white border border-[#FECDD3] rounded-xl px-3 text-[14px] text-[#0F2027] placeholder-[#CCC] outline-none focus:border-[#E11D48]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#888] mb-1">出生日期</label>
                  <input
                    type="date"
                    value={date2}
                    onChange={e => setDate2(e.target.value)}
                    className="w-full h-10 bg-white border border-[#FECDD3] rounded-xl px-3 text-[14px] text-[#0F2027] outline-none focus:border-[#E11D48]"
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-[12px] text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-13 bg-[#059669] text-white text-[16px] font-medium rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70 active:opacity-90 transition-opacity py-4"
            >
              {loading ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" />
                  解讀中...
                </>
              ) : '☯ 解讀我們的緣分'}
            </button>
          </form>
        ) : (
          <>
            {/* Score banner */}
            <div className="bg-[#0F2027] rounded-2xl p-5 mb-3 text-center">
              <p className="text-[11px] text-[#86EFAC] mb-2 tracking-wide">緣分指數</p>
              <div className="flex items-end justify-center gap-1 mb-3">
                <span className="text-[52px] font-medium text-white leading-none">{score}</span>
                <span className="text-[18px] text-[#86EFAC] mb-2">/100</span>
              </div>
              {/* Score bar */}
              <div className="h-2 bg-white/10 rounded-full mx-4 mb-3">
                <div
                  className="h-full rounded-full bg-[#059669] transition-all duration-1000"
                  style={{ width: scoreVisible ? `${score}%` : '0%' }}
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[13px] font-medium text-white">
                  {result.bazi1?.dayStemElement ? ELEMENT_EMOJI[result.bazi1.dayStemElement] : ''} {name1}
                </span>
                <span className="text-[#AAA]">×</span>
                <span className="text-[13px] font-medium text-white">
                  {result.bazi2?.dayStemElement ? ELEMENT_EMOJI[result.bazi2.dayStemElement] : ''} {name2}
                </span>
              </div>
            </div>

            {/* Life path row */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-3 text-center">
                <p className="text-[10px] text-[#AAA] mb-1">{name1} 生命數字</p>
                <p className="text-[28px] font-medium text-[#059669] leading-none">{result.lifePath1}</p>
                <p className="text-[11px] text-[#888] mt-1">{result.bazi1.dayStemElement}命 · {result.bazi1.dayStem}日主</p>
              </div>
              <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-2xl p-3 text-center">
                <p className="text-[10px] text-[#AAA] mb-1">{name2} 生命數字</p>
                <p className="text-[28px] font-medium text-[#E11D48] leading-none">{result.lifePath2}</p>
                <p className="text-[11px] text-[#888] mt-1">{result.bazi2.dayStemElement}命 · {result.bazi2.dayStem}日主</p>
              </div>
            </div>

            {/* Content sections */}
            {SECTIONS.map(title => {
              const content = sections[title]
              if (!content) return null
              return (
                <div key={title} className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-2.5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[16px]">{SECTION_ICON[title]}</span>
                    <p className="text-[13px] font-medium text-[#059669]">{title}</p>
                  </div>
                  <div
                    className="text-[14px] text-[#444] leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              )
            })}

            {/* Share */}
            <div className="bg-[#0F2027] rounded-2xl p-4 mb-3">
              <p className="text-[13px] font-medium text-white mb-1 text-center">分享給你的另一半</p>
              <p className="text-[11px] text-[#AAA] text-center mb-3">讓他們也看看你們的合盤結果</p>
              <button
                onClick={async () => {
                  const shareText = `我和${name2}用悟明做了合盤分析，緣分指數 ${score}/100！快來看看你們的天作之合 👉 https://wumingai.app`
                  window.gtag?.('event', 'share_clicked', { page: 'compatibility' })
                  if (navigator.share) {
                    await navigator.share({ text: shareText })
                  } else {
                    await navigator.clipboard.writeText(shareText)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2500)
                  }
                }}
                className="w-full h-10 bg-[#059669] text-white rounded-xl text-[13px] font-medium flex items-center justify-center gap-2 active:opacity-80 transition-opacity mb-2"
              >
                {copied ? '✓ 已複製連結！' : '✦ 分享合盤結果'}
              </button>
              <a
                href="https://www.instagram.com/wuming.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-9 border border-white/10 rounded-xl text-[12px] text-[#888] flex items-center justify-center gap-1.5"
              >
                追蹤 <span className="text-[#C13584]">@wuming.app</span>
              </a>
            </div>

            {/* Email capture */}
            <div className="border border-[#BBF7D0] rounded-2xl overflow-hidden mb-4">
              {emailSent ? (
                <div className="p-4 text-center bg-[#F0FDF4]">
                  <p className="text-[20px] mb-1">✓</p>
                  <p className="text-[14px] font-medium text-[#059669]">合盤報告已寄出！</p>
                  <p className="text-[12px] text-[#888] mt-1">收藏那封信，隨時回來查看</p>
                </div>
              ) : (
                <div className="bg-[#F0FDF4] p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-[18px] leading-none mt-0.5">📩</span>
                    <div>
                      <p className="text-[14px] font-medium text-[#0F2027] mb-0.5">把合盤結果寄到你的信箱</p>
                      <p className="text-[12px] text-[#777]">留下 Email，完整報告將寄給你。</p>
                    </div>
                  </div>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      if (!email) return
                      setEmailLoading(true)
                      window.gtag?.('event', 'email_submitted', { page: 'compatibility', name1, name2 })
                      await fetch('/api/save-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, name: `${name1} × ${name2}`, date: date1, reading: result.compatibility, bazi: null, lifePath: null, lifePathInfo: null }),
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

            {/* Try again */}
            <button
              onClick={() => setResult(null)}
              className="w-full text-center text-[13px] text-[#059669] underline mb-4"
            >
              換兩個人再試一次
            </button>

            <ExploreMore name={name1} date={date1} current="compatibility" />
          </>
        )}

        <p className="text-center text-[10px] text-[#CCC] pb-6">
          © 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議
        </p>
      </div>
    </main>
  )
}

export default function CompatibilityPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#059669] border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <CompatibilityContent />
    </Suspense>
  )
}
