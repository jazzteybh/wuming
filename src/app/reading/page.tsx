'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getZodiac, ELEMENT_LUCKY_COLORS, ELEMENT_EMOJI, DAY_STEM_TAGS } from '@/lib/bazi'

interface BaziResult {
  year: { stem: string; branch: string }
  month: { stem: string; branch: string }
  day: { stem: string; branch: string }
  hour: { stem: string; branch: string } | null
  dayStem: string
  dayStemElement: string
  elements: Record<string, number>
  dominantElement: string
  missingElements: string[]
}

interface ReadingData {
  reading: string
  bazi: BaziResult
  lifePath: number
  lifePathInfo: { title: string; description: string; strengths: string[] }
}

const ELEMENT_COLOR: Record<string, string> = {
  木: 'bg-green-50 text-green-700 border-green-200',
  火: 'bg-orange-50 text-orange-700 border-orange-200',
  土: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  金: 'bg-gray-50 text-gray-600 border-gray-200',
  水: 'bg-blue-50 text-blue-700 border-blue-200',
}

const MAIN_SECTIONS = ['性格天賦', '職涯方向', '2026年運勢', '成長方向']

function parseReading(text: string): Record<string, string> {
  const sections: Record<string, string> = {}
  // Only split on main section headers, not sub-headers inside content
  const pattern = new RegExp(`\\*\\*(${MAIN_SECTIONS.join('|')}|生命數字[^*]*)\\*\\*`)
  const parts = text.split(pattern)
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim()
    // Render remaining **bold** inside content as styled text, not new sections
    const content = (parts[i + 1] || '').trim().replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    sections[title] = content
  }
  return sections
}

const PRO_FEATURES = [
  { icon: '📊', text: '流年逐月詳細分析' },
  { icon: '💬', text: '無限 AI 命盤提問' },
  { icon: '👥', text: '合盤相容性分析' },
  { icon: '📄', text: 'PDF 精美命盤報告' },
  { icon: '🔔', text: '每月專屬運勢推播' },
]

function ReadingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get('name') || ''
  const date = searchParams.get('date') || ''
  const time = searchParams.get('time') || ''
  const gender = searchParams.get('gender') || ''

  const [data, setData] = useState<ReadingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)

  useEffect(() => {
    if (!name || !date || !gender) { router.push('/'); return }
    fetch('/api/reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, date, time, gender }),
    })
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setData(d) })
      .catch(() => setError('網路錯誤，請重試'))
      .finally(() => setLoading(false))
  }, [])

  function trackPayClick(plan: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).gtag('event', 'pay_click', { plan })
    }
    setShowComingSoon(true)
  }

  async function handleSaveEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setEmailLoading(true)
    await fetch('/api/save-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, reading: data?.reading, bazi: data?.bazi, lifePath: data?.lifePath, lifePathInfo: data?.lifePathInfo }),
    })
    setEmailSent(true)
    setEmailLoading(false)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#0D9488] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[15px] text-[#0F2027] font-medium mb-1">正在解讀 {name} 的命盤</p>
          <p className="text-[13px] text-[#AAA]">AI 分析中，約需 10-20 秒...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
        <div className="text-center">
          <p className="text-[15px] text-red-500 mb-4">{error}</p>
          <button onClick={() => router.push('/')} className="text-[#0D9488] underline text-[14px]">返回首頁</button>
        </div>
      </main>
    )
  }

  if (!data) return null

  const sections = parseReading(data.reading)
  const sectionKeys = Object.keys(sections)
  const zodiac = getZodiac(date)
  const luckyColors = ELEMENT_LUCKY_COLORS[data.bazi.dayStemElement]
  const elementEmoji = ELEMENT_EMOJI[data.bazi.dayStemElement]
  const tags = DAY_STEM_TAGS[data.bazi.dayStem] || []

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-5 pt-4 pb-3 border-b border-[#F0FAF8]">
        <button onClick={() => router.push('/')} className="text-xl font-medium tracking-wide">
          悟<span className="text-[#0D9488]">明</span>
        </button>
        <button onClick={() => router.push('/')} className="text-[13px] text-[#0D9488]">重新解讀</button>
      </nav>

      <div className="px-5 py-5 max-w-lg mx-auto">

        {/* Profile */}
        <div className="text-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#F0FDF9] border-2 border-[#0D9488] flex items-center justify-center text-[22px] font-medium text-[#0D9488] mx-auto mb-3">
            {name.charAt(0)}
          </div>
          <h1 className="text-[18px] font-medium text-[#0F2027]">{name} 的命盤</h1>
          <p className="text-[12px] text-[#AAA] mt-1">{date} · {gender} · {data.bazi.dayStem}日主</p>
        </div>

        {/* Identity Strip — the WOW moment */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {/* Element */}
          <div className="bg-[#F0FDF9] border border-[#CCFBF1] rounded-2xl p-3.5">
            <p className="text-[10px] text-[#AAA] mb-1">五行命格</p>
            <p className="text-[20px] mb-0.5">{elementEmoji}</p>
            <p className="text-[16px] font-medium text-[#0F2027]">{data.bazi.dayStem}{data.bazi.dayStemElement}日主</p>
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {Object.entries(data.bazi.elements).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).map(([el,count])=>(
                <span key={el} className={`text-[10px] px-1.5 py-0.5 rounded-full border ${ELEMENT_COLOR[el]}`}>
                  {el}{'▪'.repeat(count)}
                </span>
              ))}
            </div>
          </div>

          {/* Zodiac */}
          <div className="bg-[#F0FDF9] border border-[#CCFBF1] rounded-2xl p-3.5">
            <p className="text-[10px] text-[#AAA] mb-1">星座</p>
            <p className="text-[20px] mb-0.5">{zodiac.emoji}</p>
            <p className="text-[16px] font-medium text-[#0F2027]">{zodiac.sign}</p>
            <p className="text-[11px] text-[#888] mt-1">{data.bazi.dayStem}{data.bazi.dayStemElement} · {zodiac.sign}</p>
          </div>

          {/* Life Path */}
          <div className="bg-[#F0FDF9] border border-[#CCFBF1] rounded-2xl p-3.5">
            <p className="text-[10px] text-[#AAA] mb-1">生命數字</p>
            <p className="text-[28px] font-medium text-[#0D9488] leading-none mb-1">{data.lifePath}</p>
            <p className="text-[13px] font-medium text-[#0F2027]">{data.lifePathInfo.title}</p>
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {data.lifePathInfo.strengths.slice(0,2).map(s=>(
                <span key={s} className="text-[10px] bg-white border border-[#A7F3D0] text-[#0D9488] px-2 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          {/* Lucky Colors */}
          <div className="bg-[#F0FDF9] border border-[#CCFBF1] rounded-2xl p-3.5">
            <p className="text-[10px] text-[#AAA] mb-1">幸運色</p>
            <div className="flex gap-1.5 mb-2">
              {luckyColors.hex.map((hex, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" style={{ background: hex }} />
              ))}
            </div>
            <p className="text-[13px] font-medium text-[#0F2027]">{luckyColors.colors.join('・')}</p>
            <p className="text-[10px] text-[#AAA] mt-1">根據五行{data.bazi.dominantElement}屬性</p>
          </div>
        </div>

        {/* Personality Tags */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {tags.map(tag => (
            <span key={tag} className="text-[12px] bg-[#0D9488] text-white px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>

        {/* BaZi Chart */}
        <div className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-3">
          <p className="text-[11px] text-[#0D9488] tracking-wide mb-3">八字四柱</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: '年柱', pillar: data.bazi.year },
              { label: '月柱', pillar: data.bazi.month },
              { label: '日柱', pillar: data.bazi.day },
              { label: '時柱', pillar: data.bazi.hour },
            ].map(({ label, pillar }) => (
              <div key={label} className="text-center">
                <p className="text-[10px] text-[#AAA] mb-1.5">{label}</p>
                <div className={`h-9 rounded-t-lg flex items-center justify-center text-[18px] font-medium border ${
                  label === '日柱' ? 'bg-[#0D9488] text-white border-[#0D9488]' : 'bg-[#F0FDF9] text-[#0D9488] border-[#A7F3D0]'
                }`}>
                  {pillar?.stem ?? '—'}
                </div>
                <div className="h-9 rounded-b-lg flex items-center justify-center text-[18px] font-medium bg-[#FAFFFE] border border-t-0 border-[#CCFBF1] text-[#0F2027]">
                  {pillar?.branch ?? '—'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Reading Sections */}
        {sectionKeys.map(title => (
          <div key={title} className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-3">
            <p className="text-[13px] font-medium text-[#0D9488] mb-2.5">{title}</p>
            <p className="text-[14px] text-[#444] leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: sections[title] }} />
          </div>
        ))}

        {/* Email Capture */}
        <div className="border border-[#CCFBF1] rounded-2xl overflow-hidden mb-4">
          {emailSent ? (
            // POST-EMAIL UPSELL — peak intent moment
            <div>
              <div className="bg-[#F0FDF9] p-4 text-center border-b border-[#CCFBF1]">
                <p className="text-[20px] mb-1">✓</p>
                <p className="text-[14px] font-medium text-[#0D9488]">命盤已儲存！每月運勢將寄至你的信箱</p>
              </div>
              <div className="p-4 bg-white">
                <p className="text-[15px] font-semibold text-[#0F2027] mb-0.5">你的命盤還藏著更多</p>
                <p className="text-[12px] text-[#888] mb-4">這份解讀只是開始。悟明 Pro 幫你把命盤變成行動指南。</p>
                <div className="space-y-3 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F0FDF9] flex items-center justify-center text-[15px] shrink-0">📅</div>
                    <div>
                      <p className="text-[13px] font-medium text-[#0F2027]">知道哪個月該出手</p>
                      <p className="text-[11px] text-[#888] leading-relaxed">流年逐月分析，告訴你今年哪幾個月是你的黃金時機，哪幾個月要保守。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F0FDF9] flex items-center justify-center text-[15px] shrink-0">💼</div>
                    <div>
                      <p className="text-[13px] font-medium text-[#0F2027]">找到真正適合你的職涯路</p>
                      <p className="text-[11px] text-[#888] leading-relaxed">深度分析你的命格與哪些產業、職位最契合，避開走彎路。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F0FDF9] flex items-center justify-center text-[15px] shrink-0">❤️</div>
                    <div>
                      <p className="text-[13px] font-medium text-[#0F2027]">感情與合作的最佳時機</p>
                      <p className="text-[11px] text-[#888] leading-relaxed">合盤分析看你與另一半或合夥人的相容性，以及何時是關係推進的好時機。</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button onClick={() => trackPayClick('monthly')} className="h-12 bg-[#0D9488] text-white rounded-xl text-[13px] font-semibold flex flex-col items-center justify-center leading-tight">
                    <span>月繳方案</span>
                    <span className="text-[11px] opacity-80">NTD $149 / 月</span>
                  </button>
                  <button onClick={() => trackPayClick('yearly')} className="h-12 bg-[#0F2027] text-white rounded-xl text-[13px] font-semibold flex flex-col items-center justify-center leading-tight relative overflow-hidden">
                    <span className="absolute top-0 right-0 bg-[#0D9488] text-[9px] px-1.5 py-0.5 rounded-bl-lg">省44%</span>
                    <span>年繳方案</span>
                    <span className="text-[11px] opacity-80">NTD $1,290 / 年</span>
                  </button>
                </div>
                <button onClick={() => trackPayClick('single')} className="w-full h-10 border border-[#CCFBF1] rounded-xl text-[12px] text-[#0D9488] bg-[#F0FDF9]">
                  單次深度報告 NTD $299 →
                </button>

                {showComingSoon && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6" onClick={() => setShowComingSoon(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-xl" onClick={e => e.stopPropagation()}>
                      <p className="text-[28px] mb-2">🔔</p>
                      <p className="text-[16px] font-semibold text-[#0F2027] mb-1">即將上線</p>
                      <p className="text-[13px] text-[#666] leading-relaxed mb-4">付費功能正在開發中，上線後將第一時間通知你！</p>
                      <button onClick={() => setShowComingSoon(false)} className="w-full h-10 bg-[#0D9488] text-white rounded-xl text-[13px] font-medium">
                        好的，期待！
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#F0FDF9] p-4">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-[18px] leading-none mt-0.5">📩</span>
                <div>
                  <p className="text-[14px] font-medium text-[#0F2027] mb-0.5">免費寄送完整命盤到你的信箱</p>
                  <p className="text-[12px] text-[#777] leading-relaxed">
                    留下 Email，我們將把你的完整命盤報告寄給你。<br/>
                    <span className="text-[#E57373] font-medium">不儲存的話，離開後資料將被清除。</span>
                  </p>
                </div>
              </div>
              <form onSubmit={handleSaveEmail} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 h-10 bg-white border border-[#A7F3D0] rounded-xl px-3 text-[14px] text-[#0F2027] outline-none focus:border-[#0D9488]"
                />
                <button type="submit" disabled={emailLoading}
                  className="h-10 px-4 bg-[#0D9488] text-white rounded-xl text-[13px] font-medium disabled:opacity-70">
                  {emailLoading ? '...' : '儲存'}
                </button>
              </form>
              <p className="text-[10px] text-[#AAA] text-center mt-2">每月運勢更新 · 隨時可取消訂閱 · 完全免費</p>
              <button onClick={() => router.push('/')} className="w-full text-center text-[11px] text-[#CCC] mt-1">
                不了，捨棄我的命盤
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-[#CCC] pb-6">
          © 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議
        </p>
      </div>
    </main>
  )
}

export default function ReadingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#0D9488] border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <ReadingContent />
    </Suspense>
  )
}
