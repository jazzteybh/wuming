import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const ELEMENT_EMOJI: Record<string, string> = {
  木: '🌿', 火: '🔥', 土: '🌍', 金: '⚡', 水: '💧'
}
const ELEMENT_LUCKY_COLORS: Record<string, { colors: string[]; hex: string[] }> = {
  木: { colors: ['綠色','青色'], hex: ['#16A34A','#0891B2'] },
  火: { colors: ['紅色','橙色'], hex: ['#DC2626','#EA580C'] },
  土: { colors: ['黃色','棕色'], hex: ['#CA8A04','#92400E'] },
  金: { colors: ['白色','金色'], hex: ['#9CA3AF','#D97706'] },
  水: { colors: ['黑色','深藍色'], hex: ['#1F2937','#1D4ED8'] },
}

function formatReadingHtml(reading: string): string {
  if (!reading) return ''
  // Attach numbered items to their bold sub-headers
  let html = reading.replace(/(\d+)\.\s*\*\*(.+?)\*\*/g, '<br/><strong style="color:#0D9488;">$1. $2</strong>')
  // Remaining bold → styled
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#0D9488;">$1</strong>')
  // Main section headers (lines that are just a bold title) → h3
  html = html.replace(/<strong style="color:#0D9488;">(性格天賦|職涯方向|2026年運勢|成長方向|生命數字[^<]*)<\/strong>/g,
    '<h3 style="font-size:15px;font-weight:600;color:#0D9488;margin:24px 0 6px;">$1</h3>')
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p style="font-size:14px;color:#444;line-height:1.8;margin:6px 0;">')
  html = html.replace(/\n/g, '<br/>')
  return `<p style="font-size:14px;color:#444;line-height:1.8;margin:6px 0;">${html}</p>`
}

export async function POST(req: Request) {
  const { email, name, reading, bazi, lifePath, lifePathInfo } = await req.json()

  if (!email || !name) {
    return Response.json({ error: '缺少必要資料' }, { status: 400 })
  }

  const dayStemElement = bazi?.dayStem ? { 甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水' }[bazi.dayStem as string] || '' : ''
  const luckyColors = dayStemElement ? ELEMENT_LUCKY_COLORS[dayStemElement] : null
  const elementEmoji = dayStemElement ? ELEMENT_EMOJI[dayStemElement] : '✦'

  const identityHtml = bazi ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
      <tr>
        <td width="48%" style="background:#F0FDF9;border:1px solid #CCFBF1;border-radius:12px;padding:14px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:4px;">五行命格</div>
          <div style="font-size:20px;margin-bottom:4px;">${elementEmoji}</div>
          <div style="font-size:15px;font-weight:600;color:#0F2027;">${dayStemElement}命人</div>
          <div style="font-size:12px;color:#888;margin-top:2px;">${bazi.dayStem}${dayStemElement}日主</div>
        </td>
        <td width="4%"></td>
        <td width="48%" style="background:#F0FDF9;border:1px solid #CCFBF1;border-radius:12px;padding:14px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:4px;">生命數字</div>
          <div style="font-size:28px;font-weight:600;color:#0D9488;line-height:1;">${lifePath}</div>
          <div style="font-size:13px;font-weight:500;color:#0F2027;margin-top:4px;">${lifePathInfo?.title || ''}</div>
        </td>
      </tr>
      <tr><td colspan="3" style="height:8px;"></td></tr>
      <tr>
        <td width="48%" style="background:#F0FDF9;border:1px solid #CCFBF1;border-radius:12px;padding:14px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:6px;">八字四柱</div>
          <div style="display:flex;gap:6px;">
            ${[
              { label: '年柱', val: bazi.year.stem + bazi.year.branch },
              { label: '月柱', val: bazi.month.stem + bazi.month.branch },
              { label: '日柱', val: bazi.day.stem + bazi.day.branch },
              ...(bazi.hour ? [{ label: '時柱', val: bazi.hour.stem + bazi.hour.branch }] : []),
            ].map(p => `<span style="text-align:center;display:inline-block;background:white;border:1px solid #CCFBF1;border-radius:6px;padding:4px 8px;font-size:13px;font-weight:600;color:#0F2027;">${p.val}<br/><span style="font-size:9px;color:#AAA;font-weight:400;">${p.label}</span></span>`).join('')}
          </div>
        </td>
        <td width="4%"></td>
        <td width="48%" style="background:#F0FDF9;border:1px solid #CCFBF1;border-radius:12px;padding:14px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:6px;">幸運色</div>
          ${luckyColors ? `
            <div style="display:flex;gap:6px;margin-bottom:4px;">
              ${luckyColors.hex.map(h => `<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${h};"></span>`).join('')}
            </div>
            <div style="font-size:13px;color:#0F2027;font-weight:500;">${luckyColors.colors.join('・')}</div>
          ` : ''}
        </td>
      </tr>
    </table>
  ` : ''

  const upsellHtml = `
    <div style="background:#F0FDF9;border:1px solid #CCFBF1;border-radius:14px;padding:20px;margin-top:32px;">
      <p style="font-size:15px;font-weight:600;color:#0F2027;margin:0 0 4px;">你的命盤還藏著更多</p>
      <p style="font-size:12px;color:#888;margin:0 0 16px;">升級 悟明 Pro，把命盤變成行動指南</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          ['📅', '知道哪個月該出手', '流年逐月分析，掌握你的黃金時機'],
          ['💼', '找到真正適合你的職涯路', '深度命格職業相容性分析'],
          ['❤️', '感情與合作的最佳時機', '合盤相容性 + 關係推進時機'],
        ].map(([icon, title, desc]) => `
          <tr>
            <td width="32" style="vertical-align:top;padding-bottom:12px;">
              <span style="font-size:18px;">${icon}</span>
            </td>
            <td style="vertical-align:top;padding-bottom:12px;padding-left:8px;">
              <div style="font-size:13px;font-weight:500;color:#0F2027;">${title}</div>
              <div style="font-size:11px;color:#888;">${desc}</div>
            </td>
          </tr>
        `).join('')}
      </table>
      <a href="https://wumingai.app" style="display:block;text-align:center;background:#0D9488;color:white;text-decoration:none;padding:12px;border-radius:10px;font-size:14px;font-weight:600;margin-top:4px;">
        解鎖完整命盤分析 →
      </a>
      <p style="text-align:center;font-size:11px;color:#AAA;margin:8px 0 0;">月繳 NTD $149 · 年繳 NTD $1,290（省44%）</p>
    </div>
  `

  try {
    await resend.emails.send({
      from: '悟明 <onboarding@resend.dev>',
      to: email,
      subject: `${name}，你的完整命盤解讀 ✦`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0F2027;">
          <h1 style="font-size:24px;font-weight:500;margin-bottom:4px;">
            悟<span style="color:#0D9488;">明</span>
          </h1>
          <p style="font-size:12px;color:#AAA;margin:0 0 24px;">讀懂自己，導航人生</p>

          <p style="font-size:16px;color:#0F2027;margin-bottom:4px;">嗨 ${name}，</p>
          <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:0;">
            以下是你的完整命盤解讀，請收藏這封信，隨時回來查看。
          </p>

          ${identityHtml}

          <div style="margin-top:8px;">
            ${formatReadingHtml(reading)}
          </div>

          ${upsellHtml}

          <div style="margin-top:32px;padding-top:20px;border-top:1px solid #F0F0F0;">
            <a href="https://wumingai.app" style="display:inline-block;background:#F0FDF9;color:#0D9488;text-decoration:none;padding:10px 20px;border-radius:10px;font-size:13px;border:1px solid #CCFBF1;">
              返回悟明重新解讀
            </a>
          </div>

          <p style="font-size:11px;color:#CCC;margin-top:24px;line-height:1.6;">
            © 2026 悟明 · 解讀由AI生成，僅供參考，不構成專業建議<br/>
            如不想收到此類郵件，請回覆此信告知。
          </p>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error(err)
    return Response.json({ error: '郵件發送失敗' }, { status: 500 })
  }
}
