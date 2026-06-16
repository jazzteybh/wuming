import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '免費八字解讀工具推薦2026：5款工具完整比較',
  description: '整理5款免費八字解讀工具，從準確度、功能深度到使用體驗完整比較。找到最適合你的八字工具，免費測試不需註冊。',
  keywords: ['免費八字解讀工具', '八字工具推薦', '八字免費測試', '線上八字', '八字解盤工具'],
  openGraph: {
    title: '免費八字解讀工具推薦2026：5款工具完整比較',
    description: '整理5款免費八字解讀工具，從準確度、功能深度到使用體驗完整比較。',
    url: 'https://wumingai.app/blog/free-bazi-tools-guide',
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'article',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '免費八字解讀工具推薦2026：5款工具完整比較',
  description: '整理5款免費八字解讀工具，從準確度、功能深度到使用體驗完整比較',
  url: 'https://wumingai.app/blog/free-bazi-tools-guide',
  inLanguage: 'zh-TW',
  author: { '@type': 'Organization', name: '悟明' },
  publisher: { '@type': 'Organization', name: '悟明', url: 'https://wumingai.app' },
  mainEntityOfPage: 'https://wumingai.app/blog/free-bazi-tools-guide',
}

const TOOLS = [
  {
    rank: 1,
    name: '悟明 wumingai.app',
    tag: '最推薦',
    tagColor: 'bg-[#059669] text-white',
    emoji: '✦',
    desc: 'AI驅動的八字天賦解讀平台，結合性格天賦、職涯方向、每月運程與緣分分析，解讀深度遠超傳統工具。',
    pros: ['AI深度解讀，不只列命盤數據', '4大功能：性格・職涯・運程・緣分', '無需註冊，30秒出結果', '繁體中文介面，台灣用戶友好', '解讀語氣自然，易讀易懂'],
    cons: ['功能聚焦天賦方向，不做流年細節預測'],
    best: '想了解自己天賦、職涯方向的人',
    free: true,
    url: '/',
    border: 'border-[#059669]',
    bg: 'bg-[#F0FDF4]',
  },
  {
    rank: 2,
    name: '萬年曆八字',
    tag: '傳統派',
    tagColor: 'bg-[#6B7280] text-white',
    emoji: '📅',
    desc: '老牌八字排盤工具，功能完整，適合有基礎知識的使用者自行解讀命盤結構。',
    pros: ['排盤功能完整', '十神、大運、流年都有', '免費使用'],
    cons: ['需要八字基礎才看得懂', '介面老舊，手機體驗差', '只給數據，沒有解讀說明'],
    best: '已有八字知識、想自己分析的人',
    free: true,
    url: null,
    border: 'border-[#E5E7EB]',
    bg: 'bg-white',
  },
  {
    rank: 3,
    name: '命理工具網站（各類）',
    tag: '資料查詢',
    tagColor: 'bg-[#6B7280] text-white',
    emoji: '🔍',
    desc: '網路上有各種免費排盤網站，主要提供命盤數據查詢，適合做基礎資料對照。',
    pros: ['免費取得八字排盤', '適合查詢天干地支'],
    cons: ['解讀品質參差不齊', '多數廣告多、體驗差', '解讀通常很淺或很模糊'],
    best: '只需要查排盤數據的人',
    free: true,
    url: null,
    border: 'border-[#E5E7EB]',
    bg: 'bg-white',
  },
  {
    rank: 4,
    name: 'App類八字工具',
    tag: '手機優先',
    tagColor: 'bg-[#6B7280] text-white',
    emoji: '📱',
    desc: 'App Store上有多款八字App，部分有基礎免費功能，進階解讀通常需付費。',
    pros: ['手機操作方便', '部分有日曆提醒功能'],
    cons: ['免費版功能非常有限', '進階功能需訂閱，價格不透明', '解讀品質差異大'],
    best: '需要手機App、有付費意願的人',
    free: false,
    url: null,
    border: 'border-[#E5E7EB]',
    bg: 'bg-white',
  },
  {
    rank: 5,
    name: '真人命理師諮詢',
    tag: '高成本',
    tagColor: 'bg-[#6B7280] text-white',
    emoji: '🧑‍🏫',
    desc: '找真人命理師做完整解盤，深度最高但費用也最高，一次諮詢通常需要數千元。',
    pros: ['可以即時問答互動', '解讀最客製化'],
    cons: ['費用高，一次數千至數萬元', '品質差異極大，難以事先判斷', '需要預約排期'],
    best: '有重大人生決策、願意付費的人',
    free: false,
    url: null,
    border: 'border-[#E5E7EB]',
    bg: 'bg-white',
  },
]

const FAQS = [
  {
    q: '免費八字工具準確嗎？',
    a: '準確度取決於算法和解讀深度。純排盤工具只給你天干地支，需要自己解讀。AI解讀工具（如悟明）能根據命盤組合給出完整分析，準確度更高且容易理解。',
  },
  {
    q: '八字工具需要提供哪些資料？',
    a: '基本上需要出生年月日，部分工具會要求出生時辰（可更精準判斷時柱）。悟明只需要姓名和出生日期，不需要時辰也能做完整分析。',
  },
  {
    q: '免費工具和付費工具有什麼差別？',
    a: '主要差在解讀深度和個人化程度。免費排盤工具只給數據；付費命理師能即時互動；AI工具如悟明則提供免費但深度的個人化解讀，是兩者之間的最佳平衡。',
  },
  {
    q: '八字工具適合第一次接觸命理的人嗎？',
    a: '傳統排盤工具需要基礎知識才能看懂。悟明這類AI解讀工具用白話文解讀，沒有任何命理基礎也能完全理解，最適合入門。',
  },
]

export default function FreeBaziToolsPage() {
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
          <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-full px-3 py-1 text-[11px] text-[#2563EB] mb-4">
            工具推薦
          </div>
          <h1 className="text-[26px] font-semibold text-[#0F2027] leading-snug mb-3">
            免費八字解讀工具推薦2026<br />5款工具完整比較
          </h1>
          <p className="text-[13px] text-[#888]">閱讀時間約 4 分鐘 · 2026年更新</p>
        </div>

        {/* Intro */}
        <div className="text-[15px] text-[#444] leading-relaxed space-y-4 mb-8">
          <p>想了解自己的八字，但不知道從哪個工具開始？</p>
          <p>網路上的八字工具很多，但品質差很多：有的只給你一堆看不懂的數據，有的解讀很淺、有的介面充滿廣告。我們整理了5款常見工具，從功能、深度、易用性做完整比較，幫你找到最適合的選擇。</p>
        </div>

        {/* Quick comparison */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-4">選工具前，先想清楚你要什麼</h2>
          <div className="grid grid-cols-1 gap-2">
            {[
              { need: '想了解自己的天賦和性格', rec: '→ 用悟明，AI深度解讀' },
              { need: '想找職涯方向', rec: '→ 用悟明職涯天賦分析' },
              { need: '想看未來運勢', rec: '→ 用悟明每月運程解讀' },
              { need: '只需要排盤數據，自己解讀', rec: '→ 傳統排盤工具即可' },
              { need: '有重大決策需要深度諮詢', rec: '→ 考慮付費命理師' },
            ].map((item) => (
              <div key={item.need} className="flex items-start gap-3 border border-[#E5E7EB] rounded-xl p-3">
                <span className="text-[13px] text-[#444] flex-1">{item.need}</span>
                <span className="text-[12px] text-[#059669] font-medium whitespace-nowrap">{item.rec}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tool cards */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-6">5款工具詳細比較</h2>
          <div className="space-y-4">
            {TOOLS.map((tool) => (
              <div key={tool.name} className={`border-2 rounded-2xl p-4 ${tool.border} ${tool.bg}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[20px]">{tool.emoji}</span>
                    <div>
                      <div className="text-[15px] font-semibold text-[#0F2027]">#{tool.rank} {tool.name}</div>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium mt-0.5 ${tool.tagColor}`}>
                        {tool.tag}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[11px] rounded-full px-2 py-1 ${tool.free ? 'bg-[#DCFCE7] text-[#059669]' : 'bg-[#FEE2E2] text-[#DC2626]'}`}>
                    {tool.free ? '免費' : '需付費'}
                  </span>
                </div>

                <p className="text-[13px] text-[#666] leading-relaxed mb-3">{tool.desc}</p>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <div className="text-[10px] text-[#AAA] mb-1">優點</div>
                    <ul className="space-y-1">
                      {tool.pros.map((p) => (
                        <li key={p} className="flex items-start gap-1">
                          <span className="text-[#059669] text-[10px] mt-0.5">✓</span>
                          <span className="text-[11px] text-[#444]">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#AAA] mb-1">缺點</div>
                    <ul className="space-y-1">
                      {tool.cons.map((c) => (
                        <li key={c} className="flex items-start gap-1">
                          <span className="text-[#DC2626] text-[10px] mt-0.5">✕</span>
                          <span className="text-[11px] text-[#444]">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white bg-opacity-70 rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#666]">最適合：{tool.best}</span>
                  {tool.url && (
                    <Link href={tool.url} className="text-[11px] text-[#059669] font-medium">
                      立即試用 →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Wuming */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#0F2027] mb-4">為什麼我們推薦悟明？</h2>
          <div className="text-[15px] text-[#444] leading-relaxed space-y-3">
            <p>大部分免費八字工具只做一件事：給你排盤數據。但如果你沒有命理基礎，那些天干地支對你來說只是符號。</p>
            <p>悟明的不同在於，它不只排盤，而是<strong className="text-[#0F2027]">用AI把你的命盤翻譯成你能理解的語言</strong>——你的天賦是什麼、最適合什麼工作、和某人的契合度如何、接下來12個月的能量走勢。</p>
            <p>而且完全免費、不需要註冊，30秒就能看到結果。</p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-10">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 text-center">
            <div className="text-[28px] mb-2">✦</div>
            <h3 className="text-[16px] font-semibold text-[#0F2027] mb-2">立即免費試用悟明</h3>
            <p className="text-[13px] text-[#888] mb-4 leading-relaxed">
              輸入生日，30秒解讀你的八字天賦、職涯方向和運程走勢
            </p>
            <Link href="/"
              className="inline-flex items-center gap-2 bg-[#059669] text-white rounded-xl px-6 py-3 text-[14px] font-medium active:opacity-80 transition-opacity">
              ✦ 免費開始解讀
            </Link>
            <p className="text-[11px] text-[#AAA] mt-3">完全免費 · 無需註冊 · 繁體中文介面</p>
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
                <div className="text-[11px] text-[#888] mt-0.5">先認識你的八字日主是哪一種</div>
              </div>
              <span className="text-[#059669] ml-auto">→</span>
            </Link>
            <Link href="/blog/bazi-career-direction"
              className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-4 active:opacity-70 transition-opacity">
              <span className="text-[20px]">💼</span>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#0F2027]">迷茫不知道做什麼工作？用八字找方向</div>
                <div className="text-[11px] text-[#888] mt-0.5">用八字找到天生職涯優勢</div>
              </div>
              <span className="text-[#059669] ml-auto">→</span>
            </Link>
            <Link href="/blog/2026-bazi-day-master-fortune"
              className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-4 active:opacity-70 transition-opacity">
              <span className="text-[20px]">🔮</span>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#0F2027]">2026年各日主運勢完整解析</div>
                <div className="text-[11px] text-[#888] mt-0.5">看看你的日主今年運勢如何</div>
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
