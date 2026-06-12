export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-10 max-w-2xl mx-auto">
      <h1 className="text-[22px] font-semibold text-[#0F2027] mb-1">隱私權政策</h1>
      <p className="text-[12px] text-[#AAA] mb-8">最後更新：2026年6月</p>

      <div className="space-y-6 text-[14px] text-[#444] leading-relaxed">

        <section>
          <h2 className="text-[16px] font-medium text-[#0F2027] mb-2">1. 我們是誰</h2>
          <p>悟明（wumingai.app）是一款提供 AI 命理解讀的自我探索工具，由個人開發者營運，服務對象主要為台灣使用者。</p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-[#0F2027] mb-2">2. 我們收集哪些資料</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>你在表單中填寫的姓名、出生日期、出生時間、性別</li>
            <li>你自願提供的 Email 地址（僅用於寄送命盤報告）</li>
            <li>匿名的網站使用數據（透過 Google Analytics 收集，包含頁面瀏覽、停留時間等）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-[#0F2027] mb-2">3. 我們如何使用你的資料</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>產生你的 AI 八字命盤解讀</li>
            <li>寄送命盤報告及每月運勢更新至你的信箱（僅在你提供 Email 後）</li>
            <li>改善網站功能與使用體驗</li>
          </ul>
          <p className="mt-2">我們不會將你的個人資料出售、出租或以任何形式提供給第三方用於商業用途。</p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-[#0F2027] mb-2">4. 資料儲存</h2>
          <p>命盤解讀結果不會永久儲存於我們的伺服器。Email 地址透過 Resend 服務處理，並依其隱私政策保護。網站架設於 Vercel 平台。</p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-[#0F2027] mb-2">5. Cookie 與追蹤</h2>
          <p>我們使用 Google Analytics 4 收集匿名使用數據，以了解用戶如何使用本網站。這些數據不包含個人識別資訊。你可以透過瀏覽器設定拒絕 Cookie。</p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-[#0F2027] mb-2">6. 你的權利</h2>
          <p>你可以隨時要求我們刪除你的 Email 資料或停止接收郵件，只需回覆任何一封我們寄出的信件告知即可。</p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-[#0F2027] mb-2">7. 未成年人</h2>
          <p>本服務不針對 13 歲以下兒童，我們不會故意收集未成年人的個人資料。</p>
        </section>

        <section>
          <h2 className="text-[16px] font-medium text-[#0F2027] mb-2">8. 聯絡我們</h2>
          <p>如有任何隱私相關問題，請寄信至：<a href="mailto:tboonho93@gmail.com" className="text-[#0D9488] underline">tboonho93@gmail.com</a></p>
        </section>

      </div>

      <div className="mt-10 pt-6 border-t border-gray-100">
        <a href="/" className="text-[13px] text-[#0D9488]">← 返回悟明</a>
      </div>
    </main>
  )
}
