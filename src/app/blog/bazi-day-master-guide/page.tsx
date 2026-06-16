import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '八字日主完整解析：10種日主性格與天賦',
  description: '什麼是八字日主？完整解析甲乙丙丁戊己庚辛壬癸10種日主的性格特質、天賦優勢與職涯方向。免費測試馬上找到你的日主。',
  keywords: ['八字日主', '日主性格', '八字天賦', '十天干', '八字免費解讀', '八字職業方向'],
  openGraph: {
    title: '八字日主完整解析：10種日主性格與天賦',
    description: '完整解析10種日主的性格特質、天賦優勢與職涯方向。免費測試馬上找到你的日主。',
    url: 'https://wumingai.app/blog/bazi-day-master-guide',
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'article',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '八字日主完整解析：10種日主性格與天賦',
  description: '完整解析甲乙丙丁戊己庚辛壬癸10種日主的性格特質、天賦優勢與職涯方向',
  url: 'https://wumingai.app/blog/bazi-day-master-guide',
  inLanguage: 'zh-TW',
  author: { '@type': 'Organization', name: '悟明' },
  publisher: { '@type': 'Organization', name: '悟明', url: 'https://wumingai.app' },
  mainEntityOfPage: 'https://wumingai.app/blog/bazi-day-master-guide',
}

const DAY_MASTERS = [
  {
    element: '木', emoji: '🌳', stem: '甲木', type: '參天大樹型',
    desc: '甲木是十天干中最具領導氣質的日主。個性正直、有原則，天生有想法、有方向感。不喜歡被約束，適合走自己的路。',
    strengths: '領導力、開創性、執行力強',
    traits: '獨立、有擔當、重視原則',
    career: '創業、管理、法律、教育',
  },
  {
    element: '木', emoji: '🌿', stem: '乙木', type: '藤蔓植物型',
    desc: '乙木柔中帶韌，懂得借力使力。人際關係極好，善於在複雜環境中找到生存空間，適應力強。',
    strengths: '人際敏感度、靈活應變、親和力',
    traits: '溫和、有彈性、善於合作',
    career: '公關、諮詢、設計、服務業',
  },
  {
    element: '火', emoji: '☀️', stem: '丙火', type: '太陽型',
    desc: '丙火如太陽，熱情外放，走到哪裡都是焦點。充滿感染力，天生有舞台魅力，很難被忽視。',
    strengths: '感染力、表達力、行動力',
    traits: '熱情、慷慨、直接',
    career: '演講、銷售、媒體、創作',
  },
  {
    element: '火', emoji: '🕯️', stem: '丁火', type: '燭光型',
    desc: '丁火是溫暖的燭光，不像丙火那樣外放，但光芒同樣持久。細膩、有深度，善於一對一深度連結。',
    strengths: '細膩洞察力、同理心、持久專注',
    traits: '溫柔、有藝術感、重感情',
    career: '心理諮商、藝術、教學、醫療',
  },
  {
    element: '土', emoji: '⛰️', stem: '戊土', type: '高山大地型',
    desc: '戊土厚重穩定，是十天干中最值得信賴的日主。做事踏實，不投機取巧，是團隊的定海神針。',
    strengths: '穩定性、責任感、執行力',
    traits: '務實、忠誠、有耐性',
    career: '金融、工程、房地產、行政管理',
  },
  {
    element: '土', emoji: '🌾', stem: '己土', type: '田園沃土型',
    desc: '己土如農田，懂得培育與滋養。對人有耐心，善於照顧他人需求，是天生的支持者與協調者。',
    strengths: '包容力、細心、協調能力',
    traits: '體貼、謹慎、重視和諧',
    career: '人資、教育、社工、行政支援',
  },
  {
    element: '金', emoji: '⚔️', stem: '庚金', type: '鋼鐵型',
    desc: '庚金是最果斷的日主，行事乾脆、不拖泥帶水。有原則，不妥協，天生適合需要判斷力與決策力的工作。',
    strengths: '決斷力、正義感、執行力',
    traits: '直接、剛毅、有原則',
    career: '法律、軍警、工程、外科',
  },
  {
    element: '金', emoji: '💎', stem: '辛金', type: '珠寶型',
    desc: '辛金如精緻珠寶，重視品質與美感。外表優雅，內心敏感，對細節有極高要求，有完美主義傾向。',
    strengths: '審美眼光、細節敏感度、品味',
    traits: '優雅、挑剔、追求完美',
    career: '時尚、品牌、珠寶設計、精品業',
  },
  {
    element: '水', emoji: '🌊', stem: '壬水', type: '大海江河型',
    desc: '壬水如大江大海，思維廣闊、點子多，善於整合資訊與資源。有大格局，但有時容易分散注意力。',
    strengths: '創意、整合力、大局觀',
    traits: '聰明、靈活、有遠見',
    career: '策略規劃、投資、科技、創業',
  },
  {
    element: '水', emoji: '🌧️', stem: '癸水', type: '細雨雲霧型',
    desc: '癸水如細雨，滋潤萬物卻不張揚。直覺力強，感受敏銳，常常能感知到別人沒注意到的細節。',
    strengths: '直覺力、創意、敏銳感受力',
    traits: '內斂、有想像力、善於觀察',
    career: '研究、寫作、藝術、心理學',
  },
]

const FAQS = [
  {
    q: '八字日主怎麼查？',
    a: '輸入你的出生日期，系統會自動計算出生日當天的天干，那就是你的日主。可以用悟明免費工具直接查詢，30秒出結果。',
  },
  {
    q: '日主和星座有什麼不同？',
    a: '星座根據太陽所在位置判斷，每月約30天一個星座。日主根據出生當天的天干，每隔幾天就會換一次，比星座更精細，也更個人化。',
  },
  {
    q: '同樣日主的人性格都一樣嗎？',
    a: '不一定。日主是性格的底色，但八字還有年柱、月柱、時柱的影響，加上五行的平衡狀況，每個人的完整命盤都是獨一無二的。',
  },
  {
    q: '八字日主準嗎？',
    a: '八字是中華文化流傳數千年的命理系統，日主解讀是其中最基礎也最核心的部分。建議把它當作認識自己的工具，而不是絕對的預言。',
  },
]

const ELEMENT_COLOR: Record<string, string> = {
  木: 'bg-green-50 border-green-200',
  火: 'bg-red-50 border-red-200',
  土: 'bg-yellow-50 border-yellow-200',
  金: 'bg-gray-50 border-gray-200',
  水: 'bg-blue-50 border-blue-200',
}

export default function BaziDayMasterPage() {
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
          <div className="inline-flex items-center gap-1.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-full px-3 py-1 text-[11px] text-[#059669] mb-4">
            八字基礎知識
          </div>
          <h1 className="text-[26px] font-semibold text-[#0F2027] leading-snug mb-3">
            八字日主完整解析：10種日主性格與天賦
          </h1>
          <p className="text-[13px] text-[#888]">閱讀時間約 5 分鐘</p>
        </div>

        {/* Intro */}
        <div className="prose prose-sm max-w-none mb-8 text-[15px] text-[#444] leading-relaxed space-y-4">
          <p>你有沒有想過，為什麼同樣努力，有些人卻好像天生就知道自己適合做什麼？</p>
          <p>答案可能藏在你的八字裡——更精確地說，藏在你的<strong className="text-[#0F2027]">日主</strong>裡。</p>
          <p>日主是八字命盤的核心，代表你這個人天生的能量型態、性格底色，以及最自然流露的天賦。讀懂自己的日主，就像拿到一本說明書，告訴你「我是哪種人、適合走哪條路」。</p>
        </div>

        {/* What is Day Master */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-4">什麼是八字日主？</h2>
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">
            八字由出生的年、月、日、時各取一個「天干」和一個「地支」組成，共八個字。其中，<strong className="text-[#0F2027]">出生日期的天干</strong>就是你的日主。
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed mb-6">
            天干共有十個：甲、乙、丙、丁、戊、己、庚、辛、壬、癸，分別對應木、火、土、金、水五種元素。
          </p>
          <Link href="/"
            className="flex items-center gap-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl px-4 py-4 active:opacity-70 transition-opacity">
            <span className="text-[24px]">✦</span>
            <div className="flex-1">
              <div className="text-[14px] font-medium text-[#0F2027]">不知道自己的日主？</div>
              <div className="text-[12px] text-[#888]">免費輸入生日，30秒查詢你的八字日主</div>
            </div>
            <span className="text-[13px] text-[#059669] font-medium">免費測試 →</span>
          </Link>
        </section>

        {/* 10 Day Masters */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-6">10種日主完整解析</h2>
          <div className="space-y-4">
            {DAY_MASTERS.map((dm) => (
              <div key={dm.stem} className={`border rounded-2xl p-4 ${ELEMENT_COLOR[dm.element]}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[22px]">{dm.emoji}</span>
                  <div>
                    <span className="text-[15px] font-semibold text-[#0F2027]">{dm.stem}</span>
                    <span className="text-[12px] text-[#888] ml-2">— {dm.type}</span>
                  </div>
                </div>
                <p className="text-[13px] text-[#555] leading-relaxed mb-3">{dm.desc}</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-[10px] text-[#AAA] mb-0.5">天賦優勢</div>
                    <div className="text-[11px] text-[#0F2027]">{dm.strengths}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#AAA] mb-0.5">性格特質</div>
                    <div className="text-[11px] text-[#0F2027]">{dm.traits}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#AAA] mb-0.5">職涯方向</div>
                    <div className="text-[11px] text-[#059669]">{dm.career}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Not a limit */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-4">日主只是起點，不是終點</h2>
          <div className="text-[15px] text-[#444] leading-relaxed space-y-4">
            <p>很多人看完日主解析後問：「那我命中注定只能做這些工作嗎？」當然不是。</p>
            <p>日主代表你<strong className="text-[#0F2027]">天生的能量底色</strong>，但八字的完整解讀還包括五行平衡、大運流年等因素。同樣是甲木日主，在不同的命盤組合下，展現出來的性格和天賦可能大不相同。</p>
            <p>更重要的是：了解日主是為了<strong className="text-[#0F2027]">發揮優勢</strong>，而不是被標籤限制。</p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-10">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 text-center">
            <div className="text-[28px] mb-2">✦</div>
            <h3 className="text-[16px] font-semibold text-[#0F2027] mb-2">免費查詢你的八字日主</h3>
            <p className="text-[13px] text-[#888] mb-4 leading-relaxed">
              輸入姓名和出生日期，悟明幫你找出日主、解讀天賦、分析2026年運勢
            </p>
            <Link href="/"
              className="inline-flex items-center gap-2 bg-[#059669] text-white rounded-xl px-6 py-3 text-[14px] font-medium active:opacity-80 transition-opacity">
              ✦ 免費解讀我的天賦
            </Link>
            <p className="text-[11px] text-[#AAA] mt-3">完全免費 · 無需註冊 · 30秒出結果</p>
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

        {/* Footer */}
        <div className="border-t border-[#F0FAF8] pt-6 text-center">
          <p className="text-[10px] text-[#CCC]">© 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議</p>
        </div>

      </article>
    </main>
  )
}
