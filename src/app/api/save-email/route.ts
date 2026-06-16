import { Resend } from 'resend'
import { getZodiac, getChineseZodiac, ELEMENT_LUCKY_COLORS, ELEMENT_EMOJI, ELEMENT_CRYSTALS } from '@/lib/bazi'

const resend = new Resend(process.env.RESEND_API_KEY)

const STEM_ELEMENT: Record<string, string> = {
  甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'
}

function extractCareerKeywords(reading: string): string[] {
  const match = reading.match(/\*\*職涯關鍵字\*\*\s*\n?([\s\S]*?)(?=\n\n|\n\*\*|$)/)
  if (!match) return []
  return match[1].split('·').map(s => s.trim()).filter(Boolean).slice(0, 4)
}

function parseSections(text: string, sectionNames: string[]): Record<string, string> {
  const sections: Record<string, string> = {}
  const pattern = new RegExp(`\\*\\*(${sectionNames.join('|')})\\*\\*([\\s\\S]*?)(?=\\*\\*(?:${sectionNames.join('|')})|$)`, 'g')
  let match
  while ((match = pattern.exec(text)) !== null) {
    const title = match[1].trim()
    sections[title] = match[2].trim()
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#059669;">$1</strong>')
      .replace(/\n\n/g, '</p><p style="font-size:14px;color:#555;line-height:1.8;margin:4px 0;">')
      .replace(/\n/g, '<br/>')
  }
  return sections
}

function sectionHtml(title: string, content: string, icon = ''): string {
  return `<div style="margin:14px 0;"><p style="font-size:13px;font-weight:600;color:#059669;margin:0 0 5px;">${icon ? icon + ' ' : ''}${title}</p><p style="font-size:14px;color:#555;line-height:1.7;margin:0;">${content}</p></div>`
}

function formatCareerEmail(reading: string): string {
  const SECTIONS = ['天賦優勢', '最適職涯路線', '工作風格', '職涯黃金期', '需要注意的職場盲點', '給你的職涯建議']
  const ICONS: Record<string, string> = { '天賦優勢': '⚡', '最適職涯路線': '🧭', '工作風格': '🎯', '職涯黃金期': '✦', '需要注意的職場盲點': '🔍', '給你的職涯建議': '💬' }
  const parsed = parseSections(reading, SECTIONS)
  return SECTIONS.filter(s => parsed[s]).map(s => sectionHtml(s, parsed[s], ICONS[s])).join('<hr style="border:none;border-top:1px solid #F0F0F0;margin:6px 0;"/>')
}

function formatCompatibilityEmail(reading: string, name1: string, name2: string, score: number): string {
  const SECTIONS = ['合盤總覽', '你們的天然默契', '互補與成長', '相處的挑戰', '最佳合作模式', '給你們的話']
  const parsed = parseSections(reading, SECTIONS)
  const scoreBar = `<div style="background:#FFF1F2;border:1px solid #FECDD3;border-radius:12px;padding:16px;margin:0 0 14px;text-align:center;"><p style="font-size:11px;color:#E11D48;margin:0 0 4px;">${name1} × ${name2}</p><p style="font-size:36px;font-weight:700;color:#E11D48;margin:0 0 4px;line-height:1;">${score}<span style="font-size:14px;color:#888;"> / 100</span></p><div style="background:#FECDD3;border-radius:4px;height:5px;margin:8px 0 0;"><div style="background:#E11D48;border-radius:4px;height:5px;width:${score}%;"></div></div></div>`
  return scoreBar + SECTIONS.filter(s => parsed[s]).map(s => sectionHtml(s, parsed[s])).join('<hr style="border:none;border-top:1px solid #F0F0F0;margin:6px 0;"/>')
}

interface MonthData { month: string; theme: string; energy: number; desc: string; action: string }

function formatMonthlyEmail(monthly: MonthData[]): string {
  if (!monthly?.length) return ''
  const dots = (n: number) => [1,2,3,4,5].map(i =>
    `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${i <= n ? '#059669' : '#E5E7EB'};margin-right:2px;"></span>`
  ).join('')
  const rows = monthly.map(m => `<tr><td style="padding:7px 5px;border-bottom:1px solid #F0F0F0;font-size:11px;color:#888;white-space:nowrap;">${m.month}</td><td style="padding:7px 5px;border-bottom:1px solid #F0F0F0;font-size:12px;font-weight:500;color:#0F2027;">${m.theme}</td><td style="padding:7px 5px;border-bottom:1px solid #F0F0F0;">${dots(m.energy)}</td><td style="padding:7px 5px;border-bottom:1px solid #F0F0F0;font-size:10px;color:#059669;">${m.action}</td></tr>`).join('')
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:14px 0;"><tr style="background:#F0FDF4;"><td style="padding:5px;font-size:10px;color:#AAA;">月份</td><td style="padding:5px;font-size:10px;color:#AAA;">主題</td><td style="padding:5px;font-size:10px;color:#AAA;">能量</td><td style="padding:5px;font-size:10px;color:#AAA;">行動</td></tr>${rows}</table>`
}

function formatReadingEmail(reading: string): string {
  if (!reading) return ''
  const SHOW = ['性格天賦', '2026年運勢']
  const ALL = ['性格天賦', '職涯方向', '2026年運勢', '成長方向', '生命數字', '職涯關鍵字']
  const parsed = parseSections(reading, ALL)
  return SHOW.filter(s => parsed[s]).map(s => sectionHtml(s, parsed[s])).join('<hr style="border:none;border-top:1px solid #F0F0F0;margin:6px 0;"/>')
}

// Text-based logo — SVG images are blocked by Gmail
const logoHtml = `<table cellpadding="0" cellspacing="0" style="margin-bottom:20px;"><tr><td style="padding-right:10px;vertical-align:middle;"><div style="width:36px;height:36px;background:#059669;border-radius:10px;text-align:center;line-height:36px;font-size:18px;color:white;">✦</div></td><td style="vertical-align:middle;"><div style="font-size:17px;font-weight:500;color:#059669;line-height:1.2;">悟明</div><div style="font-size:11px;color:#AAA;line-height:1.4;">讀懂自己，導航人生</div></td></tr></table>`

export async function POST(req: Request) {
  const { email, name, date, type = 'reading', reading, monthly, bazi, lifePath, lifePathInfo, name1, name2, score } = await req.json()

  if (!email || !name) {
    return Response.json({ error: '缺少必要資料' }, { status: 400 })
  }

  const dayStemElement = bazi?.dayStem ? STEM_ELEMENT[bazi.dayStem as string] || '' : ''
  const luckyColors = dayStemElement ? ELEMENT_LUCKY_COLORS[dayStemElement] : null
  const elementEmoji = dayStemElement ? ELEMENT_EMOJI[dayStemElement] : '✦'
  const crystal = dayStemElement ? ELEMENT_CRYSTALS[dayStemElement] : null
  const zodiac = date ? getZodiac(date) : null
  const chineseZodiac = date ? getChineseZodiac(date) : null
  const careerKeywords = (type === 'reading' && reading) ? extractCareerKeywords(reading) : []

  const pillars = bazi ? [
    { label: '年柱', stem: bazi.year.stem, branch: bazi.year.branch, isDay: false },
    { label: '月柱', stem: bazi.month.stem, branch: bazi.month.branch, isDay: false },
    { label: '日柱', stem: bazi.day.stem, branch: bazi.day.branch, isDay: true },
    ...(bazi.hour ? [{ label: '時柱', stem: bazi.hour.stem, branch: bazi.hour.branch, isDay: false }] : []),
  ] : []

  const subjects: Record<string, string> = {
    reading: `${name} 的天賦報告 ✦`,
    career: `${name} 的職涯天賦分析 💼`,
    monthly: `${name} 的未來12個月運程 📅`,
    compatibility: `${name1 || name} 和 ${name2 || ''} 的緣分指數 ☯`,
  }

  const pageTitles: Record<string, string> = {
    reading: '完整天賦報告',
    career: '職涯天賦分析',
    monthly: '未來12個月運程',
    compatibility: '緣分指數報告',
  }

  let mainContent = ''
  if (type === 'career') {
    mainContent = formatCareerEmail(reading)
  } else if (type === 'compatibility') {
    mainContent = formatCompatibilityEmail(reading, name1 || name, name2 || '', score || 0)
  } else if (type === 'monthly') {
    mainContent = formatMonthlyEmail(monthly)
  } else {
    mainContent = formatReadingEmail(reading)
  }

  // Identity cards — only shown for reading type (has bazi data)
  const identityHtml = (type === 'reading' && bazi) ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0 10px;">
      <tr>
        <td width="32%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px;vertical-align:top;">
          <div style="font-size:9px;color:#AAA;margin-bottom:3px;">五行命格</div>
          <div style="font-size:20px;line-height:1.2;">${elementEmoji}</div>
          <div style="font-size:14px;font-weight:600;color:#0F2027;margin-top:3px;">${dayStemElement}命人</div>
          <div style="font-size:10px;color:#888;margin-top:1px;">${bazi.dayStem}${dayStemElement}日主</div>
        </td>
        <td width="2%"></td>
        <td width="32%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px;vertical-align:top;">
          <div style="font-size:9px;color:#AAA;margin-bottom:3px;">生命數字</div>
          <div style="font-size:26px;font-weight:700;color:#059669;line-height:1.1;">${lifePath}</div>
          <div style="font-size:11px;font-weight:500;color:#0F2027;margin-top:3px;">${lifePathInfo?.title || ''}</div>
        </td>
        <td width="2%"></td>
        <td width="32%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px;vertical-align:top;">
          <div style="font-size:9px;color:#AAA;margin-bottom:3px;">星座</div>
          <div style="font-size:20px;line-height:1.2;">${zodiac?.emoji || ''}</div>
          <div style="font-size:14px;font-weight:600;color:#0F2027;margin-top:3px;">${zodiac?.sign || ''}</div>
          <div style="font-size:10px;color:#888;margin-top:1px;">${chineseZodiac?.emoji || ''}屬${chineseZodiac?.animal || ''}</div>
        </td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0;">
      <tr>
        <td width="56%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px;vertical-align:top;">
          <div style="font-size:9px;color:#AAA;margin-bottom:6px;">八字四柱</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              ${pillars.map(p => `<td style="width:25%;text-align:center;padding:0 2px;"><div style="font-size:9px;color:#AAA;margin-bottom:3px;">${p.label}</div><div style="background:${p.isDay ? '#059669' : 'white'};border:1px solid #BBF7D0;border-radius:5px 5px 0 0;padding:5px 2px;text-align:center;"><span style="font-size:15px;font-weight:600;color:${p.isDay ? 'white' : '#059669'};">${p.stem}</span></div><div style="background:white;border:1px solid #BBF7D0;border-top:none;border-radius:0 0 5px 5px;padding:5px 2px;text-align:center;"><span style="font-size:15px;font-weight:600;color:#0F2027;">${p.branch}</span></div></td>`).join('')}
            </tr>
          </table>
        </td>
        <td width="4%"></td>
        <td width="40%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px;vertical-align:top;">
          <div style="font-size:9px;color:#AAA;margin-bottom:6px;">能量寶石 &amp; 幸運色</div>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:5px;"><tr><td style="padding-right:5px;vertical-align:middle;"><div style="width:12px;height:12px;border-radius:50%;background:${crystal?.color || '#059669'};"></div></td><td style="vertical-align:middle;"><span style="font-size:12px;font-weight:500;color:#0F2027;">${crystal?.name || ''}</span></td></tr></table>
          ${luckyColors ? `<table cellpadding="0" cellspacing="0" style="margin-bottom:3px;"><tr>${luckyColors.hex.map((h: string) => `<td style="padding-right:3px;"><div style="width:13px;height:13px;border-radius:50%;background:${h};"></div></td>`).join('')}</tr></table><div style="font-size:10px;color:#888;">${luckyColors.colors.join(' · ')}</div>` : ''}
        </td>
      </tr>
    </table>

    ${careerKeywords.length > 0 ? `
    <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px;margin:10px 0;">
      <div style="font-size:9px;color:#AAA;margin-bottom:6px;">職涯方向</div>
      <table cellpadding="0" cellspacing="0"><tr>${careerKeywords.map(k => `<td style="padding-right:6px;padding-bottom:4px;"><span style="display:inline-block;background:white;border:1px solid #BBF7D0;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:500;color:#059669;">${k}</span></td>`).join('')}</tr></table>
      <div style="margin-top:8px;"><a href="https://wumingai.app/career?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}" style="font-size:11px;color:#059669;text-decoration:none;">💼 查看完整職涯分析 →</a></div>
    </div>` : ''}
  ` : ''

  const shareUrl = type === 'reading'
    ? `https://wumingai.app/reading?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}`
    : type === 'career'
    ? `https://wumingai.app/career?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}`
    : type === 'monthly'
    ? `https://wumingai.app/monthly?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}`
    : `https://wumingai.app/compatibility`

  const ctaHtml = `
    <div style="margin-top:24px;border-top:1px solid #F0F0F0;padding-top:20px;">

      <!-- Save share card CTA -->
      <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:14px;padding:16px;text-align:center;margin-bottom:16px;">
        <div style="font-size:22px;margin-bottom:6px;">🪪</div>
        <p style="font-size:13px;font-weight:600;color:#0F2027;margin:0 0 4px;">儲存你的天賦卡片</p>
        <p style="font-size:11px;color:#888;margin:0 0 12px;line-height:1.5;">點擊下方按鈕，回到解讀頁面儲存專屬天賦卡片，分享給朋友或發佈到 IG</p>
        <a href="${shareUrl}" style="display:inline-block;background:#059669;color:white;text-decoration:none;padding:10px 22px;border-radius:10px;font-size:13px;font-weight:600;">✦ 查看並下載天賦卡片</a>
      </div>

      <!-- Share buttons -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
        <tr>
          <td width="48%" style="text-align:center;">
            <a href="https://www.instagram.com/wuming.app" style="display:block;background:#FDF2F8;border:1px solid #FBCFE8;border-radius:10px;padding:10px 4px;text-decoration:none;">
              <div style="font-size:16px;margin-bottom:3px;">📸</div>
              <div style="font-size:11px;font-weight:600;color:#C13584;">追蹤 @wuming.app</div>
            </a>
          </td>
          <td width="4%"></td>
          <td width="48%" style="text-align:center;">
            <a href="https://wumingai.app" style="display:block;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px 4px;text-decoration:none;">
              <div style="font-size:16px;margin-bottom:3px;">🔗</div>
              <div style="font-size:11px;font-weight:600;color:#059669;">分享給朋友</div>
            </a>
          </td>
        </tr>
      </table>

      <!-- 3 feature buttons -->
      <p style="font-size:11px;color:#AAA;margin:0 0 8px;text-align:center;">還想探索更多？</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        <tr>
          <td width="31%" style="text-align:center;"><a href="https://wumingai.app/career?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}" style="display:block;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px 4px;text-decoration:none;"><div style="font-size:16px;margin-bottom:3px;">💼</div><div style="font-size:11px;font-weight:600;color:#059669;">職涯天賦分析</div></a></td>
          <td width="3%"></td>
          <td width="31%" style="text-align:center;"><a href="https://wumingai.app/monthly?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}" style="display:block;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px 4px;text-decoration:none;"><div style="font-size:16px;margin-bottom:3px;">📅</div><div style="font-size:11px;font-weight:600;color:#059669;">每月運程解讀</div></a></td>
          <td width="3%"></td>
          <td width="31%" style="text-align:center;"><a href="https://wumingai.app/compatibility" style="display:block;background:#FFF1F2;border:1px solid #FECDD3;border-radius:10px;padding:10px 4px;text-decoration:none;"><div style="font-size:16px;margin-bottom:3px;">☯</div><div style="font-size:11px;font-weight:600;color:#E11D48;">緣分指數測試</div></a></td>
        </tr>
      </table>

      <!-- Articles -->
      <p style="font-size:11px;color:#AAA;margin:0 0 8px;">命理知識 × 自我探索</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding-bottom:6px;"><a href="https://wumingai.app/blog/bazi-day-master-guide" style="display:block;background:#FAFAF7;border:1px solid #E5E5E0;border-radius:8px;padding:8px 10px;text-decoration:none;font-size:12px;color:#0F2027;">🌳 八字日主完整解析：10種日主性格與天賦</a></td></tr>
        <tr><td style="padding-bottom:6px;"><a href="https://wumingai.app/blog/bazi-career-direction" style="display:block;background:#FAFAF7;border:1px solid #E5E5E0;border-radius:8px;padding:8px 10px;text-decoration:none;font-size:12px;color:#0F2027;">💼 迷茫不知道做什麼工作？用八字找方向</a></td></tr>
        <tr><td style="padding-bottom:6px;"><a href="https://wumingai.app/blog/2026-bazi-day-master-fortune" style="display:block;background:#FAFAF7;border:1px solid #E5E5E0;border-radius:8px;padding:8px 10px;text-decoration:none;font-size:12px;color:#0F2027;">🔮 2026年各日主運勢完整解析</a></td></tr>
      </table>
    </div>

    <p style="font-size:10px;color:#CCC;margin-top:20px;line-height:1.6;">© 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議<br/>如不想收到此類郵件，請回覆此信告知。</p>`

  try {
    await resend.emails.send({
      from: '悟明 App - 讀懂自己 導航人生 <noreply@wumingai.app>',
      to: email,
      subject: subjects[type] || subjects.reading,
      html: `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:28px 20px;color:#0F2027;">
        ${logoHtml}
        <p style="font-size:15px;color:#0F2027;margin:0 0 3px;">嗨 ${type === 'compatibility' ? (name1 || name) : name}，</p>
        <p style="font-size:13px;color:#555;line-height:1.6;margin:0 0 14px;">以下是你的${pageTitles[type]}，收藏這封信隨時查看。</p>
        ${identityHtml}
        ${mainContent}
        ${ctaHtml}
      </div>`,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error(err)
    return Response.json({ error: '郵件發送失敗' }, { status: 500 })
  }
}
