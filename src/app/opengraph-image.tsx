import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '悟明 — 讀懂自己，導航人生'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Background tint */}
        <div style={{ position: 'absolute', inset: 0, background: '#F0FDF9', opacity: 0.4, display: 'flex' }} />

        {/* Logo */}
        <div style={{ fontSize: 100, fontWeight: 500, color: '#0F2027', display: 'flex', marginBottom: 16 }}>
          悟<span style={{ color: '#0D9488' }}>明</span>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 38, color: '#0D9488', marginBottom: 24, display: 'flex' }}>
          讀懂自己，導航人生
        </div>

        {/* Divider */}
        <div style={{ width: 240, height: 2, background: '#CCFBF1', marginBottom: 24, display: 'flex' }} />

        {/* Description */}
        <div style={{ fontSize: 24, color: '#777', marginBottom: 32, display: 'flex' }}>
          結合八字與AI，了解你的天賦、職涯方向與最佳人生時機
        </div>

        {/* URL */}
        <div style={{ fontSize: 20, color: '#AAA', display: 'flex' }}>wumingai.app</div>
      </div>
    ),
    { ...size }
  )
}
