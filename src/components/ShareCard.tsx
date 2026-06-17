'use client'

import { useRef, useState, useEffect } from 'react'

const DAY_STEM_MAP: Record<string, string> = {
  '甲': 'jia-mu', '乙': 'yi-mu', '丙': 'bing-huo', '丁': 'ding-huo',
  '戊': 'wu-tu', '己': 'ji-tu', '庚': 'geng-jin', '辛': 'xin-jin',
  '壬': 'ren-shui', '癸': 'gui-shui',
}

const DAY_STEM_LABEL: Record<string, string> = {
  '甲': '甲木命', '乙': '乙木命', '丙': '丙火命', '丁': '丁火命',
  '戊': '戊土命', '己': '己土命', '庚': '庚金命', '辛': '辛金命',
  '壬': '壬水命', '癸': '癸水命',
}

interface Props {
  name: string
  dayStem: string
  lifePath: number
  zodiac: string
  gender: string
  tags: string[]
}

export default function ShareCard({ name, dayStem, lifePath, zodiac, gender, tags }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [ready, setReady] = useState(false)
  const [sharing, setSharing] = useState(false)

  const avatarKey = DAY_STEM_MAP[dayStem]
  const genderSuffix = gender === 'female' ? 'female' : 'male'
  const avatarSrc = avatarKey ? `/avatars/${avatarKey}-${genderSuffix}.png` : null
  const stemLabel = DAY_STEM_LABEL[dayStem] || `${dayStem}命`
  const displayTags = tags.slice(0, 3)

  // Pre-render the card as soon as it mounts so share button responds instantly
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!cardRef.current) return
      try {
        const html2canvas = (await import('html2canvas')).default
        const canvas = await html2canvas(cardRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: null,
          logging: false,
        })
        const b = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), 'image/png'))
        setBlob(b)
        setReady(true)
      } catch (e) {
        console.error(e)
        setReady(true) // still allow fallback
      }
    }, 800) // wait for images to load
    return () => clearTimeout(timer)
  }, [dayStem, gender, name, lifePath, zodiac, tags])

  async function handleShare() {
    setSharing(true)
    if (typeof window !== 'undefined') {
      window.gtag?.('event', 'share_card_clicked', { dayStem, gender })
    }
    try {
      const fileName = `${name}-天賦解讀.png`

      // If pre-rendered blob exists, use it directly
      if (blob) {
        const file = new File([blob], fileName, { type: 'image/png' })
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title: `${name} 的天賦解讀` })
          setSharing(false)
          return
        }
        // Fallback download
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = fileName
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
        setSharing(false)
        return
      }

      // Fallback: render on click (desktop / no pre-render)
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current!, { scale: 3, useCORS: true, backgroundColor: null })
      const b = await new Promise<Blob>((resolve) => canvas.toBlob(b => resolve(b!), 'image/png'))
      const file = new File([b], fileName, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `${name} 的天賦解讀` })
      } else {
        const url = URL.createObjectURL(b)
        const link = document.createElement('a')
        link.download = fileName
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') console.error(e)
    }
    setSharing(false)
  }

  const pill = (text: string) => (
    <div style={{
      background: 'white',
      border: '1px solid #BBF7D0',
      borderRadius: '20px',
      padding: '5px 14px',
      fontSize: '13px',
      fontWeight: '500',
      color: '#059669',
      whiteSpace: 'nowrap' as const,
    }}>{text}</div>
  )

  const dot = <div style={{ color: '#CCC', fontSize: '10px' }}>·</div>

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Card — use inline styles so html2canvas renders correctly */}
      <div
        ref={cardRef}
        style={{
          width: '300px',
          background: '#F0FDF4',
          border: '2px solid #BBF7D0',
          borderRadius: '24px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', alignSelf: 'flex-start' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="悟明" width={22} height={22} style={{ borderRadius: '6px', display: 'block' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#059669' }}>悟明</span>
          <span style={{ fontSize: '9px', color: '#AAA' }}>讀懂自己，導航人生</span>
        </div>

        {/* Avatar */}
        {avatarSrc && (
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #059669', overflow: 'hidden', background: '#DCFCE7' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarSrc} alt={stemLabel} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        )}

        {/* Name */}
        <div style={{ fontSize: '11px', color: '#AAA', letterSpacing: '0.08em' }}>{name} 的天賦解讀</div>

        {/* 3 equal pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {pill(stemLabel)}
          {dot}
          {pill(`${lifePath}號人`)}
          {dot}
          {pill(zodiac)}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px' }}>
          {displayTags.map(tag => (
            <span key={tag} style={{
              background: '#DCFCE7',
              color: '#059669',
              fontSize: '10px',
              padding: '3px 10px',
              borderRadius: '20px',
            }}>{tag}</span>
          ))}
        </div>

        {/* URL */}
        <div style={{ fontSize: '9px', color: '#CCC', letterSpacing: '0.1em', alignSelf: 'flex-end' }}>wumingai.app</div>
      </div>

      {/* Button */}
      <button
        onClick={handleShare}
        disabled={sharing}
        className="flex items-center gap-2 bg-[#059669] text-white rounded-xl px-5 py-2.5 text-[13px] font-medium active:opacity-80 transition-opacity disabled:opacity-60"
      >
        {sharing ? '處理中...' : ready ? '📥 儲存 / 分享卡片' : '⏳ 準備中...'}
      </button>
      <p className="text-[10px] text-[#AAA]">手機可直接儲存到相簿，再分享到 IG / Line</p>
    </div>
  )
}
