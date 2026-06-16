import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '生命數字怎麼算？1到9完整意義與性格解讀',
  description: '生命數字計算方法超簡單！用生日相加就能算出你的生命數字。完整解析1到9每個數字的性格特質、天賦與人生課題。免費測試立即查詢。',
  keywords: ['生命數字計算', '生命數字', '生命靈數', '數字命理', '生命數字1到9'],
  openGraph: {
    title: '生命數字怎麼算？1到9完整意義與性格解讀',
    description: '生命數字計算超簡單，用生日相加就能算出。完整解析1到9每個數字的性格與天賦。',
    url: 'https://wumingai.app/blog/life-path-number-guide',
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'article',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '生命數字怎麼算',
  description: '用出生日期計算生命數字的步驟說明',
  url: 'https://wumingai.app/blog/life-path-number-guide',
  inLanguage: 'zh-TW',
  author: { '@type': 'Organization', name: '悟明' },
  publisher: { '@type': 'Organization', name: '悟明', url: 'https://wumingai.app' },
  step: [
    { '@type': 'HowToStep', name: '寫下完整出生日期', text: '例如：1993年8月15日' },
    { '@type': 'HowToStep', name: '將所有數字相加', text: '1+9+9+3+8+1+5 = 36' },
    { '@type': 'HowToStep', name: '將結果繼續相加直到個位數', text: '3+6 = 9，生命數字就是9' },
  ],
}

const LIFE_PATHS = [
  {
    number: 1, emoji: '🌟',
    title: '領導者',
    desc: '生命數字1的人天生具備領導氣質，獨立自主、有開創精神。你不喜歡依賴他人，習慣走在前面開路。',
    strengths: ['強烈的主導性與自信', '開創新事物的勇氣', '目標明確、執行力強'],
    challenge: '學習接受他人的幫助，避免過於固執己見。',
    career: '創業家、主管、運動員、發明家',
    color: 'bg-yellow-50 border-yellow-200',
    numColor: 'text-yellow-600',
  },
  {
    number: 2, emoji: '🤝',
    title: '協調者',
    desc: '生命數字2的人敏感細膩、善解人意，是天生的和平使者。你在意關係的和諧，善於在衝突中找到平衡點。',
    strengths: ['極強的同理心與直覺', '善於傾聽與協調', '注重細節、體貼入微'],
    challenge: '建立健康的界線，不要因為顧慮他人而委屈自己。',
    career: '諮商師、外交官、護理師、人資',
    color: 'bg-pink-50 border-pink-200',
    numColor: 'text-pink-600',
  },
  {
    number: 3, emoji: '🎨',
    title: '創意表達者',
    desc: '生命數字3的人充滿創意與表達慾，天生樂觀、幽默，走到哪裡都能帶動氣氛。你的天賦在於用語言、藝術或創作感染他人。',
    strengths: ['豐富的創意與想像力', '溝通表達能力出色', '樂觀開朗、感染力強'],
    challenge: '避免分散注意力，學習聚焦和堅持到底。',
    career: '作家、設計師、演員、行銷人員',
    color: 'bg-orange-50 border-orange-200',
    numColor: 'text-orange-600',
  },
  {
    number: 4, emoji: '🏗️',
    title: '建設者',
    desc: '生命數字4的人腳踏實地、注重秩序，是所有數字中最可靠的一個。你相信努力和紀律，討厭走捷徑，更討厭不負責任的人。',
    strengths: ['極高的可靠性與責任感', '系統化思維、注重細節', '持久的耐心與執行力'],
    challenge: '學習保持彈性，有時候方法不只一種。',
    career: '工程師、會計師、建築師、專案管理',
    color: 'bg-green-50 border-green-200',
    numColor: 'text-green-600',
  },
  {
    number: 5, emoji: '🌍',
    title: '自由探索者',
    desc: '生命數字5的人熱愛自由、充滿好奇心，是天生的冒險家。你不喜歡被束縛，需要多元的刺激和變化才能保持活力。',
    strengths: ['適應力強、思維靈活', '勇於嘗試新事物', '溝通能力強、魅力十足'],
    challenge: '學習在自由中保持專注，建立長期承諾的能力。',
    career: '旅遊業、業務、媒體、自由工作者',
    color: 'bg-blue-50 border-blue-200',
    numColor: 'text-blue-600',
  },
  {
    number: 6, emoji: '🏠',
    title: '照護者',
    desc: '生命數字6的人天生有強烈的責任感和愛心，以家庭和社群為重。你喜歡照顧他人，在付出中找到滿足感。',
    strengths: ['深厚的愛心與包容力', '責任感強、值得信賴', '審美眼光佳、注重品質'],
    challenge: '學習照顧自己，不要因為過度付出而精疲力竭。',
    career: '教師、醫護人員、社工、室內設計師',
    color: 'bg-rose-50 border-rose-200',
    numColor: 'text-rose-600',
  },
  {
    number: 7, emoji: '🔍',
    title: '智慧探求者',
    desc: '生命數字7的人是所有數字中最具深度的一個。你天生喜歡獨處和思考，對真相有強烈的渴望，不接受表面答案。',
    strengths: ['深刻的分析與洞察力', '強烈的求知慾與專注力', '直覺敏銳、有哲學思維'],
    challenge: '學習向他人開放，避免過度孤立自己。',
    career: '研究員、心理學家、哲學家、分析師',
    color: 'bg-purple-50 border-purple-200',
    numColor: 'text-purple-600',
  },
  {
    number: 8, emoji: '💰',
    title: '成就者',
    desc: '生命數字8的人天生有商業頭腦，對權力、金錢和成就有強烈的驅動力。你有能力把想法變成現實，是最具物質創造力的數字。',
    strengths: ['卓越的商業判斷力', '強大的領導力與執行力', '目標導向、不輕易放棄'],
    challenge: '學習平衡物質追求與內在滿足，避免過於強勢。',
    career: '企業家、投資人、律師、高階主管',
    color: 'bg-amber-50 border-amber-200',
    numColor: 'text-amber-600',
  },
  {
    number: 9, emoji: '🌏',
    title: '人道主義者',
    desc: '生命數字9的人擁有廣闊的視野和深厚的慈悲心，天生關懷人類和世界。你有強烈的理想主義，希望讓世界變得更好。',
    strengths: ['廣闊的同理心與包容力', '強烈的理想與使命感', '智慧與洞察力兼備'],
    challenge: '學習接受不完美，避免因理想與現實落差而失望。',
    career: '藝術家、非營利組織、教育工作者、靈性導師',
    color: 'bg-teal-50 border-teal-200',
    numColor: 'text-teal-600',
  },
]

const FAQS = [
  {
    q: '生命數字和生命靈數是一樣的嗎？',
    a: '是的，生命數字（Life Path Number）和生命靈數是同一個概念的不同說法，都是指用出生日期計算出來的核心數字。',
  },
  {
    q: '生命數字算出來是11或22怎麼辦？',
    a: '11和22是「主數」（Master Numbers），具有特殊意義，不需要再繼續相加。11代表直覺型靈性領袖，22代表宏大願景的實踐者。',
  },
  {
    q: '生命數字準確嗎？',
    a: '生命數字是西方數字命理學的基礎工具，準確度因人而異。建議把它當作了解自己的參考框架，而不是絕對預測。',
  },
  {
    q: '生命數字和八字日主哪個更準？',
    a: '兩者來自不同的命理系統，各有其洞察角度。八字來自中華傳統命理，生命數字來自西方數字學。悟明將兩者結合，提供更全面的自我解讀。',
  },
]

export default function LifePathNumberPage() {
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
            數字命理入門
          </div>
          <h1 className="text-[26px] font-semibold text-[#0F2027] leading-snug mb-3">
            生命數字怎麼算？1到9完整意義與性格解讀
          </h1>
          <p className="text-[13px] text-[#888]">閱讀時間約 5 分鐘</p>
        </div>

        {/* Intro */}
        <div className="text-[15px] text-[#444] leading-relaxed space-y-4 mb-8">
          <p>如果八字是東方命理的核心，那生命數字就是西方命理中最簡單、最直觀的自我探索工具。</p>
          <p>只需要你的出生日期，做幾個簡單的加法，就能得出一個1到9的數字——這就是你的<strong className="text-[#0F2027]">生命數字</strong>，代表你這輩子天生的能量型態和人生課題。</p>
          <p>這篇文章教你怎麼算，並完整解析每個數字的意義。</p>
        </div>

        {/* How to calculate */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-4">生命數字怎麼計算？</h2>
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">方法很簡單：把出生日期的所有數字加在一起，直到剩下個位數為止。</p>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 mb-4">
            <div className="text-[13px] font-semibold text-[#059669] mb-3">計算範例：1993年8月15日</div>
            <div className="space-y-2 text-[13px] text-[#444]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#059669] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                <span>把所有數字寫出來：<strong>1, 9, 9, 3, 8, 1, 5</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#059669] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                <span>全部相加：1+9+9+3+8+1+5 = <strong>36</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#059669] text-white text-[10px] flex items-center justify-center font-bold">3</span>
                <span>繼續相加：3+6 = <strong className="text-[#059669] text-[15px]">9</strong></span>
              </div>
            </div>
            <div className="mt-3 text-[12px] text-[#059669] font-medium">→ 生命數字是 9</div>
          </div>

          <p className="text-[13px] text-[#888] leading-relaxed">注意：如果相加結果是11或22，不需要再繼續——這兩個是特殊的「主數」，保持原樣。</p>

          <div className="mt-4">
            <Link href="/"
              className="flex items-center gap-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl px-4 py-4 active:opacity-70 transition-opacity">
              <span className="text-[24px]">✦</span>
              <div className="flex-1">
                <div className="text-[14px] font-medium text-[#0F2027]">不想手算？用悟明幫你算</div>
                <div className="text-[12px] text-[#888]">輸入生日，自動計算生命數字並解讀性格天賦</div>
              </div>
              <span className="text-[13px] text-[#059669] font-medium">免費算 →</span>
            </Link>
          </div>
        </section>

        {/* 1-9 guide */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-6">生命數字1到9完整解析</h2>
          <div className="space-y-4">
            {LIFE_PATHS.map((lp) => (
              <div key={lp.number} className={`border rounded-2xl p-4 ${lp.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`text-[28px] font-bold ${lp.numColor} w-10 text-center`}>{lp.number}</div>
                  <div>
                    <span className="text-[15px] font-semibold text-[#0F2027]">{lp.emoji} {lp.title}</span>
                  </div>
                </div>
                <p className="text-[13px] text-[#555] leading-relaxed mb-3">{lp.desc}</p>
                <div className="space-y-2">
                  <div>
                    <div className="text-[10px] text-[#AAA] mb-1">天賦優勢</div>
                    <ul className="space-y-0.5">
                      {lp.strengths.map(s => (
                        <li key={s} className="flex items-start gap-1.5 text-[11px] text-[#444]">
                          <span className="text-[#059669] mt-0.5">✓</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <div className="text-[10px] text-[#AAA] mb-1">人生課題</div>
                      <p className="text-[11px] text-[#555]">{lp.challenge}</p>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#AAA] mb-1">適合職涯</div>
                      <p className="text-[11px] text-[#059669]">{lp.career}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Combine with BaZi */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-4">生命數字 × 八字：結合更準確</h2>
          <div className="text-[15px] text-[#444] leading-relaxed space-y-3">
            <p>生命數字是很好的自我認識起點，但單一工具有其侷限。同樣是生命數字3的人，個性可能差很多——因為八字日主、五行平衡都會影響最終的性格展現。</p>
            <p>悟明把<strong className="text-[#0F2027]">八字 × 星座 × 生命數字</strong>三個維度整合在一起，提供更完整、更個人化的解讀。三個系統相互印證，準確度遠高於任何單一工具。</p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-10">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 text-center">
            <div className="text-[28px] mb-2">✦</div>
            <h3 className="text-[16px] font-semibold text-[#0F2027] mb-2">免費查詢你的生命數字</h3>
            <p className="text-[13px] text-[#888] mb-4 leading-relaxed">
              輸入生日，悟明自動計算並結合八字、星座，給你最完整的天賦解讀
            </p>
            <Link href="/"
              className="inline-flex items-center gap-2 bg-[#059669] text-white rounded-xl px-6 py-3 text-[14px] font-medium active:opacity-80 transition-opacity">
              ✦ 免費解讀我的生命數字
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

        {/* Related */}
        <section className="mb-10">
          <h2 className="text-[18px] font-semibold text-[#0F2027] mb-4">延伸閱讀</h2>
          <div className="space-y-2">
            <Link href="/blog/bazi-day-master-guide"
              className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-4 active:opacity-70 transition-opacity">
              <span className="text-[20px]">🌳</span>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#0F2027]">八字日主完整解析：10種日主性格與天賦</div>
                <div className="text-[11px] text-[#888] mt-0.5">用八字讀懂你的天生能量</div>
              </div>
              <span className="text-[#059669] ml-auto">→</span>
            </Link>
            <Link href="/blog/2026-bazi-day-master-fortune"
              className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-4 active:opacity-70 transition-opacity">
              <span className="text-[20px]">📅</span>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#0F2027]">2026年各日主運勢：今年適合做什麼</div>
                <div className="text-[11px] text-[#888] mt-0.5">找出你2026年的機遇與挑戰</div>
              </div>
              <span className="text-[#059669] ml-auto">→</span>
            </Link>
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
