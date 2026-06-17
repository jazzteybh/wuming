'use client'

import { useState, useEffect } from 'react'

export default function BlogStickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="bg-white border-t border-[#E5E7EB] px-4 py-3 flex items-center gap-3 max-w-lg mx-auto">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-[#0F2027] truncate">讀完了？來解讀你的天賦</p>
          <p className="text-[10px] text-[#AAA]">免費 · 30秒完成</p>
        </div>
        <a
          href="https://wumingai.app"
          onClick={() => window.gtag?.('event', 'blog_sticky_cta_clicked')}
          className="flex-shrink-0 bg-[#059669] text-white text-[13px] font-medium px-4 py-2 rounded-xl active:opacity-80 transition-opacity"
        >
          ✦ 免費解讀
        </a>
      </div>
    </div>
  )
}
