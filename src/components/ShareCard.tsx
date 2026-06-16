'use client'

import { useRef, useState } from 'react'

const DAY_STEM_MAP: Record<string, string> = {
  '甲': 'jia-mu',
  '乙': 'yi-mu',
  '丙': 'bing-huo',
  '丁': 'ding-huo',
  '戊': 'wu-tu',
  '己': 'ji-tu',
  '庚': 'geng-jin',
  '辛': 'xin-jin',
  '壬': 'ren-shui',
  '癸': 'gui-shui',
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
  const [downloading, setDownloading] = useState(false)

  const avatarKey = DAY_STEM_MAP[dayStem]
  const genderSuffix = gender === 'female' ? 'female' : 'male'
  const avatarSrc = avatarKey ? `/avatars/${avatarKey}-${genderSuffix}.png` : null
  const stemLabel = DAY_STEM_LABEL[dayStem] || `${dayStem}命`

  async function handleDownload() {
    setDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current!, { scale: 2, useCORS: true, backgroundColor: null })
      const link = document.createElement('a')
      link.download = `${name}-天賦解讀.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error(e)
    }
    setDownloading(false)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Card */}
      <div ref={cardRef} className="w-[300px] bg-[#F0FDF4] border-2 border-[#BBF7D0] rounded-3xl p-6 flex flex-col items-center gap-4" style={{ fontFamily: 'system-ui, sans-serif' }}>

        {/* Logo */}
        <div className="flex items-center gap-1.5 self-start">
          <div className="w-5 h-5 bg-[#059669] rounded-md flex items-center justify-center text-white text-[10px]">✦</div>
          <span className="text-[13px] font-semibold text-[#059669] tracking-wide">悟明</span>
          <span className="text-[9px] text-[#AAA]">讀懂自己，導航人生</span>
        </div>

        {/* Avatar */}
        {avatarSrc && (
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-[#DCFCE7]" style={{ border: '3px solid #059669' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarSrc} alt={stemLabel} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Info */}
        <div className="text-center w-full">
          <div className="text-[11px] text-[#AAA] tracking-widest mb-3">{name} 的天賦解讀</div>
          <div className="flex items-center justify-center gap-1.5 flex-wrap mb-3">
            <div className="bg-white border border-[#BBF7D0] rounded-full px-3 py-1 text-[13px] font-medium text-[#059669]">{stemLabel}</div>
            <div className="text-[#CCC] text-[10px]">·</div>
            <div className="bg-white border border-[#BBF7D0] rounded-full px-3 py-1 text-[13px] font-medium text-[#059669]">{lifePath}號人</div>
            <div className="text-[#CCC] text-[10px]">·</div>
            <div className="bg-white border border-[#BBF7D0] rounded-full px-3 py-1 text-[13px] font-medium text-[#059669]">{zodiac}</div>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-[#DCFCE7] text-[#059669] text-[10px] px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        {/* URL */}
        <div className="text-[9px] text-[#CCC] tracking-wider self-end">wumingai.app</div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex items-center gap-2 bg-[#059669] text-white rounded-xl px-5 py-2.5 text-[13px] font-medium active:opacity-80 transition-opacity disabled:opacity-60"
      >
        {downloading ? '生成中...' : '💾 儲存卡片'}
      </button>
      <p className="text-[10px] text-[#AAA]">儲存後分享到 IG / Line</p>
    </div>
  )
}
