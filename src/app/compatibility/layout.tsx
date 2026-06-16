import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '緣分指數測試 — 悟明',
  description: '輸入兩人生日，用八字 × 五行分析你們的契合度與相處模式。免費緣分測試，無需註冊。',
  keywords: '緣分測試,八字合盤,情侶契合度,合婚,免費配對測試,五行相合',
  openGraph: {
    title: '緣分指數測試 — 悟明',
    description: '輸入兩人生日，用八字 × 五行分析你們的契合度與相處模式。免費測試，無需註冊。',
    url: 'https://wumingai.app/compatibility',
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function CompatibilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
