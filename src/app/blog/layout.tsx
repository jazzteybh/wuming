import type { Metadata } from 'next'
import BlogStickyCta from '@/components/BlogStickyCta'

export const metadata: Metadata = {
  title: '悟明 — 八字命理解讀指南',
  description: '深入了解八字、生命數字、星座與運勢。悟明提供免費八字解讀，幫助你讀懂自己、導航人生。',
  openGraph: {
    siteName: '悟明',
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: 'https://www.wumingai.app/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BlogStickyCta />
    </>
  )
}
