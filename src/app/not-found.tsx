import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5 text-center">
      <div className="mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="悟明" className="h-12 w-12 mx-auto mb-3" />
        <div className="text-xl font-medium text-[#059669]">悟明</div>
      </div>
      <p className="text-[48px] font-medium text-[#0F2027] leading-none mb-2">404</p>
      <p className="text-[16px] text-[#0F2027] font-medium mb-1">找不到這個頁面</p>
      <p className="text-[13px] text-[#AAA] mb-8">這個命盤似乎不存在，回去重新解讀吧</p>
      <Link
        href="/"
        className="h-11 px-6 bg-[#059669] text-white rounded-xl text-[14px] font-medium flex items-center justify-center"
      >
        返回悟明首頁
      </Link>
    </main>
  )
}
