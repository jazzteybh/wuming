import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '每月運程解讀 — 悟明',
  description: '根據八字推算未來12個月能量走勢，提前掌握每月主題與行動方向。完全免費，輸入生日即可開始。',
  keywords: '八字月運,2026年運勢,每月運程,流年運勢,免費運勢測試',
  openGraph: {
    title: '每月運程解讀 — 悟明',
    description: '根據八字推算未來12個月能量走勢，提前掌握每月主題與行動方向。完全免費。',
    url: 'https://wumingai.app/monthly-entry',
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function MonthlyEntryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
