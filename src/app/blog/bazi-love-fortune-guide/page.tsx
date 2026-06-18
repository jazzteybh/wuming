import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '八字感情運完整解析：從日主看你的愛情模式與桃花',
  description: '透過八字感情運了解你天生的愛情模式！10種日主各有不同桃花特質，看看你屬於哪種？免費測試緣分指數。',
  keywords: ['八字感情運', '八字桃花', '日主感情', '八字愛情', '八字緣分'],
  openGraph: {
    title: '八字感情運完整解析：從日主看你的愛情模式與桃花',
    description: '透過八字感情運了解你天生的愛情模式！10種日主各有不同桃花特質，免費測試緣分指數。',
    url: 'https://wumingai.app/blog/bazi-love-fortune-guide',
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'article',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '八字感情運完整解析：從日主看你的愛情模式與桃花',
  description: '透過八字感情運了解你天生的愛情模式，10種日主各有不同桃花特質',
  url: 'https://wumingai.app/blog/bazi-love-fortune-guide',
  inLanguage: 'zh-TW',
  author: { '@type': 'Organization', name: '悟明' },
  publisher: { '@type': 'Organization', name: '悟明', url: 'https://wumingai.app' },
  mainEntityOfPage: 'https://wumingai.app/blog/bazi-love-fortune-guide',
}

const DAY_MASTERS = [
  {
    stem: '甲木', emoji: '🌳', type: '正直型戀人',
    traits: '重承諾、有責任感、喜歡保護對方。但有時太固執，不容易說出「我愛你」三個字，用行動表達的類型。',
    peach: '桃花來得慢但穩，一旦認定就很忠誠。最怕伴侶說謊或背叛。',
    match: '需要穩定感的人，或者能給他足夠空間成長的伴侶。',
    color: 'bg-green-50 border-green-200',
  },
  {
    stem: '乙木', emoji: '🌿', type: '溫柔型戀人',
    traits: '細心體貼、善解人意、很懂得讓對方舒服。但有時太依賴，容易因為太在意對方而失去自我。',
    peach: '桃花旺，很容易讓人想保護。感情路比較多波折，容易遇到需要付出很多的關係。',
    match: '強勢一點、有主見的伴侶，能幫乙木做決定。',
    color: 'bg-green-50 border-green-200',
  },
  {
    stem: '丙火', emoji: '🔥', type: '熱情型戀人',
    traits: '大方直接、不藏心思，喜歡就會讓對方知道。感情裡全力投入，但熱情退潮後可能讓對方覺得忽冷忽熱。',
    peach: '桃花極旺，自帶吸引力。問題是選擇太多，容易三心二意。',
    match: '能跟上節奏、不會太敏感的伴侶。',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    stem: '丁火', emoji: '🕯️', type: '深情型戀人',
    traits: '感情細膩、重情義、喜歡製造儀式感。但容易想太多，在感情裡有時會鑽牛角尖。',
    peach: '桃花質量高，遇到的人通常都是真心的。感情來得慢，需要時間建立信任。',
    match: '溫柔、懂得欣賞細節的伴侶。',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    stem: '戊土', emoji: '🏔️', type: '穩重型戀人',
    traits: '踏實、可靠、不花言巧語。但有時太過沉穩，不太會浪漫，伴侶可能會覺得少了驚喜。',
    peach: '桃花來得不快，但遇到就是長久的。不太會花心。',
    match: '喜歡穩定、不喜歡太多變動的人。',
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    stem: '己土', emoji: '🌾', type: '包容型戀人',
    traits: '溫柔包容、善解人意，很少跟伴侶起衝突。但有時包容過度，容易委屈自己。',
    peach: '桃花穩，不太會遇到爛桃花。感情路比較順。',
    match: '需要被好好愛、被包容的人。',
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    stem: '庚金', emoji: '⚔️', type: '率直型戀人',
    traits: '直接坦白、不玩心機，喜歡就是喜歡，不喜歡也不勉強。說話太直，容易傷到伴侶。',
    peach: '桃花帶點磁場，讓人覺得有安全感。但有時太直接嚇跑對方。',
    match: '心理素質強、不會太敏感的伴侶。',
    color: 'bg-gray-50 border-gray-200',
  },
  {
    stem: '辛金', emoji: '💎', type: '精緻型戀人',
    traits: '有品味、重質感、對感情有自己的標準。不輕易投入，但一旦愛了就很深情。',
    peach: '桃花質感高，遇到的對象通常都不差。但眼光挑，單身期可能比較長。',
    match: '有內涵、懂得欣賞他/她的人，不能太粗線條。',
    color: 'bg-gray-50 border-gray-200',
  },
  {
    stem: '壬水', emoji: '🌊', type: '自由型戀人',
    traits: '感情豐富、有魅力，但有時飄忽不定。需要能理解他/她需要自由的伴侶。',
    peach: '桃花旺，異性緣很好。但容易逢場作戲，真正深入的感情需要對方夠有深度。',
    match: '獨立、有自己生活的人，不能太黏。',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    stem: '癸水', emoji: '💧', type: '敏感型戀人',
    traits: '情感細膩、共感力強，很懂得關心人。但有時想太多，容易因為一點風吹草動就不安。',
    peach: '桃花溫柔，讓人覺得被理解。感情路上需要有安全感的環境。',
    match: '穩定、能給安全感的伴侶。',
    color: 'bg-blue-50 border-blue-200',
  },
]

const FAQS = [
  {
    q: '八字感情運可以改變嗎？',
    a: '八字反映的是你天生的能量模式，不是命中注定的劇本。了解自己的感情模式後，你可以有意識地調整——比如戊土日主知道自己不浪漫，就可以刻意製造驚喜；壬水日主知道自己需要空間，就能在關係裡提前溝通。',
  },
  {
    q: '只靠日主能準確判斷感情運嗎？',
    a: '日主是最重要的基礎，但完整的八字感情分析還需要看日支、月支，以及大運流年的配合。日主是方向，其他柱是細節。',
  },
  {
    q: '什麼樣的日主組合最合？',
    a: '八字感情沒有「最合」這個說法，合不合看的是兩個人的五行是否互補、是否相生。比如水命人遇到木命人，水能生木，感情上容易有滋養感。但實際還是要看完整命盤。',
  },
  {
    q: '桃花運差的人怎麼辦？',
    a: '桃花運偏弱的人，通常感情來得慢，但並不代表沒有。建議多走出去、擴展社交圈，在流年桃花運旺的年份特別把握機會。',
  },
  {
    q: '感情不順是八字問題嗎？',
    a: '八字是其中一個視角，但感情不順的原因很多：溝通方式、依附型態、自我認識不足。八字能幫你看清自己的模式，但改變還是需要自己去行動。',
  },
]

export default function BaziLoveFortunePage() {
  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="flex items-center px-5 pt-4 pb-3 border-b border-[#F0FAF8]">
        <a href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-green.png" alt="悟明" className="h-7 w-7" />
          <span className="text-[16px] font-medium text-[#059669]">悟明</span>
        </a>
        <span className="text-[#CCC] mx-2">·</span>
        <a href="/blog/bazi-day-master-guide" className="text-[13px] text-[#AAA] hover:text-[#059669]">命理知識</a>
      </nav>

      <article className="px-5 py-7 max-w-lg mx-auto">

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-[#059669] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full px-3 py-1 mb-3">
            八字感情運
          </div>
          <h1 className="text-[24px] font-medium text-[#0F2027] leading-snug mb-3">
            從八字看感情運與桃花：你天生的愛情模式是什麼？
          </h1>
          <p className="text-[13px] text-[#888] leading-relaxed">
            為什麼有些人談戀愛特別順，桃花不斷？有些人條件不差，感情路卻走得特別辛苦？這跟你的八字感情運有關。
          </p>
        </div>

        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 mb-6">
          <p className="text-[13px] text-[#059669] font-medium mb-1">先了解自己的日主</p>
          <p className="text-[12px] text-[#555] leading-relaxed mb-3">
            八字感情運主要由你的日主（出生日天干）決定。不知道自己的日主？免費解讀一下：
          </p>
          <a href="https://wumingai.app" className="inline-flex items-center gap-1.5 bg-[#059669] text-white text-[13px] font-medium px-4 py-2 rounded-xl">
            ✦ 免費查看我的日主
          </a>
        </div>

        <section className="mb-8">
          <h2 className="text-[18px] font-medium text-[#0F2027] mb-2">八字感情運是什麼？</h2>
          <p className="text-[14px] text-[#555] leading-relaxed mb-3">
            在八字命理中，「感情運」主要由<strong className="text-[#059669]">日主（你的天干）</strong>決定。日主代表你這個人的核心能量，也反映你在感情中的本能反應。
          </p>
          <ul className="space-y-1.5 mb-3">
            {['你是主動追求的人，還是等待對方來的人？', '你在感情裡更需要安全感，還是自由空間？', '你遇到衝突時是直接表達，還是悶在心裡？'].map(item => (
              <li key={item} className="flex items-start gap-2 text-[14px] text-[#555]">
                <span className="text-[#059669] mt-0.5 flex-shrink-0">✦</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-[#555] leading-relaxed">
            這些不是後天培養的，是你天生就有的模式。想深入了解自己的日主，可以先看這篇：
            <Link href="/blog/bazi-day-master-guide" className="text-[#059669] underline ml-1">八字10種日主完整解析</Link>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-[18px] font-medium text-[#0F2027] mb-4">10種日主的感情模式與桃花特質</h2>
          <div className="space-y-4">
            {DAY_MASTERS.map(dm => (
              <div key={dm.stem} className={`border rounded-2xl p-4 ${dm.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[22px]">{dm.emoji}</span>
                  <div>
                    <span className="text-[15px] font-medium text-[#0F2027]">{dm.stem}日主</span>
                    <span className="text-[11px] text-[#888] ml-2">— {dm.type}</span>
                  </div>
                </div>
                <div className="space-y-2 text-[13px] text-[#555]">
                  <p><strong className="text-[#0F2027]">感情特質：</strong>{dm.traits}</p>
                  <p><strong className="text-[#0F2027]">桃花特色：</strong>{dm.peach}</p>
                  <p><strong className="text-[#0F2027]">適合對象：</strong>{dm.match}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-[18px] font-medium text-[#0F2027] mb-3">除了日主，還有哪些影響八字感情運？</h2>
          <p className="text-[14px] text-[#555] leading-relaxed mb-3">
            八字感情運不只是日主，還有幾個關鍵因素：
          </p>
          <div className="space-y-2">
            {[
              { num: '1', title: '日支（日柱地支）', desc: '代表你的婚姻宮，反映你在親密關係中的狀態' },
              { num: '2', title: '流年大運', desc: '某些年份桃花特別旺，是感情的黃金期' },
              { num: '3', title: '五行平衡', desc: '五行過旺或不足，都會影響感情的穩定度' },
              { num: '4', title: '生命數字', desc: '結合八字和生命數字，能更立體地看見你的感情模式' },
            ].map(item => (
              <div key={item.num} className="flex items-start gap-3 bg-white border border-[#E5E7EB] rounded-xl p-3">
                <div className="w-6 h-6 rounded-full bg-[#059669] text-white text-[11px] font-medium flex items-center justify-center flex-shrink-0">{item.num}</div>
                <div>
                  <p className="text-[13px] font-medium text-[#0F2027]">{item.title}</p>
                  <p className="text-[12px] text-[#888]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[#555] mt-3">
            關於生命數字如何影響感情，可以看這篇：
            <Link href="/blog/life-path-number-guide" className="text-[#059669] underline ml-1">生命數字怎麼算？1到9完整解讀</Link>
          </p>
        </section>

        <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-2xl p-4 mb-8">
          <p className="text-[14px] font-medium text-[#0F2027] mb-1">☯ 想知道你和某人的緣分深淺？</p>
          <p className="text-[13px] text-[#777] leading-relaxed mb-3">
            輸入兩個人的生日，AI 根據八字合盤分析你們的天然默契、互補程度，還有相處的挑戰在哪裡。
          </p>
          <a href="https://wumingai.app/compatibility" className="inline-flex items-center gap-1.5 bg-[#E11D48] text-white text-[13px] font-medium px-4 py-2 rounded-xl">
            ☯ 免費測試緣分指數
          </a>
        </div>

        <section className="mb-8">
          <h2 className="text-[18px] font-medium text-[#0F2027] mb-4">常見問題</h2>
          <div className="space-y-3">
            {FAQS.map(faq => (
              <div key={faq.q} className="border border-[#E5E7EB] rounded-2xl p-4">
                <p className="text-[14px] font-medium text-[#0F2027] mb-1.5">Q：{faq.q}</p>
                <p className="text-[13px] text-[#555] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 text-center">
          <p className="text-[16px] font-medium text-[#0F2027] mb-1">讀懂自己，才能遇見對的人</p>
          <p className="text-[13px] text-[#777] leading-relaxed mb-4">
            了解自己的八字感情模式是第一步。做一份完整的天賦解讀，從命格、性格到感情運全面了解自己。
          </p>
          <a href="https://wumingai.app" className="inline-flex items-center gap-1.5 bg-[#059669] text-white text-[14px] font-medium px-5 py-2.5 rounded-xl">
            ✦ 免費八字天賦解讀
          </a>
          <p className="text-[11px] text-[#AAA] mt-2">完全免費 · 30秒完成</p>
        </div>

        <div className="mt-8 pt-6 border-t border-[#F0FAF8]">
          <p className="text-[12px] text-[#AAA] mb-3">相關文章</p>
          <div className="space-y-2">
            <Link href="/blog/bazi-day-master-guide" className="flex items-center gap-2 text-[13px] text-[#555] hover:text-[#059669]">
              <span>🌳</span> 八字日主完整解析：10種日主性格與天賦
            </Link>
            <Link href="/blog/life-path-number-guide" className="flex items-center gap-2 text-[13px] text-[#555] hover:text-[#059669]">
              <span>🔢</span> 生命數字怎麼算？1到9完整意義解讀
            </Link>
            <Link href="/blog/2026-bazi-day-master-fortune" className="flex items-center gap-2 text-[13px] text-[#555] hover:text-[#059669]">
              <span>🔮</span> 2026年各日主運勢完整解析
            </Link>
          </div>
        </div>

      </article>
    </main>
  )
}
