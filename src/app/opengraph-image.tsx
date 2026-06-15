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
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Badge */}
        <div style={{ display: 'flex', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 999, padding: '8px 28px', marginBottom: 36 }}>
          <span style={{ fontSize: 20, color: '#059669', letterSpacing: 3 }}>迷茫時，先讀懂自己</span>
        </div>

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 28 }}>
          <img src="https://wumingai.app/favicon.svg" width={84} height={84} style={{ borderRadius: 22 }} alt="悟明" />
          <span style={{ fontSize: 88, fontWeight: 500, color: '#059669' }}>悟明</span>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: 38, color: '#0F2027', margin: 0, marginBottom: 14 }}>讀懂自己，導航人生</p>
        <p style={{ fontSize: 22, color: '#059669', margin: 0, marginBottom: 44 }}>八字 × 生命數字 × 星座，三維度解讀你</p>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: 14 }}>
          {['八字命盤', '職業生涯', '每月運程', '緣分指數'].map(f => (
            <div key={f} style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '9px 22px', display: 'flex' }}>
              <span style={{ fontSize: 20, color: '#059669' }}>{f}</span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 18, color: '#AAA', margin: 0, marginTop: 40 }}>wumingai.app · 完全免費</p>
      </div>
    ),
    { ...size }
  )
}
