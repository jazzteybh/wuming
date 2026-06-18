'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ELEMENT_EMOJI, getZodiac } from '@/lib/bazi'
import ExploreMore from '@/components/ExploreMore'
import FeedbackForm from '@/components/FeedbackForm'
import ShareCard from '@/components/ShareCard'

type HType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

const TYPE_INFO: Record<HType, { name: string; icon: string }> = {
  R: { name: '創造者', icon: '🔨' },
  I: { name: '探索者', icon: '📚' },
  A: { name: '表達者', icon: '🎨' },
  S: { name: '連結者', icon: '🤝' },
  E: { name: '領導者', icon: '🎯' },
  C: { name: '規劃者', icon: '📋' },
}

const TYPE_INDUSTRIES: Record<HType, string[]> = {
  R: ['製造 / 工程', '建築 / 空間設計', '科技硬體', '食品 / 餐飲', '運動健身'],
  I: ['自我成長 / 身心靈', '教育科技', '媒體 / 內容', '醫療 / 研究', '科技產品'],
  A: ['創意 / 設計', '媒體 / 娛樂', '品牌行銷', '時尚', '藝術教育'],
  S: ['教育 / 培訓', '醫療 / 心理', '非營利', '人資 / 社群', '服務業'],
  E: ['新創 / 創業', '行銷 / 業務', '金融投資', '房地產', '管理顧問'],
  C: ['金融 / 會計', '法律 / 合規', '科技後台', '政府 / 行政', '物流管理'],
}

const TYPE_WEAKNESSES: Record<HType, string[]> = {
  R: ['不擅長推銷自己，容易被低估', '需要大量社交的環境很消耗能量'],
  I: ['容易研究過頭、遲遲不行動', '完美主義讓產品上線時間拖延'],
  A: ['方向容易飄移，半途換跑道', '不穩定的收入讓生活有壓力'],
  S: ['容易過度付出，難以拒絕別人', '害怕衝突，有時犧牲自己的需求'],
  E: ['衝太快容易忽略細節和人的感受', '在大組織容易跟主管或制度衝突'],
  C: ['等到一切完美才行動，容易錯過時機', '過度謹慎讓機會從手邊流走'],
}

const STARTUP_REC: Record<HType, { rec: 'startup' | 'either' | 'employee'; reason: string }> = {
  R: { rec: 'either', reason: '重點是要有動手空間，不能只開會' },
  I: { rec: 'startup', reason: '需要自己定研究方向，創業讓知識真正發揮' },
  A: { rec: 'startup', reason: '沒有自由就沒有創作，freelance 或創業才能發揮' },
  S: { rec: 'either', reason: '需要有人的環境，組織或自創都行' },
  E: { rec: 'startup', reason: '在別人屋簷下會憋屈，需要自己定方向' },
  C: { rec: 'employee', reason: '系統和結構給你安全感，與 E 型夥伴合作更理想' },
}

function getDayStemElement(stem: string): string {
  if ('甲乙'.includes(stem)) return '木'
  if ('丙丁'.includes(stem)) return '火'
  if ('戊己'.includes(stem)) return '土'
  if ('庚辛'.includes(stem)) return '金'
  if ('壬癸'.includes(stem)) return '水'
  return ''
}

const BAZI_INSIGHTS: Record<string, Record<HType, string>> = {
  木: {
    R: '木有生長力，動手做的同時也渴望創新和突破',
    I: '木的探索欲旺盛，深度研究讓你越做越有能量',
    A: '木最有創造力，你的作品天生帶有生命力',
    S: '木有滋養特質，幫助他人的同時你自己也在成長',
    E: '木有衝勁，你的領導力來自感染力，不是強勢',
    C: '木需要結構才能茁壯，系統化思維讓你發揮最大潛力',
  },
  火: {
    R: '火有溫度，你做出來的東西不只實用，還能感動人',
    I: '火有探照燈特質，你研究得越深，照亮他人越廣',
    A: '火天生有表達力，你的創作有溫度、有感召力',
    S: '火溫暖他人，你的連結讓人感到被真正看見',
    E: '火天生有感召力，你用影響力帶人，而不是控制',
    C: '火的能量需要方向，系統讓你的熱情有地方落地',
  },
  土: {
    R: '土踏實穩重，你做出的東西可靠耐用',
    I: '土有深厚積累力，你的研究有根基、有深度',
    A: '土的創作有質感，不追流行，有獨特的厚度',
    S: '土是最能承托他人的元素，你的支持讓人有安全感',
    E: '土的領導穩健不急進，慢慢走反而能走更遠',
    C: '土天生親近秩序，規劃和系統是你最自然的能力',
  },
  金: {
    R: '金精準，你的動手能力有高標準，細節到位',
    I: '金有穿透力，你的研究喜歡直接找到核心本質',
    A: '金的創作俐落有力道，風格清晰不拖泥帶水',
    S: '金重義氣，你的連結重質不重量',
    E: '金有決斷力，領導時果斷清晰，不拖拉',
    C: '金天生喜歡秩序，你的規劃嚴謹可靠',
  },
  水: {
    R: '水有滲透力，你動手時善於找到別人沒看到的突破口',
    I: '水天生好奇，越往深處越有能量，研究是你的本能',
    A: '水流動多變，你的創作風格有深度，難以被歸類',
    S: '水善於感知他人，你的連結有深度，不流於表面',
    E: '水有韌性，你的領導方式柔中帶剛，後勁十足',
    C: '水需要容器才能發揮力量，系統和規劃讓你如魚得水',
  },
}

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
  const gender = searchParams.get('gender') || 'male'
  const h = searchParams.get('h') || ''
  const primaryType = (h[0] as HType) || null
  const secondaryType = (h[1] as HType) || null

  const [careerText, setCareerText] = useState('')
  const [streaming, setStreaming] = useState(true)
  const [elementEmoji, setElementEmoji] = useState('')
  const [element, setElement] = useState('')
  const [dayStem, setDayStem] = useState('')
  const [lifePath, setLifePath] = useState(0)
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
              if (msg.bazi?.dayStem) setDayStem(msg.bazi.dayStem)
              if (msg.lifePath) setLifePath(msg.lifePath)
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
            <img src="/logo-green.png" alt="悟明" className="h-8 w-8" />
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
          <img src="/logo-green.png" alt="悟明" className="h-8 w-8" />
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

        {primaryType && (
          <div className="mb-4">
            {/* Holland type card */}
            <div className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-2.5">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[11px] font-medium text-[#059669] bg-[#F0FDF4] px-2.5 py-1 rounded-full">悟明職涯型態</span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[22px] font-medium text-[#0F2027]">
                  {TYPE_INFO[primaryType].icon} {TYPE_INFO[primaryType].name}
                  {secondaryType && ` × ${TYPE_INFO[secondaryType].icon} ${TYPE_INFO[secondaryType].name}`}
                </span>
              </div>
              {dayStem && (() => {
                const el = getDayStemElement(dayStem)
                const insight = el && BAZI_INSIGHTS[el]?.[primaryType]
                return insight ? (
                  <p className="text-[13px] text-[#555] leading-relaxed mt-2 mb-3 pl-0.5">{dayStem}{el} × {TYPE_INFO[primaryType].name}：{insight}</p>
                ) : null
              })()}
              {/* Score bars */}
              {[primaryType, secondaryType].filter(Boolean).map(t => t && (
                <div key={t} className="mb-1.5">
                  <div className="flex justify-between text-[11px] text-[#AAA] mb-1">
                    <span>{TYPE_INFO[t].name} {t}</span>
                  </div>
                  <div className="h-1.5 bg-[#F0FDF4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#059669] rounded-full" style={{ width: t === primaryType ? '83%' : '67%' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* 打工 vs 創業 */}
            {(() => {
              const rec = STARTUP_REC[primaryType]
              const isStartup = rec.rec === 'startup' || secondaryType === 'E'
              const isEmployee = rec.rec === 'employee' && secondaryType !== 'E'
              return (
                <div className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-2.5">
                  <p className="text-[13px] font-medium text-[#059669] mb-2.5">打工 vs 創業</p>
                  <div className="flex gap-2">
                    <div className={`flex-1 p-3 rounded-xl text-center border ${!isStartup && !isEmployee ? 'border-[#059669] bg-[#F0FDF4]' : isEmployee ? 'border-[#059669] bg-[#F0FDF4]' : 'border-[#F0F0F0] bg-white'}`}>
                      <p className={`text-[13px] font-medium ${isEmployee ? 'text-[#059669]' : 'text-[#CCC]'}`}>打工</p>
                    </div>
                    <div className={`flex-1 p-3 rounded-xl text-center border ${isStartup ? 'border-[#059669] bg-[#F0FDF4]' : 'border-[#F0F0F0] bg-white'}`}>
                      <p className={`text-[13px] font-medium ${isStartup ? 'text-[#059669]' : 'text-[#CCC]'}`}>創業</p>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#777] mt-2.5 leading-relaxed">{rec.reason}</p>
                </div>
              )
            })()}

            {/* Industries */}
            <div className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-2.5">
              <p className="text-[13px] font-medium text-[#059669] mb-2.5">適合行業</p>
              <div className="space-y-2">
                {TYPE_INDUSTRIES[primaryType].slice(0, 4).map((ind, i) => (
                  <div key={ind} className="flex items-center gap-2.5 py-1.5 px-3 bg-[#F0FDF4] rounded-xl">
                    <span className="text-[11px] text-[#059669] font-medium w-4">{i + 1}</span>
                    <span className="text-[13px] text-[#0F2027] flex-1">{ind}</span>
                    {i === 0 && <span className="text-[10px] text-[#059669] bg-white border border-[#BBF7D0] px-2 py-0.5 rounded-full">最適合</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-2.5">
              <p className="text-[13px] font-medium text-[#059669] mb-2.5">你的盲點</p>
              <div className="space-y-2">
                {TYPE_WEAKNESSES[primaryType].map(w => (
                  <div key={w} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FCA5A5] flex-shrink-0 mt-1.5" />
                    <p className="text-[13px] text-[#555] leading-relaxed">{w}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#F0FAF8]" />
              <span className="text-[11px] text-[#AAA]">AI 八字深度分析</span>
              <div className="flex-1 h-px bg-[#F0FAF8]" />
            </div>
          </div>
        )}

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
                    body: JSON.stringify({ email, name, date, type: 'career', reading: careerText, bazi: null, lifePath: null, lifePathInfo: null, h }),
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

        {!streaming && dayStem && lifePath > 0 && (() => {
          const zodiac = getZodiac(date)
          const careerTagMatch = careerText.match(/\*\*職涯關鍵字\*\*\s*\n?([\s\S]*?)(?=\n\n|\n\*\*|$)/)
          const careerTags = careerTagMatch ? careerTagMatch[1].split('·').map((s: string) => s.trim()).filter(Boolean).slice(0, 3) : []
          return (
            <div className="py-4 border-t border-[#F0FAF8]">
              <p className="text-[11px] text-[#AAA] text-center mb-4">分享你的職涯天賦解讀</p>
              <ShareCard name={name} dayStem={dayStem} lifePath={lifePath} zodiac={zodiac?.sign || ''} gender={gender} tags={careerTags} holland={h || undefined} />
            </div>
          )
        })()}

        <ExploreMore name={name} date={date} time={time} current="career" />
        <FeedbackForm name={name} />

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
