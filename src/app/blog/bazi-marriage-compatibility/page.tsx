import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '八字合婚怎麼看？五行相合與相剋完整解析',
  description: '八字合婚不是玄學，是透過兩人五行能量的互動判斷感情走向。本文解析五行相生相剋、日主配對，附免費緣分測試工具。',
  keywords: ['八字合婚', '八字配對', '五行合婚', '合婚八字', '八字緣分'],
  openGraph: {
    title: '八字合婚怎麼看？五行相合與相剋完整解析',
    description: '八字合婚透過兩人五行能量互動判斷感情走向。解析相生相剋配對邏輯，免費測試緣分指數。',
    url: 'https://wumingai.app/blog/bazi-marriage-compatibility',
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'article',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '八字合婚怎麼看？五行相合與相剋完整解析',
  description: '八字合婚不是玄學，是透過兩人五行能量的互動判斷感情走向。本文解析五行相生相剋、日主配對邏輯。',
  url: 'https://wumingai.app/blog/bazi-marriage-compatibility',
  inLanguage: 'zh-TW',
  author: { '@type': 'Organization', name: '悟明' },
  publisher: { '@type': 'Organization', name: '悟明', url: 'https://wumingai.app' },
  datePublished: '2026-06-18',
  mainEntityOfPage: 'https://wumingai.app/blog/bazi-marriage-compatibility',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '八字合婚準嗎？',
      acceptedAnswer: { '@type': 'Answer', text: '八字合婚是分析兩人五行能量的互補與衝突，不是決定論。它能幫你看清楚關係中可能出現的摩擦點，但感情最終還是靠兩個人的選擇和經營。' },
    },
    {
      '@type': 'Question',
      name: '五行相剋就不能在一起嗎？',
      acceptedAnswer: { '@type': 'Answer', text: '不是。五行相剋代表兩人能量有摩擦，需要更多溝通和理解。很多相剋組合反而因為「不一樣」產生強烈吸引力，關鍵在於雙方願不願意磨合。' },
    },
    {
      '@type': 'Question',
      name: '八字合婚要看哪個柱？',
      acceptedAnswer: { '@type': 'Answer', text: '最核心是看日柱（日主），因為日主代表你這個人本身的能量屬性。兩人日主的五行關係，是合婚分析最重要的基礎。' },
    },
    {
      '@type': 'Question',
      name: '免費的八字合婚工具準嗎？',
      acceptedAnswer: { '@type': 'Answer', text: '基礎的五行相性分析是可靠的，因為邏輯是固定的。悟明的緣分指數工具結合了五行相性和AI解讀，能給出比純數字更有深度的分析。' },
    },
  ],
}

const ELEMENT_PAIRS = [
  {
    pair: '木 × 水',
    type: '相生',
    emoji: '🌊🌳',
    score: 92,
    title: '滋養型關係',
    desc: '水生木，一方天然滋養另一方成長。這種組合通常很有默契，不需要太多言語就能理解對方。木的人在水的陪伴下更有安全感，水的人看到木的成長會很有成就感。',
    challenge: '水容易付出過多，木要記得主動回應對方的付出。',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    pair: '火 × 木',
    type: '相生',
    emoji: '🌳🔥',
    score: 88,
    title: '助燃型關係',
    desc: '木生火，木的支持讓火更燃。兩人在一起充滿活力和熱情，很容易互相激勵。木的人給火穩定的根基，火的人帶給木方向和溫度。',
    challenge: '火有時太衝動，木要幫忙踩剎車；木有時太保守，需要火帶著走。',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    pair: '土 × 火',
    type: '相生',
    emoji: '🔥🏔️',
    score: 85,
    title: '支撐型關係',
    desc: '火生土，火的熱情轉化成土的踏實。這對組合一個帶來活力，一個帶來穩定，形成很好的互補。火的人在土的身邊感到有依靠，土的人被火點燃熱情。',
    challenge: '土有時太過沉穩讓火感到悶，火要學會慢下來，土要學會偶爾跟著衝。',
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    pair: '金 × 土',
    type: '相生',
    emoji: '🏔️⚔️',
    score: 83,
    title: '孕育型關係',
    desc: '土生金，土默默支持金的成長。金的人在土身邊有強烈的安全感，土的人欣賞金的果斷和清晰。這對組合很適合長期經營，關係穩固耐久。',
    challenge: '金有時太強硬，土需要學會表達自己的需求，而不是一直配合。',
    color: 'bg-gray-50 border-gray-200',
  },
  {
    pair: '水 × 金',
    type: '相生',
    emoji: '⚔️🌊',
    score: 86,
    title: '流動型關係',
    desc: '金生水，金的能量轉化為水的流動與智慧。這對組合中金帶來清晰的方向，水帶來深度和感知力。兩人都有一定的理性，溝通起來比較清楚直接。',
    challenge: '水比較感性，金比較理性，遇到情緒問題時容易雞同鴨講。',
    color: 'bg-indigo-50 border-indigo-200',
  },
  {
    pair: '木 × 土',
    type: '相剋',
    emoji: '🌳🏔️',
    score: 62,
    title: '突破型關係',
    desc: '木剋土，木的成長性和土的穩定性容易產生張力。木覺得土太保守，土覺得木太衝動。但這種張力如果處理好，反而能讓兩人互相突破舒適圈。',
    challenge: '需要大量溝通，理解對方的節奏。木要學會尊重土的步伐，土要學會給木空間。',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    pair: '火 × 金',
    type: '相剋',
    emoji: '🔥⚔️',
    score: 58,
    title: '磨礪型關係',
    desc: '火剋金，火的熱情直接衝擊金的秩序感。兩人個性差異明顯——火直接衝動，金冷靜理性。吸引力強，但日常相處容易有摩擦。',
    challenge: '火要學會三思而後行，金要學會放鬆標準。最大的課題是接受彼此的不同。',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    pair: '土 × 水',
    type: '相剋',
    emoji: '🌊🏔️',
    score: 60,
    title: '包容型關係',
    desc: '土剋水，土的穩定性會壓制水的流動感。水覺得土太死板，土覺得水太飄。但水的靈活能軟化土的固執，土的穩定能給水安全感。',
    challenge: '水要學會在土的框架裡找到自由，土要學會給水更多呼吸空間。',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    pair: '金 × 木',
    type: '相剋',
    emoji: '⚔️🌳',
    score: 55,
    title: '雕琢型關係',
    desc: '金剋木，金的銳利會切割木的生長。這對組合容易有控制與被控制的動態，金比較主導，木容易感到壓力。但金能幫木修剪多餘的部分，讓木更有型。',
    challenge: '金要學會放手，木要學會堅守自己的邊界。關係需要有意識地平衡權力。',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    pair: '水 × 火',
    type: '相剋',
    emoji: '🔥🌊',
    score: 52,
    title: '激盪型關係',
    desc: '水剋火，水的冷靜直接澆滅火的熱情。這對是最強的對比組合——火熱情外向，水冷靜內斂。初期吸引力極強，但長期容易因為節奏不合而消耗彼此。',
    challenge: '火要學會降溫，水要學會被點燃。這對組合需要雙方付出比其他組合更多的理解。',
    color: 'bg-red-50 border-red-200',
  },
  {
    pair: '木 × 木',
    type: '比和',
    emoji: '🌳🌳',
    score: 75,
    title: '同頻型關係',
    desc: '同元素的人天生理解彼此，不需要解釋太多。但兩個木在一起，能量太相似，少了互補的部分，有時候會覺得少了點「化學反應」。',
    challenge: '容易在相同的盲點上卡住，需要有意識地帶入不同的觀點和刺激。',
    color: 'bg-green-50 border-green-200',
  },
  {
    pair: '火 × 火',
    type: '比和',
    emoji: '🔥🔥',
    score: 72,
    title: '激情型關係',
    desc: '兩個火在一起，熱情加倍。初期非常精彩，充滿活力和衝勁。但兩個人都是主導型，容易爭主導權，也容易兩個人一起衝動。',
    challenge: '需要有人願意讓步，否則容易兩敗俱傷。建立清晰的決策機制很重要。',
    color: 'bg-orange-50 border-orange-200',
  },
]

const typeColor: Record<string, string> = {
  '相生': 'bg-green-100 text-green-700',
  '相剋': 'bg-amber-100 text-amber-700',
  '比和': 'bg-blue-100 text-blue-700',
}

export default function BaziMarriageCompatibilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-5 py-10">

          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="text-[12px] text-[#059669] mb-4 inline-block">← 悟明首頁</Link>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3] px-3 py-1 rounded-full">感情 × 八字</span>
            </div>
            <h1 className="text-[26px] font-medium text-[#0F2027] leading-snug mb-3">
              八字合婚怎麼看？<br />五行相合與相剋完整解析
            </h1>
            <p className="text-[14px] text-[#888] leading-relaxed">
              很多人以為八字合婚是迷信，其實它是一套分析兩個人五行能量互動的方法。不是用來判斷「能不能在一起」，而是幫你看清楚：<strong className="text-[#0F2027]">你們的能量是互補、相生，還是容易有摩擦？</strong>
            </p>
          </div>

          {/* CTA top */}
          <Link
            href="/compatibility"
            className="block bg-[#FFF1F2] border border-[#FECDD3] rounded-2xl p-4 mb-8 text-center active:opacity-80 transition-opacity"
          >
            <p className="text-[13px] font-medium text-[#E11D48] mb-1">☯ 免費測試你們的緣分指數</p>
            <p className="text-[11px] text-[#888]">輸入兩人生日，AI 分析五行相性 × 緣分深度</p>
          </Link>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-[20px] font-medium text-[#0F2027] mb-3">八字合婚到底在看什麼？</h2>
            <p className="text-[14px] text-[#555] leading-relaxed mb-3">
              八字合婚的核心，是比較兩個人的<strong className="text-[#0F2027]">日主五行</strong>。日主就是你八字命盤裡「日柱」的天干，代表你這個人最核心的能量屬性。
            </p>
            <p className="text-[14px] text-[#555] leading-relaxed mb-3">
              五行分為木、火、土、金、水，每個人的日主都屬於其中一個元素。兩個人在一起，就是兩種五行能量的互動。這個互動分三種：
            </p>
            <div className="space-y-3 mb-4">
              {[
                { type: '相生', emoji: '🌱', desc: '一方滋養另一方，關係有天然的流動感和默契' },
                { type: '相剋', emoji: '⚡', desc: '兩種能量有張力，容易有摩擦，但也有強烈吸引力' },
                { type: '比和', emoji: '🤝', desc: '同類元素，容易理解彼此，但少了互補' },
              ].map(item => (
                <div key={item.type} className="flex items-start gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3.5">
                  <span className="text-[20px]">{item.emoji}</span>
                  <div>
                    <p className="text-[13px] font-medium text-[#0F2027] mb-0.5">{item.type}</p>
                    <p className="text-[13px] text-[#777] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[#888] leading-relaxed bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3.5">
              💡 重要提醒：相剋不代表不合適，相生也不保證一定幸福。合婚只是提供一個參考框架，真正的關係還是靠兩個人的選擇和經營。
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-[20px] font-medium text-[#0F2027] mb-2">怎麼找出自己的日主？</h2>
            <p className="text-[14px] text-[#555] leading-relaxed mb-4">
              最簡單的方法是用工具直接查。輸入你的出生日期，系統會自動算出你的日主和五行屬性。
            </p>
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 mb-4">
              <p className="text-[13px] font-medium text-[#059669] mb-2">十天干對應五行</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { stems: '甲、乙', element: '木 🌳', bg: 'bg-green-50 border-green-200' },
                  { stems: '丙、丁', element: '火 🔥', bg: 'bg-orange-50 border-orange-200' },
                  { stems: '戊、己', element: '土 🏔️', bg: 'bg-yellow-50 border-yellow-200' },
                  { stems: '庚、辛', element: '金 ⚔️', bg: 'bg-gray-50 border-gray-200' },
                  { stems: '壬、癸', element: '水 🌊', bg: 'bg-blue-50 border-blue-200' },
                ].map(item => (
                  <div key={item.stems} className={`${item.bg} border rounded-xl p-3 text-center`}>
                    <p className="text-[14px] font-medium text-[#0F2027]">{item.stems}</p>
                    <p className="text-[12px] text-[#888]">{item.element}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[13px] text-[#777] leading-relaxed">
              不知道自己的日主？{' '}
              <Link href="/" className="text-[#059669] underline">到悟明免費查詢你的八字命盤</Link>，
              輸入生日後就能看到完整四柱，日柱的天干就是你的日主。
            </p>
          </section>

          {/* Section 3 — Pairs */}
          <section className="mb-8">
            <h2 className="text-[20px] font-medium text-[#0F2027] mb-2">各五行組合詳解</h2>
            <p className="text-[14px] text-[#555] leading-relaxed mb-5">
              以下是常見的五行配對分析。找到你和對方的組合，看看你們的能量互動屬於哪一種：
            </p>
            <div className="space-y-3">
              {ELEMENT_PAIRS.map(pair => (
                <div key={pair.pair} className={`${pair.color} border rounded-2xl p-4`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[20px]">{pair.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[15px] font-medium text-[#0F2027]">{pair.pair}</p>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColor[pair.type]}`}>{pair.type}</span>
                        </div>
                        <p className="text-[11px] text-[#888]">{pair.title}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="text-[18px] font-medium text-[#0F2027]">{pair.score}</p>
                      <p className="text-[9px] text-[#AAA]">/ 100</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#555] leading-relaxed mb-2">{pair.desc}</p>
                  <div className="bg-white bg-opacity-60 rounded-lg px-3 py-2">
                    <p className="text-[11px] text-[#888]"><span className="font-medium text-[#0F2027]">磨合重點：</span>{pair.challenge}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-[20px] font-medium text-[#0F2027] mb-3">合婚只看五行夠嗎？</h2>
            <p className="text-[14px] text-[#555] leading-relaxed mb-3">
              五行相性是合婚分析的基礎，但完整的八字合婚還會看更多層面：
            </p>
            <div className="space-y-2.5">
              {[
                { title: '日柱天干 × 地支的互動', desc: '天干是表層個性，地支是深層性格。兩人地支有沒有「相沖」或「相合」，會影響日常相處的舒適度。' },
                { title: '用神與喜神是否互補', desc: '每個人八字裡有所謂的「用神」，也就是最需要的能量。如果對方剛好帶來你的用神，這段關係會讓你整體運勢更好。' },
                { title: '大運與流年', desc: '時機也很重要。有時候兩個人的八字本身很合，但在某個大運階段特別容易有摩擦，或者特別適合在某個時間點結婚。' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-3 p-3.5 border border-[#E5E7EB] rounded-xl">
                  <span className="text-[#059669] font-medium text-[13px] flex-shrink-0 mt-0.5">✦</span>
                  <div>
                    <p className="text-[13px] font-medium text-[#0F2027] mb-1">{item.title}</p>
                    <p className="text-[13px] text-[#777] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[#888] leading-relaxed mt-4">
              深度合婚需要專業命理師解讀完整八字。但如果你想先有個方向，五行相性已經能告訴你很多。
            </p>
          </section>

          {/* CTA mid */}
          <Link
            href="/compatibility"
            className="block bg-gradient-to-r from-[#FFF1F2] to-[#FEF9F0] border border-[#FECDD3] rounded-2xl p-5 mb-8 text-center active:opacity-80 transition-opacity"
          >
            <p className="text-[22px] mb-2">☯</p>
            <p className="text-[15px] font-medium text-[#0F2027] mb-1">免費測試你們的緣分指數</p>
            <p className="text-[12px] text-[#888] mb-3">輸入兩人生日，AI 分析五行相性、默契指數、相處挑戰</p>
            <span className="inline-block bg-[#E11D48] text-white text-[13px] font-medium px-5 py-2.5 rounded-xl">
              立即測試緣分 →
            </span>
          </Link>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-[20px] font-medium text-[#0F2027] mb-4">常見問題</h2>
            <div className="space-y-3">
              {[
                {
                  q: '八字合婚準嗎？',
                  a: '八字合婚是分析兩人五行能量互動的方法，不是命運的判決書。它能幫你看清楚關係中可能出現的摩擦點和默契所在，但感情最終還是靠兩個人的選擇和經營。',
                },
                {
                  q: '五行相剋就不能在一起嗎？',
                  a: '完全不是。五行相剋代表兩人能量有摩擦，需要更多溝通和理解。很多相剋組合反而因為「不一樣」產生強烈吸引力。金剋木、水剋火這些組合，歷史上的知名伴侶裡比比皆是。',
                },
                {
                  q: '八字合婚要看哪個柱？',
                  a: '最核心是日柱（日主），因為日主代表你這個人本身的能量屬性。兩人日主的五行關係，是合婚分析最重要的基礎。完整分析還會看月柱、年柱的互動。',
                },
                {
                  q: '結婚前一定要合婚嗎？',
                  a: '不一定。合婚是一個參考工具，幫你多了解自己和對方的能量差異。最重要的還是兩個人的溝通、價值觀是否契合，以及願不願意為彼此調整。',
                },
              ].map(item => (
                <div key={item.q} className="border border-[#E5E7EB] rounded-xl p-4">
                  <p className="text-[14px] font-medium text-[#0F2027] mb-2">Q：{item.q}</p>
                  <p className="text-[13px] text-[#555] leading-relaxed">A：{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="mb-8">
            <p className="text-[11px] text-[#AAA] mb-3">延伸閱讀</p>
            <div className="space-y-2">
              {[
                { href: '/blog/bazi-love-fortune-guide', text: '💕 八字感情運：從日主看你的愛情模式與桃花' },
                { href: '/blog/bazi-day-master-guide', text: '🌳 八字日主完整解析：10種日主性格與天賦' },
                { href: '/blog/life-path-number-guide', text: '✨ 生命數字怎麼算？1到9完整意義解讀' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block bg-[#FAFAF7] border border-[#E5E5E0] rounded-xl px-4 py-3 text-[13px] text-[#0F2027] hover:border-[#059669] transition-colors"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 text-center">
            <p className="text-[13px] text-[#888] mb-1">想先了解自己的八字日主？</p>
            <p className="text-[16px] font-medium text-[#0F2027] mb-3">免費解讀你的五行命格與天賦</p>
            <Link
              href="/"
              className="inline-block bg-[#059669] text-white text-[14px] font-medium px-6 py-3 rounded-xl active:opacity-90 transition-opacity"
            >
              ✦ 免費八字解讀
            </Link>
          </div>

          <p className="text-center text-[10px] text-[#CCC] mt-8">
            © 2026 悟明 · 內容僅供參考，不構成專業命理建議
          </p>
        </div>
      </main>
    </>
  )
}
