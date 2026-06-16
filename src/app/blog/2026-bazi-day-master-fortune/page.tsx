import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '2026年各日主運勢：10種日主今年適合做什麼',
  description: '2026丙午年，各八字日主運勢大不同。完整解析甲乙丙丁戊己庚辛壬癸10種日主今年的機遇與挑戰，免費查詢你的2026運勢。',
  keywords: ['2026年運勢', '八字日主運勢', '2026流年', '丙午年運勢', '八字2026'],
  openGraph: {
    title: '2026年各日主運勢：10種日主今年適合做什麼',
    description: '2026丙午年10種日主運勢完整解析，找出你今年的機遇與挑戰。',
    url: 'https://wumingai.app/blog/2026-bazi-day-master-fortune',
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'article',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '2026年各日主運勢：10種日主今年適合做什麼',
  description: '2026丙午年完整解析甲乙丙丁戊己庚辛壬癸10種日主的運勢與建議',
  url: 'https://wumingai.app/blog/2026-bazi-day-master-fortune',
  inLanguage: 'zh-TW',
  author: { '@type': 'Organization', name: '悟明' },
  publisher: { '@type': 'Organization', name: '悟明', url: 'https://wumingai.app' },
  datePublished: '2026-06-16',
  mainEntityOfPage: 'https://wumingai.app/blog/2026-bazi-day-master-fortune',
}

const FORTUNES = [
  {
    stem: '甲木', emoji: '🌳',
    theme: '突破年',
    summary: '2026年丙火流年對甲木有洩身之效，能量向外釋放，是表現自我、展現才華的最佳時機。過去積累的努力容易在今年開花結果。',
    opportunities: ['適合推出新項目或創業', '人際關係擴展，貴人運強', '演講、分享、出版都有好機遇'],
    cautions: ['注意能量消耗過快，要懂得休息', '財務支出可能增加，需控制預算'],
    focus: '大膽行動，今年敢出手的人會贏',
  },
  {
    stem: '乙木', emoji: '🌿',
    theme: '人緣年',
    summary: '丙火流年讓乙木的柔和特質發光，人際魅力大增。今年特別適合透過人脈建立機會，合作、聯盟都有收穫。',
    opportunities: ['合作案、異業結盟容易成功', '感情運佳，單身者有桃花', '透過他人介紹帶來新機會'],
    cautions: ['容易因顧慮他人而錯失決策時機', '注意被情緒左右判斷'],
    focus: '善用你的親和力，讓別人成為你的助力',
  },
  {
    stem: '丙火', emoji: '☀️',
    theme: '衝刺年',
    summary: '丙火遇丙火流年，自身能量被大幅放大。今年你會特別想做事、想改變，執行力和行動力都在高峰。但要注意過於衝動。',
    opportunities: ['適合衝刺業績、拓展版圖', '個人品牌曝光度大增', '主動出擊的事情容易有回報'],
    cautions: ['容易與人摩擦，注意溝通方式', '健康需留意，避免過度消耗'],
    focus: '把握上半年的爆發期，下半年穩住成果',
  },
  {
    stem: '丁火', emoji: '🕯️',
    theme: '深耕年',
    summary: '丙火流年讓丁火既有助力也有壓力。今年不適合大起大落，反而適合深耕專業、強化核心能力，為明年的豐收打基礎。',
    opportunities: ['學習進修、考取證照是好時機', '一對一的深度服務工作有好表現', '寫作、創作能量豐沛'],
    cautions: ['避免與丙火型人正面競爭', '情緒容易起伏，注意心理健康'],
    focus: '今年種樹，明年收果，不要急於求成',
  },
  {
    stem: '戊土', emoji: '⛰️',
    theme: '消耗年',
    summary: '丙火生戊土，看似有助力，但也代表消耗。今年容易有更多責任壓在肩上。穩住本業、守住既有成果是今年的主旋律。',
    opportunities: ['管理能力被看見，有升遷機會', '房地產、固定資產投資可考慮', '長期耕耘的事業有回報'],
    cautions: ['避免貿然擴張或轉行', '健康方面需注意腸胃和體力'],
    focus: '厚積薄發，今年守穩比衝刺更重要',
  },
  {
    stem: '己土', emoji: '🌾',
    theme: '調整年',
    summary: '丙火對己土的影響較為複雜，今年容易感到方向不明。不要焦慮，這是調整期——釐清目標、整理關係，為下一階段做準備。',
    opportunities: ['適合內部優化、流程改善', '照顧他人的工作特別有成就感', '學習新技能打底'],
    cautions: ['避免重大決策或大筆投資', '注意不要因擔憂而過度焦慮'],
    focus: '把這一年當作蓄力期，整理好自己再出發',
  },
  {
    stem: '庚金', emoji: '⚔️',
    theme: '挑戰年',
    summary: '丙火剋庚金，今年是考驗年。壓力會有，但壓力也是磨礪。庚金在逆境中反而能激發出最強韌的一面，關鍵是不要退縮。',
    opportunities: ['危機處理能力被肯定', '競爭激烈的環境反而能脫穎而出', '適合磨練技術、累積實力'],
    cautions: ['避免衝動決策，尤其是財務方面', '注意與上司或合作方的關係'],
    focus: '把壓力轉化為動力，今年熬過去就是升級',
  },
  {
    stem: '辛金', emoji: '💎',
    theme: '蛻變年',
    summary: '丙火與辛金有丙辛合的關係，今年容易遇到改變命運的人或機遇。感情、事業都可能有意外的轉折，保持開放心態。',
    opportunities: ['貴人運極強，要主動社交', '感情方面有突破性發展', '跨界合作帶來意想不到的機遇'],
    cautions: ['注意判斷力，不要被表面光鮮迷惑', '情感容易衝動，理性評估再行動'],
    focus: '今年最大的機遇往往藏在意料之外的地方',
  },
  {
    stem: '壬水', emoji: '🌊',
    theme: '收穫年',
    summary: '壬水今年流年整體平順，適合收割過去的努力。財運和人際都有不錯的發展，適合擴大格局、佈局長線。',
    opportunities: ['投資理財有不錯的回報', '人脈整合帶來商業機遇', '適合開展新市場或新客群'],
    cautions: ['注意資金流動，避免過度分散', '下半年注意健康，適度休息'],
    focus: '廣結善緣，今年認識的人可能是未來的關鍵夥伴',
  },
  {
    stem: '癸水', emoji: '🌧️',
    theme: '靈感年',
    summary: '丙火流年讓癸水的直覺和創意被激活。今年腦袋特別靈光，適合創作、研究、或任何需要洞察力的工作。',
    opportunities: ['創意工作、內容創作大爆發', '直覺力強，投資眼光準', '適合學習新領域，吸收快'],
    cautions: ['想法多但執行力需要刻意加強', '避免過於理想化，要落地實踐'],
    focus: '把腦中的好想法付諸行動，今年是創意變現的好時機',
  },
]

const FAQS = [
  {
    q: '2026年是什麼年？對八字有什麼影響？',
    a: '2026年是丙午年，天干為丙火，地支為午火，是雙火疊加的一年。整體而言是能量強勁、變化快速的一年，對火型和木型日主較有利，對金型日主壓力較大。',
  },
  {
    q: '怎麼知道自己的八字日主是什麼？',
    a: '日主由你的出生日期決定。可以用悟明免費工具輸入生日，30秒就能查到你的日主和完整八字命盤。',
  },
  {
    q: '流年運勢只看日主就夠了嗎？',
    a: '日主是基礎，但完整的流年分析還需要看大運、八字五行平衡等因素。這篇文章的日主運勢是方向性參考，個人命盤的細節會有差異。',
  },
  {
    q: '運勢不好的日主今年就沒有機會嗎？',
    a: '完全不是。即使是挑戰年，也有對應的機遇。重要的是了解今年的主題，順勢而為，而不是硬闖不適合的方向。',
  },
]

const THEME_COLOR: Record<string, string> = {
  突破年: 'bg-green-50 border-green-200 text-green-700',
  人緣年: 'bg-pink-50 border-pink-200 text-pink-700',
  衝刺年: 'bg-orange-50 border-orange-200 text-orange-700',
  深耕年: 'bg-purple-50 border-purple-200 text-purple-700',
  消耗年: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  調整年: 'bg-blue-50 border-blue-200 text-blue-700',
  挑戰年: 'bg-red-50 border-red-200 text-red-700',
  蛻變年: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  收穫年: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  靈感年: 'bg-cyan-50 border-cyan-200 text-cyan-700',
}

export default function Fortune2026Page() {
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
            2026 丙午年運勢
          </div>
          <h1 className="text-[26px] font-semibold text-[#0F2027] leading-snug mb-3">
            2026年各日主運勢：10種日主今年適合做什麼
          </h1>
          <p className="text-[13px] text-[#888]">閱讀時間約 5 分鐘</p>
        </div>

        {/* Intro */}
        <div className="text-[15px] text-[#444] leading-relaxed space-y-4 mb-8">
          <p>每年的天干地支不同，對八字各日主的影響也大不相同。有人今年一飛沖天，有人卻感覺原地踏步——差別往往就在於有沒有讀懂自己的流年運勢。</p>
          <p>2026年是<strong className="text-[#0F2027]">丙午年</strong>，天干丙火、地支午火，是雙火交疊的一年。整體而言是能量強勁、變化快速的一年，懂得順勢的人會走得特別順。</p>
          <p>以下是10種八字日主在2026年的運勢方向，找到你的日主，看看今年最適合做什麼。</p>
        </div>

        {/* Quick find CTA */}
        <Link href="/" className="flex items-center gap-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl px-4 py-4 mb-8 active:opacity-70 transition-opacity">
          <span className="text-[24px]">✦</span>
          <div className="flex-1">
            <div className="text-[14px] font-medium text-[#0F2027]">不確定自己的日主？</div>
            <div className="text-[12px] text-[#888]">免費輸入生日，30秒查詢八字日主與2026運勢</div>
          </div>
          <span className="text-[13px] text-[#059669] font-medium">免費查詢 →</span>
        </Link>

        {/* 2026 Overview */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-4">2026丙午年整體特色</h2>
          <div className="text-[15px] text-[#444] leading-relaxed space-y-3 mb-4">
            <p>丙午年的能量特質是<strong className="text-[#0F2027]">熱烈、外放、快速變化</strong>。這一年不適合等待觀望，主動出擊的人機會更多。</p>
            <p>從五行角度看，火旺的年份對木型日主（甲、乙）和水型日主（壬、癸）影響最大，金型日主（庚、辛）則需要多加留意。</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '最旺日主', value: '甲・乙・辛', color: 'bg-green-50 border-green-200 text-green-700' },
              { label: '平穩日主', value: '壬・癸・己', color: 'bg-blue-50 border-blue-200 text-blue-700' },
              { label: '需留意', value: '庚・戊・丁', color: 'bg-orange-50 border-orange-200 text-orange-700' },
            ].map(item => (
              <div key={item.label} className={`border rounded-xl p-3 text-center ${item.color}`}>
                <div className="text-[10px] mb-1 opacity-70">{item.label}</div>
                <div className="text-[13px] font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Fortune cards */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-6">10種日主2026年運勢</h2>
          <div className="space-y-5">
            {FORTUNES.map((f) => (
              <div key={f.stem} className="border border-[#E5E7EB] rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b border-[#F5F5F5]">
                  <span className="text-[24px]">{f.emoji}</span>
                  <div className="flex-1">
                    <span className="text-[16px] font-semibold text-[#0F2027]">{f.stem}</span>
                  </div>
                  <span className={`text-[11px] font-medium px-3 py-1 rounded-full border ${THEME_COLOR[f.theme]}`}>
                    {f.theme}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-[13px] text-[#555] leading-relaxed">{f.summary}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] text-[#AAA] mb-1.5">今年機遇</div>
                      <ul className="space-y-1">
                        {f.opportunities.map(o => (
                          <li key={o} className="flex items-start gap-1.5 text-[11px] text-[#444]">
                            <span className="text-[#059669] mt-0.5">✓</span>{o}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#AAA] mb-1.5">需要留意</div>
                      <ul className="space-y-1">
                        {f.cautions.map(c => (
                          <li key={c} className="flex items-start gap-1.5 text-[11px] text-[#444]">
                            <span className="text-[#F59E0B] mt-0.5">!</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-[#F0FDF4] rounded-xl px-3 py-2">
                    <span className="text-[11px] text-[#059669] font-medium">今年重點：</span>
                    <span className="text-[11px] text-[#444]"> {f.focus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-10">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 text-center">
            <div className="text-[28px] mb-2">📅</div>
            <h3 className="text-[16px] font-semibold text-[#0F2027] mb-2">查看你的2026每月運程</h3>
            <p className="text-[13px] text-[#888] mb-4 leading-relaxed">
              根據你的八字，逐月解析2026年每個月的能量走勢與行動建議
            </p>
            <Link href="/monthly-entry"
              className="inline-flex items-center gap-2 bg-[#059669] text-white rounded-xl px-6 py-3 text-[14px] font-medium active:opacity-80 transition-opacity">
              📅 查看我的每月運程
            </Link>
            <p className="text-[11px] text-[#AAA] mt-3">完全免費 · 無需註冊</p>
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
          <Link href="/blog/bazi-day-master-guide"
            className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-4 active:opacity-70 transition-opacity">
            <span className="text-[20px]">🌳</span>
            <div>
              <div className="text-[13px] font-medium text-[#0F2027]">八字日主完整解析：10種日主性格與天賦</div>
              <div className="text-[11px] text-[#888] mt-0.5">還不了解自己的日主？先看這篇</div>
            </div>
            <span className="text-[#059669] ml-auto">→</span>
          </Link>
        </section>

        {/* Footer */}
        <div className="border-t border-[#F0FAF8] pt-6 text-center">
          <p className="text-[10px] text-[#CCC]">© 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議</p>
        </div>

      </article>
    </main>
  )
}
