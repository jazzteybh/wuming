'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ELEMENT_EMOJI, getZodiac, getChineseZodiac, ELEMENT_LUCKY_COLORS } from '@/lib/bazi'
import ExploreMore from '@/components/ExploreMore'
import FeedbackForm from '@/components/FeedbackForm'

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

const ELEMENT_RELATIONS: Record<string, Record<string, { type: string; label: string; desc: string; color: string }>> = {
  '木': {
    '火': { type: '相生', label: '木生火 🔥', desc: '你滋養對方，給對方能量與啟發', color: 'bg-green-50 border-green-200 text-green-700' },
    '水': { type: '相生', label: '水生木 💧', desc: '對方滋養你，你在這段關係中成長', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    '土': { type: '相剋', label: '木剋土 🏔️', desc: '你主導這段關係，需注意不要太強勢', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
    '金': { type: '相剋', label: '金剋木 ⚔️', desc: '對方對你有約束力，磨合期較長', color: 'bg-gray-50 border-gray-200 text-gray-700' },
    '木': { type: '比和', label: '木木同心 🌳', desc: '性格相似，容易理解彼此，但也容易競爭', color: 'bg-green-50 border-green-200 text-green-700' },
  },
  '火': {
    '土': { type: '相生', label: '火生土 🌾', desc: '你滋養對方，給對方安全感與溫暖', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    '木': { type: '相生', label: '木生火 🌳', desc: '對方滋養你，帶給你源源不絕的動力', color: 'bg-green-50 border-green-200 text-green-700' },
    '金': { type: '相剋', label: '火剋金 💎', desc: '你主導這段關係，對方需要適應你的節奏', color: 'bg-gray-50 border-gray-200 text-gray-700' },
    '水': { type: '相剋', label: '水剋火 🌊', desc: '對方對你有平衡作用，能讓你冷靜下來', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    '火': { type: '比和', label: '火火熱情 🔥', desc: '兩人都熱情直接，火花四射，但也容易爭執', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  },
  '土': {
    '金': { type: '相生', label: '土生金 ⚔️', desc: '你滋養對方，給對方資源與支持', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
    '火': { type: '相生', label: '火生土 🔥', desc: '對方滋養你，帶給你熱情與方向感', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    '水': { type: '相剋', label: '土剋水 💧', desc: '你主導這段關係，能穩住對方的情緒', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    '木': { type: '相剋', label: '木剋土 🌳', desc: '對方對你有約束力，帶來成長也帶來壓力', color: 'bg-green-50 border-green-200 text-green-700' },
    '土': { type: '比和', label: '土土厚實 🏔️', desc: '兩人都穩重踏實，關係安定，但缺少變化', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
  },
  '金': {
    '水': { type: '相生', label: '金生水 💧', desc: '你滋養對方，帶給對方清晰與方向', color: 'bg-gray-50 border-gray-200 text-gray-700' },
    '土': { type: '相生', label: '土生金 🌾', desc: '對方滋養你，給你資源與穩定的後盾', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
    '木': { type: '相剋', label: '金剋木 🌳', desc: '你主導這段關係，有雕琢對方的力量', color: 'bg-green-50 border-green-200 text-green-700' },
    '火': { type: '相剋', label: '火剋金 🔥', desc: '對方對你有融化作用，讓你學會柔軟', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    '金': { type: '比和', label: '金金鏗鏘 ⚔️', desc: '兩人都直接有個性，需要互相磨合尊重', color: 'bg-gray-50 border-gray-200 text-gray-700' },
  },
  '水': {
    '木': { type: '相生', label: '水生木 🌳', desc: '你滋養對方，帶給對方成長的養分', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    '金': { type: '相生', label: '金生水 ⚔️', desc: '對方滋養你，帶給你清晰與資源', color: 'bg-gray-50 border-gray-200 text-gray-700' },
    '火': { type: '相剋', label: '水剋火 🔥', desc: '你主導這段關係，能平衡對方的熱情', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    '土': { type: '相剋', label: '土剋水 🏔️', desc: '對方對你有約束力，帶來穩定也帶來壓力', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
    '水': { type: '比和', label: '水水相連 💧', desc: '兩人都敏感細膩，心靈相通，容易深度連結', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  },
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
          <img src="/logo.png" alt="悟明" className="h-8 w-8" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-[18px] font-medium tracking-wide text-[#059669]">悟明</span>
            <span className="text-[10px] text-[#AAA]">讀懂自己，導航人生</span>
          </div>
        </button>
        <button onClick={() => router.back()} className="text-[13px] text-[#059669]">← 返回命盤</button>
      </nav>

      <div className="px-5 py-5 max-w-lg mx-auto">

        <div className="text-center mb-5">
          <p className="text-[28px] mb-2">☯</p>
          <h1 className="text-[20px] font-medium text-[#0F2027] mb-1">緣分指數測試</h1>
          <p className="text-[12px] text-[#AAA]">輸入兩人生日，測出你們的緣分指數</p>
          <div className="inline-flex items-center gap-1 text-[10px] text-[#059669] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full px-3 py-1 mt-2">
            八字合盤 · 五行互補分析
          </div>
        </div>

        {!result ? (
          <>
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
                    className="w-full h-10 bg-white border border-[#86EFAC] rounded-xl px-3 pr-2 text-[14px] text-[#0F2027] outline-none focus:border-[#059669] appearance-none"
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
                    className="w-full h-10 bg-white border border-[#FECDD3] rounded-xl px-3 pr-2 text-[14px] text-[#0F2027] outline-none focus:border-[#E11D48] appearance-none"
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
              <button onClick={() => router.push('/career-entry')} className="flex items-center gap-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl px-4 py-3 active:opacity-70 transition-opacity text-left">
                <span className="text-[18px]">💼</span>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-[#0F2027]">職涯天賦分析</div>
                  <div className="text-[10px] text-[#888]">深度職涯天賦解讀</div>
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
            </div>
          </div>
          </>
        ) : (
          <>
            {/* Score card */}
            {(() => {
              const zodiac1 = getZodiac(date1)
              const zodiac2 = getZodiac(date2)
              const cz1 = getChineseZodiac(date1)
              const cz2 = getChineseZodiac(date2)
              return (
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 mb-3">
                  <div className="text-center mb-4">
                    <p className="text-[11px] text-[#AAA] mb-1 tracking-wide">緣分指數</p>
                    <div className="flex items-end justify-center gap-1 mb-3">
                      <span className="text-[52px] font-medium text-[#059669] leading-none">{score}</span>
                      <span className="text-[18px] text-[#AAA] mb-2">/100</span>
                    </div>
                    <div className="h-1.5 bg-[#E5E7EB] rounded-full mx-6 mb-3">
                      <div
                        className="h-full rounded-full bg-[#059669] transition-all duration-1000"
                        style={{ width: scoreVisible ? `${score}%` : '0%' }}
                      />
                    </div>
                    <p className="text-[13px] font-medium text-[#0F2027]">{name1} × {name2}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3">
                      <p className="text-[10px] text-[#AAA] mb-2">{name1}</p>
                      <p className="text-[20px] leading-none mb-1">{result.bazi1?.dayStemElement ? ELEMENT_EMOJI[result.bazi1.dayStemElement] : ''}</p>
                      <p className="text-[13px] font-medium text-[#059669] mb-0.5">生命數字 {result.lifePath1}</p>
                      <p className="text-[11px] text-[#888] mb-2">{result.bazi1.dayStemElement}命 · {result.bazi1.dayStem}日主</p>
                      <div className="h-px bg-[#BBF7D0] mb-2" />
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px]">{zodiac1.emoji}</span>
                        <div>
                          <p className="text-[11px] font-medium text-[#0F2027]">{zodiac1.sign}</p>
                          <p className="text-[9px] text-[#AAA]">屬{cz1.animal}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-xl p-3">
                      <p className="text-[10px] text-[#AAA] mb-2">{name2}</p>
                      <p className="text-[20px] leading-none mb-1">{result.bazi2?.dayStemElement ? ELEMENT_EMOJI[result.bazi2.dayStemElement] : ''}</p>
                      <p className="text-[13px] font-medium text-[#E11D48] mb-0.5">生命數字 {result.lifePath2}</p>
                      <p className="text-[11px] text-[#888] mb-2">{result.bazi2.dayStemElement}命 · {result.bazi2.dayStem}日主</p>
                      <div className="h-px bg-[#FECDD3] mb-2" />
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px]">{zodiac2.emoji}</span>
                        <div>
                          <p className="text-[11px] font-medium text-[#0F2027]">{zodiac2.sign}</p>
                          <p className="text-[9px] text-[#AAA]">屬{cz2.animal}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* 五行相性 visual */}
            {(() => {
              const e1 = result.bazi1.dayStemElement
              const e2 = result.bazi2.dayStemElement
              const relation = ELEMENT_RELATIONS[e1]?.[e2]
              if (!relation) return null
              const color1 = ELEMENT_LUCKY_COLORS[e1]?.hex?.[0] || '#059669'
              const color2 = ELEMENT_LUCKY_COLORS[e2]?.hex?.[0] || '#E11D48'
              return (
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 mb-3">
                  <p className="text-[11px] text-[#AAA] mb-3 text-center">五行相性</p>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-[22px]" style={{ background: color1 + '22', border: `2px solid ${color1}` }}>
                        {ELEMENT_EMOJI[e1]}
                      </div>
                      <span className="text-[11px] text-[#888]">{name1}</span>
                      <span className="text-[10px] font-medium text-[#059669]">{e1}命</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${relation.color}`}>{relation.type}</span>
                      <span className="text-[18px]">⇄</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-[22px]" style={{ background: color2 + '22', border: `2px solid ${color2}` }}>
                        {ELEMENT_EMOJI[e2]}
                      </div>
                      <span className="text-[11px] text-[#888]">{name2}</span>
                      <span className="text-[10px] font-medium text-[#E11D48]">{e2}命</span>
                    </div>
                  </div>
                  <div className={`rounded-xl p-3 border ${relation.color}`}>
                    <p className="text-[12px] font-medium mb-1">{relation.label}</p>
                    <p className="text-[12px] leading-relaxed">{relation.desc}</p>
                  </div>
                </div>
              )
            })()}

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
              <p className="text-[13px] font-medium text-white mb-1 text-center">分享緣分結果</p>
              <p className="text-[11px] text-[#AAA] text-center mb-3">讓他們也來看看你們的緣分指數</p>
              <button
                onClick={async () => {
                  const shareText = `我和${name2}用悟明測了緣分指數，竟然有 ${score}/100！你也來測測看 👉 https://wumingai.app`
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
                {copied ? '✓ 已複製連結！' : '✦ 分享緣分指數'}
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
                  <p className="text-[14px] font-medium text-[#059669]">緣分報告已寄出！</p>
                  <p className="text-[12px] text-[#888] mt-1">收藏那封信，隨時回來查看</p>
                </div>
              ) : (
                <div className="bg-[#F0FDF4] p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-[18px] leading-none mt-0.5">📩</span>
                    <div>
                      <p className="text-[14px] font-medium text-[#0F2027] mb-0.5">把緣分報告寄到你的信箱</p>
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
                        body: JSON.stringify({ email, name: `${name1} × ${name2}`, name1, name2, score, date: date1, type: 'compatibility', reading: result.compatibility, bazi: null, lifePath: null, lifePathInfo: null }),
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
            <FeedbackForm name={name1} />
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
