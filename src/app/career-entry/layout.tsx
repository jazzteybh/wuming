import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '職涯天賦分析 — 悟明',
  description: '根據八字日主深度解讀你的天賦優勢與最適職涯方向。免費測試，輸入生日即可開始，無需註冊。',
  keywords: '八字職涯分析,天賦職業,八字日主,免費職涯測試,適合什麼工作',
  openGraph: {
    title: '職涯天賦分析 — 悟明',
    description: '根據八字日主深度解讀你的天賦優勢與最適職涯方向。免費測試，無需註冊。',
    url: 'https://wumingai.app/career-entry',
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function CareerEntryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
