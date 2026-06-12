import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "悟明 — 讀懂自己，導航人生",
  description: "結合八字與AI，了解你的天賦、職涯方向與最佳人生時機。完全免費，即時生成。",
  keywords: "八字,命盤,AI算命,生命數字,職涯分析,流年運勢,自我探索",
  openGraph: {
    title: "悟明 — 讀懂自己，導航人生",
    description: "結合八字與AI，了解你的天賦、職涯方向與最佳人生時機。",
    url: "https://wumingai.app",
    siteName: "悟明",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${geistSans.variable}`}>
      <body className="min-h-full bg-white text-[#0F2027]">{children}</body>
    </html>
  );
}
