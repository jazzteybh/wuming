import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '迷茫不知道做什麼工作？用八字找方向',
  description: '一直換工作卻找不到方向？八字日主能幫你看清天生的職涯優勢。完整解析10種日主最適合的工作類型，免費測試立即查詢。',
  keywords: ['八字職業', '八字找工作方向', '適合什麼工作', '職涯迷茫', '八字天賦職業'],
  openGraph: {
    title: '迷茫不知道做什麼工作？用八字找方向',
    description: '一直換工作卻找不到方向？八字日主能幫你看清天生的職涯優勢。免費測試立即查詢。',
    url: 'https://wumingai.app/blog/bazi-career-direction',
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'article',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '迷茫不知道做什麼工作？用八字找方向',
  description: '用八字日主找到天生職涯方向，解析10種日主最適合的工作類型',
  url: 'https://wumingai.app/blog/bazi-career-direction',
  inLanguage: 'zh-TW',
  author: { '@type': 'Organization', name: '悟明' },
  publisher: { '@type': 'Organization', name: '悟明', url: 'https://wumingai.app' },
  mainEntityOfPage: 'https://wumingai.app/blog/bazi-career-direction',
}

const CAREER_TYPES = [
  {
    type: '領導型職涯',
    emoji: '👑',
    desc: '適合掌舵、帶隊、做決策的工作',
    dayMasters: ['甲木', '庚金', '丙火'],
    jobs: '創業者、管理職、政治人物、運動教練',
    tip: '你天生有帶人的氣場，最怕的是被放在執行層卻沒有自主空間。',
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    type: '創意型職涯',
    emoji: '🎨',
    desc: '適合創作、設計、表達的工作',
    dayMasters: ['丁火', '癸水', '乙木'],
    jobs: '設計師、藝術家、作家、內容創作者',
    tip: '你需要有創作自由的環境，重複性的工作會讓你窒息。',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    type: '人際型職涯',
    emoji: '🤝',
    desc: '適合與人互動、服務、協調的工作',
    dayMasters: ['乙木', '己土', '壬水'],
    jobs: '業務、公關、諮商師、HR、社工',
    tip: '你的天賦在人與人之間，獨自面對電腦的工作會讓你失去動力。',
    color: 'bg-pink-50 border-pink-200',
  },
  {
    type: '分析型職涯',
    emoji: '🔬',
    desc: '適合研究、分析、鑽研深度的工作',
    dayMasters: ['壬水', '癸水', '庚金'],
    jobs: '研究員、數據分析師、投資分析、律師',
    tip: '你在深度思考中最有能量，給你時間和資料，你能找到別人看不到的答案。',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    type: '穩健型職涯',
    emoji: '🏛️',
    desc: '適合系統化、長期耕耘的工作',
    dayMasters: ['戊土', '己土', '辛金'],
    jobs: '會計、工程師、醫療、公務員、教師',
    tip: '你需要穩定的環境和清晰的規則，在有結構的體系裡你能發揮到極致。',
    color: 'bg-green-50 border-green-200',
  },
]

const SIGNS = [
  { sign: '換了很多工作還是不知道方向', insight: '可能是你一直在嘗試「別人說好的工作」，而不是「符合你日主天賦的工作」。' },
  { sign: '工作表現不差，但就是沒有熱情', insight: '技能可以學，但能量型態是天生的。你可能在做一份「能做」但不是「最適合」的工作。' },
  { sign: '羨慕某些人好像天生就知道自己要什麼', insight: '那不是運氣，而是他們恰好選到了符合自己天賦方向的路。' },
  { sign: '每次想轉職卻不知道往哪轉', insight: '轉職前先了解自己的日主和天賦優勢，方向比努力更重要。' },
]

const FAQS = [
  {
    q: '八字真的能幫我找到適合的工作嗎？',
    a: '八字提供的是天賦方向的參考，不是「你只能做這個」的限制。了解日主能幫你看清自己天生的能量型態，在眾多選項中找到最順勢的方向。',
  },
  {
    q: '我已經在做一份不喜歡的工作，八字能幫我嗎？',
    a: '可以。了解自己的日主後，你能更清楚現在的工作哪些部分是「逆天賦」的，哪些還能優化。轉職也會有更明確的方向。',
  },
  {
    q: '八字職涯分析和MBTI有什麼不同？',
    a: 'MBTI是心理學測驗，測的是當下的性格傾向，可能因狀態改變。八字根據出生日期，反映的是你天生的能量底色，更穩定、更根本。',
  },
  {
    q: '怎麼查詢我的八字職涯分析？',
    a: '用悟明免費工具，輸入姓名和出生日期，30秒就能看到你的八字日主和詳細的職涯天賦分析，完全免費。',
  },
]

export default function BaziCareerPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Nav */}
      <nav className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#F0FAF8]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#059669] rounded-lg flex items-center justify-center text-white text-sm">✦</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[18px] font-medium tracking-wide text-[#059669]">悟明</span>
            <span className="text-[10px] text-[#AAA]">讀懂自己，導航人生</span>
          </div>
        </Link>
        <Link href="/" className="text-[13px] text-[#059669]">← 回首頁</Link>
      </nav>

      <article className="px-5 py-8 max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF7ED] border border-[#FED7AA] rounded-full px-3 py-1 text-[11px] text-[#EA580C] mb-4">
            職涯天賦
          </div>
          <h1 className="text-[26px] font-semibold text-[#0F2027] leading-snug mb-3">
            迷茫不知道做什麼工作？<br />用八字找到你的職涯方向
          </h1>
          <p className="text-[13px] text-[#888]">閱讀時間約 5 分鐘</p>
        </div>

        {/* Intro */}
        <div className="text-[15px] text-[#444] leading-relaxed space-y-4 mb-8">
          <p>「我到底適合做什麼？」</p>
          <p>這是很多人心裡最深的問題之一。換過幾份工作、做過各種測驗，卻還是感覺找不到方向——不是因為你不夠努力，而是因為你還沒找到和自己天賦對齊的路。</p>
          <p>八字日主，是讀懂這件事最直接的工具之一。</p>
        </div>

        {/* Pain points */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-4">這些感受，你有過嗎？</h2>
          <div className="space-y-3">
            {SIGNS.map((s) => (
              <div key={s.sign} className="border border-[#E5E7EB] rounded-xl p-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[#F59E0B] mt-0.5">›</span>
                  <p className="text-[14px] font-medium text-[#0F2027]">{s.sign}</p>
                </div>
                <p className="text-[12px] text-[#888] leading-relaxed pl-4">{s.insight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why BaZi */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-4">為什麼八字能幫你找方向？</h2>
          <div className="text-[15px] text-[#444] leading-relaxed space-y-4">
            <p>八字的核心是你的<strong className="text-[#0F2027]">日主</strong>——出生日當天的天干，代表你天生的能量型態。不同的日主，在工作上有截然不同的天賦和需求。</p>
            <p>甲木日主天生有領導氣場，放在執行層會憋死；癸水日主直覺力強、創意豐沛，放在重複性工作會失去生命力。</p>
            <p>當你的工作符合日主天賦，你不只做得好，還會做得有熱情、有能量。這才是真正的「找對路」。</p>
          </div>
        </section>

        {/* Career types */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-6">5種職涯類型，哪種最適合你？</h2>
          <div className="space-y-4">
            {CAREER_TYPES.map((ct) => (
              <div key={ct.type} className={`border rounded-2xl p-4 ${ct.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[22px]">{ct.emoji}</span>
                  <div>
                    <div className="text-[15px] font-semibold text-[#0F2027]">{ct.type}</div>
                    <div className="text-[11px] text-[#888]">{ct.desc}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <div className="text-[10px] text-[#AAA] mb-1">對應日主</div>
                    <div className="text-[12px] text-[#059669] font-medium">{ct.dayMasters.join('・')}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#AAA] mb-1">適合職業</div>
                    <div className="text-[11px] text-[#444]">{ct.jobs}</div>
                  </div>
                </div>
                <div className="mt-3 bg-white bg-opacity-60 rounded-xl px-3 py-2">
                  <span className="text-[11px] text-[#666]">💡 {ct.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA — career entry */}
        <section className="mb-10">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 text-center">
            <div className="text-[28px] mb-2">💼</div>
            <h3 className="text-[16px] font-semibold text-[#0F2027] mb-2">免費查詢你的職涯天賦分析</h3>
            <p className="text-[13px] text-[#888] mb-4 leading-relaxed">
              輸入生日，悟明根據你的八字日主深度解讀天賦優勢、最適職涯路線與工作風格
            </p>
            <Link href="/career-entry"
              className="inline-flex items-center gap-2 bg-[#059669] text-white rounded-xl px-6 py-3 text-[14px] font-medium active:opacity-80 transition-opacity">
              💼 免費職涯天賦分析
            </Link>
            <p className="text-[11px] text-[#AAA] mt-3">完全免費 · 無需註冊 · 約10-15秒</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-4">常見問題</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border border-[#E5E7EB] rounded-xl p-4">
                <h3 className="text-[14px] font-semibold text-[#0F2027] mb-2">{faq.q}</h3>
                <p className="text-[13px] text-[#666] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mb-10">
          <h2 className="text-[18px] font-semibold text-[#0F2027] mb-4">延伸閱讀</h2>
          <div className="space-y-2">
            <Link href="/blog/bazi-day-master-guide"
              className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-4 active:opacity-70 transition-opacity">
              <span className="text-[20px]">🌳</span>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#0F2027]">八字日主完整解析：10種日主性格與天賦</div>
                <div className="text-[11px] text-[#888] mt-0.5">先了解自己的日主是哪一種</div>
              </div>
              <span className="text-[#059669] ml-auto">→</span>
            </Link>
            <Link href="/blog/life-path-number-guide"
              className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-4 active:opacity-70 transition-opacity">
              <span className="text-[20px]">🔢</span>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#0F2027]">生命數字怎麼算？1到9完整意義解讀</div>
                <div className="text-[11px] text-[#888] mt-0.5">結合生命數字看更完整的天賦</div>
              </div>
              <span className="text-[#059669] ml-auto">→</span>
            </Link>
          </div>
        </section>

        <div className="border-t border-[#F0FAF8] pt-6 text-center">
          <p className="text-[10px] text-[#CCC]">© 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議</p>
        </div>

      </article>
    </main>
  )
}
