'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getZodiac, ELEMENT_LUCKY_COLORS, ELEMENT_EMOJI, DAY_STEM_TAGS, ELEMENT_CRYSTALS, DAY_STEM_BEST_PARTNER, getKeyAges, getMonthlyEnergy, getAge, getChineseZodiac, CHINESE_ZODIAC_BEST_PARTNER, ZODIAC_BEST_PARTNER } from '@/lib/bazi'
import { LIFE_PATH_BEST_PARTNER } from '@/lib/numerology'

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


const MAIN_SECTIONS = ['性格天賦', '職涯方向', '2026年運勢', '成長方向', '職涯關鍵字']

function parseReading(text: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const pattern = new RegExp(`\\*\\*(${MAIN_SECTIONS.join('|')}|生命數字[^*]*)\\*\\*`)
  const parts = text.split(pattern)
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim()
    const content = (parts[i + 1] || '').trim().replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    sections[title] = content
  }
  return sections
}

const WANT_MORE_OPTIONS = ['詳細職涯分析', '感情／伴侶配對', '生意夥伴合盤', 'MBTI 性格測試', '更多關於我的八字']
const SOURCE_OPTIONS = ['YouTube', '朋友推薦', 'Google 搜尋', '社群媒體']

function ReadingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get('name') || ''
  const date = searchParams.get('date') || ''
  const time = searchParams.get('time') || ''

  const [data, setData] = useState<ReadingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [feedbackWantMore, setFeedbackWantMore] = useState<string[]>([])
  const [feedbackSource, setFeedbackSource] = useState<string[]>([])
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackEmail, setFeedbackEmail] = useState('')
  const [feedbackAnon, setFeedbackAnon] = useState(false)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function toggleOption(list: string[], setList: (v: string[]) => void, val: string) {
    setList(list.includes(val) ? list.filter(x => x !== val) : [...list, val])
  }

  async function handleFeedback(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, wantMore: feedbackWantMore, source: feedbackSource, freeText: feedbackText, email: feedbackEmail }),
    })
    setFeedbackSent(true)
  }

  const LOADING_STEPS = [
    { icon: '🔥', title: `正在解讀 ${name} 的日主`, tip: '日主是八字的核心，代表你天生的能量型態' },
    { icon: '⚖️', title: '分析五行平衡', tip: '五行的分佈決定了你的優勢與成長空間' },
    { icon: '✨', title: '計算生命數字', tip: '每個數字背後都有一套專屬的人生功課' },
    { icon: '🌐', title: '對照星座特質', tip: '東西方系統交叉，讓解讀更立體準確' },
    { icon: '🤖', title: '整合三套智慧系統', tip: '悟明同時分析八字、星座、生命數字' },
    { icon: '📝', title: '撰寫你的專屬解讀', tip: '你的命盤即將揭曉，請稍候片刻' },
  ]

  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setLoadingStep(s => (s + 1) % LOADING_STEPS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [loading])

  useEffect(() => {
    if (!name || !date) { router.push('/'); return }
    fetch('/api/reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, date, time }),
    })
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setData(d) })
      .catch(() => setError('網路錯誤，請重試'))
      .finally(() => setLoading(false))
  }, [])

  async function handleSaveEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setEmailLoading(true)
    await fetch('/api/save-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, date, reading: data?.reading, bazi: data?.bazi, lifePath: data?.lifePath, lifePathInfo: data?.lifePathInfo }),
    })
    setEmailSent(true)
    setEmailLoading(false)
  }

  if (loading) {
    const step = LOADING_STEPS[loadingStep]
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
        <div className="text-center max-w-xs w-full">
          {/* Logo */}
          <div className="text-[18px] font-medium mb-8">悟<span className="text-[#059669]">明</span></div>

          {/* Spinner */}
          <div className="w-14 h-14 border-2 border-[#BBF7D0] border-t-[#059669] rounded-full animate-spin mx-auto mb-6" />

          {/* Step card */}
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 mb-4 transition-all duration-500">
            <p className="text-[24px] mb-2">{step.icon}</p>
            <p className="text-[15px] font-medium text-[#0F2027] mb-1">{step.title}</p>
            <p className="text-[12px] text-[#888] leading-relaxed">{step.tip}</p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mb-4">
            {LOADING_STEPS.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === loadingStep ? 'bg-[#059669] w-4' : 'bg-[#BBF7D0]'}`} />
            ))}
          </div>

          <p className="text-[11px] text-[#CCC]">深度解讀中，約需 15-20 秒</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
        <div className="text-center">
          <p className="text-[15px] text-red-500 mb-4">{error}</p>
          <button onClick={() => router.push('/')} className="text-[#059669] underline text-[14px]">返回首頁</button>
        </div>
      </main>
    )
  }

  if (!data) return null

  const sections = parseReading(data.reading)
  const careerKeywords = (sections['職涯關鍵字'] || '').replace(/<[^>]+>/g, '').split('\n')[0].split('·').map(s => s.trim()).filter(Boolean)
  const READING_ORDER = ['生命數字', '性格天賦', '成長方向', '2026年運勢']
  const orderedSections = READING_ORDER.map(k => Object.keys(sections).find(s => s.startsWith(k))).filter(Boolean) as string[]
  const zodiac = getZodiac(date)
  const luckyColors = ELEMENT_LUCKY_COLORS[data.bazi.dayStemElement]
  const elementEmoji = ELEMENT_EMOJI[data.bazi.dayStemElement]
  const tags = DAY_STEM_TAGS[data.bazi.dayStem] || []
  const crystal = ELEMENT_CRYSTALS[data.bazi.dayStemElement]
  const bestPartner = DAY_STEM_BEST_PARTNER[data.bazi.dayStem]
  const keyAges = getKeyAges(data.bazi.dayStem)
  const chineseZodiac = getChineseZodiac(date)
  const chineseZodiacPartner = CHINESE_ZODIAC_BEST_PARTNER[chineseZodiac.animal]
  const zodiacPartner = ZODIAC_BEST_PARTNER[zodiac.sign]
  const lifePathPartner = LIFE_PATH_BEST_PARTNER[data.lifePath]
  const monthlyEnergy = getMonthlyEnergy(date, data.bazi.dayStem)
  const age = getAge(date)
  const today = new Date()
  const todayStr = `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日`
  const monthStr = `${today.getFullYear()}年${today.getMonth()+1}月`

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-5 pt-4 pb-3 border-b border-[#F0FAF8]">
        <button onClick={() => router.push('/')} className="text-left flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="悟明" className="h-8 w-8" />
          <div>
            <div className="text-xl font-medium tracking-wide text-[#059669]">悟明</div>
            <p className="text-[10px] text-[#AAA] leading-none mt-0.5">讀懂自己，導航人生</p>
          </div>
        </button>
        <button onClick={() => router.push('/')} className="text-[13px] text-[#059669]">重新解讀</button>
      </nav>

      <div className="px-5 py-5 max-w-lg mx-auto">

        {/* Profile */}
        <div className="text-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#F0FDF4] border-2 border-[#059669] flex items-center justify-center text-[22px] font-medium text-[#059669] mx-auto mb-3">
            {name.charAt(0)}
          </div>
          <h1 className="text-[18px] font-medium text-[#0F2027]">{name} 的天賦報告</h1>
          <p className="text-[12px] text-[#AAA] mt-1">{date} · {age}歲</p>
          <p className="text-[10px] text-[#CCC] mt-0.5">{todayStr}</p>
          <div className="inline-flex items-center gap-1 text-[10px] text-[#059669] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full px-3 py-1 mt-2">
            八字 × 星座 × 生命數字，三維度讀懂你
          </div>
        </div>

        {/* Row 1: 今月能量指數 */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 mb-2.5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[10px] text-[#AAA]">今月能量指數</p>
            <span className="text-[10px] text-[#059669] bg-white border border-[#BBF7D0] rounded-full px-2 py-0.5">{monthStr}</span>
          </div>
          <div className="space-y-2.5">
            {([
              { label: '人際運', value: monthlyEnergy['人際運'], color: '#059669', bg: '#DCFCE7' },
              { label: '財運', value: monthlyEnergy['財運'], color: '#D97706', bg: '#FEF3C7' },
              { label: '健康運', value: monthlyEnergy['健康運'], color: '#16A34A', bg: '#DCFCE7' },
            ] as const).map(({ label, value, color, bg }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[12px] font-medium text-[#0F2027]">{label}</span>
                  <span className="text-[12px] font-medium" style={{ color }}>{value}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: bg }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: 人生關鍵年齡 */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 mb-2.5">
          <p className="text-[10px] text-[#AAA] mb-3">人生關鍵年齡</p>
          <div className="relative">
            <div className="absolute top-[10px] left-0 right-0 h-0.5 bg-[#BBF7D0]" />
            <div className="flex justify-between relative z-10">
              {keyAges.map(({ age: a, label }, i) => {
                const isPeak = label.includes('高峰')
                const isPast = a <= age
                return (
                <div key={i} className="text-center">
                  <div className={`w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center ${isPast ? 'bg-[#059669]' : isPeak ? 'bg-[#FFFBEB] border-2 border-[#D97706]' : 'bg-white border-2 border-[#BBF7D0]'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isPast ? 'bg-white' : isPeak ? 'bg-[#D97706]' : 'bg-[#059669]'}`} />
                  </div>
                  <p className={`text-[11px] font-medium ${isPast ? 'text-[#059669]' : isPeak ? 'text-[#D97706]' : 'text-[#0F2027]'}`}>{a}歲</p>
                  <p className={`text-[9px] mt-0.5 ${isPeak ? 'text-[#D97706]' : 'text-[#888]'}`}>{label}</p>
                </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Row 3: 五行命格 + 生命數字 + 星座 */}
        <div className="grid grid-cols-3 gap-2 mb-2.5">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-3">
            <p className="text-[9px] text-[#AAA] mb-1">五行命格</p>
            <p className="text-[18px] mb-0.5">{elementEmoji}</p>
            <p className="text-[13px] font-medium text-[#0F2027]">{data.bazi.dayStemElement}命人</p>
            <p className="text-[10px] text-[#888] mt-0.5">{data.bazi.dayStem}{data.bazi.dayStemElement}日主</p>
          </div>
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-3">
            <p className="text-[9px] text-[#AAA] mb-1">生命數字</p>
            <p className="text-[26px] font-medium text-[#059669] leading-none mb-1">{data.lifePath}</p>
            <p className="text-[12px] font-medium text-[#0F2027]">{data.lifePathInfo.title}</p>
          </div>
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-3">
            <p className="text-[9px] text-[#AAA] mb-1">西洋星座</p>
            <p className="text-[18px] mb-0.5">{zodiac.emoji}</p>
            <p className="text-[13px] font-medium text-[#0F2027]">{zodiac.sign}</p>
            <p className="text-[10px] text-[#888] mt-0.5">{chineseZodiac.emoji}屬{chineseZodiac.animal}</p>
          </div>
        </div>

        {/* Row 4: 天作之合 2x2 */}
        <div className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-2.5">
          <p className="text-[11px] text-[#059669] tracking-wide mb-3">天作之合</p>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3">
              <p className="text-[9.5px] text-[#059669] font-medium tracking-wide mb-2">五行配對</p>
              <p className="text-[10px] text-[#AAA] mb-0.5">你：{data.bazi.dayStemElement}命人</p>
              <p className="text-[15px] font-medium text-[#0F2027] mb-1">{bestPartner?.stem}{bestPartner?.element}人</p>
              <p className="text-[10px] text-[#888] leading-snug">{bestPartner?.desc}</p>
            </div>
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3">
              <p className="text-[9.5px] text-[#D97706] font-medium tracking-wide mb-2">生命數字</p>
              <p className="text-[10px] text-[#AAA] mb-0.5">你：{data.lifePath} 號人</p>
              <p className="text-[15px] font-medium text-[#0F2027] mb-1">{lifePathPartner?.num} 號人</p>
              <p className="text-[10px] text-[#888] leading-snug">{lifePathPartner?.desc}</p>
            </div>
            <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl p-3">
              <p className="text-[9.5px] text-[#7C3AED] font-medium tracking-wide mb-2">西洋星座</p>
              <p className="text-[10px] text-[#AAA] mb-0.5">你：{zodiac.sign}</p>
              <p className="text-[15px] font-medium text-[#0F2027] mb-1">{zodiacPartner?.sign}</p>
              <p className="text-[10px] text-[#888] leading-snug">{zodiacPartner?.desc}</p>
            </div>
            <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-xl p-3">
              <p className="text-[9.5px] text-[#E11D48] font-medium tracking-wide mb-2">生肖配對</p>
              <p className="text-[10px] text-[#AAA] mb-0.5">你：屬{chineseZodiac.animal}</p>
              <p className="text-[15px] font-medium text-[#0F2027] mb-1">屬{chineseZodiacPartner?.animal}</p>
              <p className="text-[10px] text-[#888] leading-snug">{chineseZodiacPartner?.desc}</p>
            </div>
          </div>
        </div>

        {/* Row 5: 能量寶石 + 幸運色 */}
        <div className="grid grid-cols-2 gap-2.5 mb-2.5">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-3.5">
            <p className="text-[10px] text-[#AAA] mb-1">能量寶石</p>
            <div className="w-7 h-7 rounded-full mb-1.5 border-2 border-white" style={{ background: crystal?.color }} />
            <p className="text-[15px] font-medium text-[#0F2027]">{crystal?.name}</p>
            <p className="text-[11px] text-[#888] mt-1">{crystal?.desc}</p>
          </div>
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-3.5">
            <p className="text-[10px] text-[#AAA] mb-1">幸運色</p>
            <div className="flex gap-1.5 mb-1.5">
              {luckyColors.hex.map((hex, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ background: hex }} />
              ))}
            </div>
            <p className="text-[13px] font-medium text-[#0F2027]">{luckyColors.colors.join('・')}</p>
            <p className="text-[10px] text-[#AAA] mt-1">根據五行{data.bazi.dayStemElement}屬性</p>
          </div>
        </div>

        {/* Monthly Teaser Banner */}
        <div
          onClick={() => router.push(`/monthly?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`)}
          className="bg-[#0F2027] rounded-2xl p-4 mb-2.5 cursor-pointer active:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#86EFAC] mb-1 tracking-wide">全新功能</p>
              <p className="text-[15px] font-medium text-white mb-1">未來12個月每月運程</p>
              <p className="text-[11px] text-[#AAA]">掌握每月能量走勢，提前佈局</p>
            </div>
            <div className="text-[28px]">📅</div>
          </div>
          <div className="mt-3 h-9 bg-[#059669] rounded-xl flex items-center justify-center text-[13px] font-medium text-white">
            立即解讀 →
          </div>
        </div>

        {/* Row 6: 職涯方向 Lite */}
        <div className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-2.5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] text-[#059669] tracking-wide">職涯方向</p>
            <span className="text-[10px] text-[#AAA]">適合你的職業</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {careerKeywords.length > 0 ? careerKeywords.map(k => (
              <span key={k} className="text-[13px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#059669] px-3 py-1.5 rounded-full font-medium">{k}</span>
            )) : (
              <span className="text-[13px] text-[#AAA]">解讀生成中...</span>
            )}
          </div>
          <p className="text-[10px] text-[#AAA] mt-3">更多詳細職涯分析 — 即將推出 ✦</p>
        </div>

        {/* Row 7: 八字四柱 */}
        <div className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-2.5">
          <p className="text-[11px] text-[#059669] tracking-wide mb-3">八字四柱</p>
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
                  label === '日柱' ? 'bg-[#059669] text-white border-[#059669]' : 'bg-[#F0FDF4] text-[#059669] border-[#86EFAC]'
                }`}>
                  {pillar?.stem ?? '—'}
                </div>
                <div className="h-9 rounded-b-lg flex items-center justify-center text-[18px] font-medium bg-[#FAFFFE] border border-t-0 border-[#BBF7D0] text-[#0F2027]">
                  {pillar?.branch ?? '—'}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {tags.map(tag => (
              <span key={tag} className="text-[11px] bg-[#059669] text-white px-2.5 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        {/* Rows 8-11: AI Reading Sections in order */}
        {orderedSections.map(title => (
          <div key={title} className="bg-white border border-[#E6F7F5] rounded-2xl p-4 mb-2.5">
            <p className="text-[13px] font-medium text-[#059669] mb-2.5">{title}</p>
            <p className="text-[14px] text-[#444] leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: sections[title] }} />
          </div>
        ))}

        {/* Email Capture */}
        <div className="border border-[#BBF7D0] rounded-2xl overflow-hidden mb-4">
          {emailSent ? (
            <div className="p-4">
              <div className="text-center mb-4">
                <p className="text-[20px] mb-1">✓</p>
                <p className="text-[14px] font-medium text-[#059669]">命盤已儲存！</p>
                <p className="text-[12px] text-[#888] mt-1">把悟明分享給朋友，讓他們也來解讀</p>
              </div>
              <button
                onClick={async () => {
                  const shareText = `我剛用悟明解讀了自己的天賦，發現了很多關於自己的事！完全免費，你也來試試 👉 https://wumingai.app`
                  if (navigator.share) {
                    await navigator.share({ text: shareText })
                  } else {
                    await navigator.clipboard.writeText(shareText)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2500)
                  }
                }}
                className="w-full h-11 bg-[#059669] text-white rounded-xl text-[14px] font-medium flex items-center justify-center gap-2 active:opacity-80 transition-opacity mb-2.5"
              >
                {copied ? '✓ 已複製連結！' : '✦ 分享給朋友'}
              </button>
              <a
                href="https://www.instagram.com/wuming.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 border border-[#E5E7EB] rounded-xl text-[13px] text-[#888] flex items-center justify-center gap-2 active:opacity-70 transition-opacity"
              >
                <span>追蹤悟明 Instagram</span>
                <span className="text-[#C13584]">@wuming.app</span>
              </a>
            </div>
          ) : (
            <div className="bg-[#F0FDF4] p-4">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-[18px] leading-none mt-0.5">📩</span>
                <div>
                  <p className="text-[14px] font-medium text-[#0F2027] mb-0.5">免費寄送完整命盤到你的信箱</p>
                  <p className="text-[12px] text-[#777] leading-relaxed">
                    留下 Email，完整命盤報告將寄給你。<br/>
                    <span className="text-[#E57373] font-medium">離開後資料將被清除。</span>
                  </p>
                </div>
              </div>
              <form onSubmit={handleSaveEmail} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 h-10 bg-white border border-[#86EFAC] rounded-xl px-3 text-[14px] text-[#0F2027] outline-none focus:border-[#059669]"
                />
                <button type="submit" disabled={emailLoading}
                  className="h-10 px-4 bg-[#059669] text-white rounded-xl text-[13px] font-medium disabled:opacity-70">
                  {emailLoading ? '...' : '儲存'}
                </button>
              </form>
              <p className="text-[10px] text-[#AAA] text-center mt-2">完全免費 · 隨時可取消訂閱</p>
            </div>
          )}
        </div>

        {/* Feedback Form */}
        <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden mb-6">
          {feedbackSent ? (
            <div className="p-5 text-center">
              <p className="text-[20px] mb-1">🙏</p>
              <p className="text-[14px] font-medium text-[#0F2027]">謝謝你的回饋！</p>
              <p className="text-[12px] text-[#888] mt-1">我們會根據大家的需求持續優化悟明。</p>
            </div>
          ) : (
            <form onSubmit={handleFeedback} className="p-4">
              <p className="text-[13px] font-medium text-[#0F2027] mb-1">幫我們做得更好 👋</p>
              <p className="text-[11px] text-[#AAA] mb-4">你的回饋決定我們下一步建什麼</p>

              <p className="text-[12px] font-medium text-[#0F2027] mb-2">你還想探索什麼？（可多選）</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {WANT_MORE_OPTIONS.map(opt => (
                  <button key={opt} type="button"
                    onClick={() => toggleOption(feedbackWantMore, setFeedbackWantMore, opt)}
                    className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${feedbackWantMore.includes(opt) ? 'bg-[#059669] text-white border-[#059669]' : 'bg-white text-[#555] border-[#E5E7EB]'}`}>
                    {opt}
                  </button>
                ))}
              </div>

              <p className="text-[12px] font-medium text-[#0F2027] mb-2">你從哪裡知道悟明？</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {SOURCE_OPTIONS.map(opt => (
                  <button key={opt} type="button"
                    onClick={() => toggleOption(feedbackSource, setFeedbackSource, opt)}
                    className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${feedbackSource.includes(opt) ? 'bg-[#059669] text-white border-[#059669]' : 'bg-white text-[#555] border-[#E5E7EB]'}`}>
                    {opt}
                  </button>
                ))}
              </div>

              <p className="text-[12px] font-medium text-[#0F2027] mb-2">還有什麼想告訴我們？</p>
              <textarea
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                placeholder="任何建議或想法都歡迎..."
                rows={3}
                className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-[13px] text-[#0F2027] outline-none focus:border-[#059669] resize-none mb-3"
              />
              <label className="flex items-center gap-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={feedbackAnon}
                  onChange={e => { setFeedbackAnon(e.target.checked); if (e.target.checked) setFeedbackEmail('') }}
                  className="w-3.5 h-3.5 accent-[#059669]"
                />
                <span className="text-[12px] text-[#888]">匿名回饋</span>
              </label>
              {!feedbackAnon && (
                <input
                  type="email"
                  value={feedbackEmail}
                  onChange={e => setFeedbackEmail(e.target.value)}
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

        <div className="text-center pb-6">
          <a href="https://www.instagram.com/wuming.app" target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#C13584] mb-2 inline-block">Instagram @wuming.app</a>
          <p className="text-[10px] text-[#CCC]">© 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議</p>
        </div>
      </div>
    </main>
  )
}

export default function ReadingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#059669] border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <ReadingContent />
    </Suspense>
  )
}
