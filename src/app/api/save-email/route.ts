import { Resend } from 'resend'
import { getZodiac, getChineseZodiac, ZODIAC_BEST_PARTNER, CHINESE_ZODIAC_BEST_PARTNER, DAY_STEM_BEST_PARTNER, ELEMENT_LUCKY_COLORS, ELEMENT_EMOJI, ELEMENT_CRYSTALS } from '@/lib/bazi'
import { LIFE_PATH_BEST_PARTNER } from '@/lib/numerology'

const resend = new Resend(process.env.RESEND_API_KEY)

const STEM_ELEMENT: Record<string, string> = {
  甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'
}

function extractCareerKeywords(reading: string): string[] {
  const match = reading.match(/\*\*職涯關鍵字\*\*\s*\n?([\s\S]*?)(?=\n\n|\n\*\*|$)/)
  if (!match) return []
  return match[1].split('·').map(s => s.trim()).filter(Boolean).slice(0, 4)
}

function formatReadingHtml(reading: string): string {
  if (!reading) return ''
  // Only show 性格天賦 + 2026年運勢 in email to stay under Gmail 102KB clip limit
  const SHOW_SECTIONS = ['性格天賦', '2026年運勢']
  const ALL_SECTIONS = ['性格天賦', '職涯方向', '2026年運勢', '成長方向', '生命數字', '職涯關鍵字']
  const pattern = new RegExp(`\\*\\*(${ALL_SECTIONS.join('|')}[^*]*)\\*\\*([\\s\\S]*?)(?=\\*\\*(?:${ALL_SECTIONS.join('|')})|$)`, 'g')
  let html = ''
  let match
  while ((match = pattern.exec(reading)) !== null) {
    const title = match[1].trim()
    if (!SHOW_SECTIONS.some(s => title.startsWith(s))) continue
    const content = match[2].trim()
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#059669;">$1</strong>')
      .replace(/\n\n/g, '</p><p style="font-size:14px;color:#555;line-height:1.8;margin:4px 0;">')
      .replace(/\n/g, '<br/>')
    html += `<h3 style="font-size:14px;font-weight:600;color:#059669;margin:20px 0 6px;padding:0;">${title}</h3>`
    html += `<p style="font-size:14px;color:#555;line-height:1.8;margin:4px 0;">${content}</p>`
  }
  return html
}

export async function POST(req: Request) {
  const { email, name, date, reading, bazi, lifePath, lifePathInfo } = await req.json()

  if (!email || !name) {
    return Response.json({ error: '缺少必要資料' }, { status: 400 })
  }

  const dayStemElement = bazi?.dayStem ? STEM_ELEMENT[bazi.dayStem as string] || '' : ''
  const luckyColors = dayStemElement ? ELEMENT_LUCKY_COLORS[dayStemElement] : null
  const elementEmoji = dayStemElement ? ELEMENT_EMOJI[dayStemElement] : '✦'
  const crystal = dayStemElement ? ELEMENT_CRYSTALS[dayStemElement] : null
  const bestPartner = bazi?.dayStem ? DAY_STEM_BEST_PARTNER[bazi.dayStem as string] : null
  const zodiac = date ? getZodiac(date) : null
  const chineseZodiac = date ? getChineseZodiac(date) : null
  const zodiacPartner = zodiac ? ZODIAC_BEST_PARTNER[zodiac.sign] : null
  const chineseZodiacPartner = chineseZodiac ? CHINESE_ZODIAC_BEST_PARTNER[chineseZodiac.animal] : null
  const lifePathPartner = lifePath ? LIFE_PATH_BEST_PARTNER[lifePath as number] : null
  const careerKeywords = reading ? extractCareerKeywords(reading) : []

  const pillars = bazi ? [
    { label: '年柱', stem: bazi.year.stem, branch: bazi.year.branch, isDay: false },
    { label: '月柱', stem: bazi.month.stem, branch: bazi.month.branch, isDay: false },
    { label: '日柱', stem: bazi.day.stem, branch: bazi.day.branch, isDay: true },
    ...(bazi.hour ? [{ label: '時柱', stem: bazi.hour.stem, branch: bazi.hour.branch, isDay: false }] : []),
  ] : []

  const identityHtml = bazi ? `
    <!-- Row 1: 五行 / 生命數字 / 星座 -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 12px;">
      <tr>
        <td width="32%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:4px;">五行命格</div>
          <div style="font-size:22px;line-height:1.3;">${elementEmoji}</div>
          <div style="font-size:15px;font-weight:600;color:#0F2027;margin-top:4px;">${dayStemElement}命人</div>
          <div style="font-size:11px;color:#888;margin-top:2px;">${bazi.dayStem}${dayStemElement}日主</div>
        </td>
        <td width="2%"></td>
        <td width="32%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:4px;">生命數字</div>
          <div style="font-size:28px;font-weight:700;color:#059669;line-height:1.2;">${lifePath}</div>
          <div style="font-size:12px;font-weight:500;color:#0F2027;margin-top:4px;">${lifePathInfo?.title || ''}</div>
        </td>
        <td width="2%"></td>
        <td width="32%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:4px;">西洋星座</div>
          <div style="font-size:22px;line-height:1.3;">${zodiac?.emoji || ''}</div>
          <div style="font-size:15px;font-weight:600;color:#0F2027;margin-top:4px;">${zodiac?.sign || ''}</div>
          <div style="font-size:11px;color:#888;margin-top:2px;">${chineseZodiac?.emoji || ''}屬${chineseZodiac?.animal || ''}</div>
        </td>
      </tr>
    </table>

    <!-- Row 2: 八字四柱 + 能量寶石 -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0;">
      <tr>
        <td width="55%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:8px;">八字四柱</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              ${pillars.map(p => `
              <td style="width:25%;text-align:center;padding:0 2px;">
                <div style="font-size:10px;color:#AAA;margin-bottom:4px;">${p.label}</div>
                <div style="background:${p.isDay ? '#059669' : 'white'};border:1px solid #BBF7D0;border-radius:6px 6px 0 0;padding:6px 4px;text-align:center;">
                  <span style="font-size:16px;font-weight:600;color:${p.isDay ? 'white' : '#059669'};">${p.stem}</span>
                </div>
                <div style="background:white;border:1px solid #BBF7D0;border-top:none;border-radius:0 0 6px 6px;padding:6px 4px;text-align:center;">
                  <span style="font-size:16px;font-weight:600;color:#0F2027;">${p.branch}</span>
                </div>
              </td>`).join('')}
            </tr>
          </table>
        </td>
        <td width="4%"></td>
        <td width="41%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:8px;">能量寶石 &amp; 幸運色</div>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:6px;">
            <tr>
              <td style="padding-right:6px;vertical-align:middle;">
                <div style="width:14px;height:14px;border-radius:50%;background:${crystal?.color || '#059669'};"></div>
              </td>
              <td style="vertical-align:middle;">
                <span style="font-size:13px;font-weight:500;color:#0F2027;">${crystal?.name || ''}</span>
              </td>
            </tr>
          </table>
          ${luckyColors ? `
          <table cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
            <tr>
              ${luckyColors.hex.map((h: string) => `<td style="padding-right:4px;"><div style="width:16px;height:16px;border-radius:50%;background:${h};"></div></td>`).join('')}
            </tr>
          </table>
          <div style="font-size:11px;color:#888;">${luckyColors.colors.join(' · ')}</div>
          ` : ''}
        </td>
      </tr>
    </table>

    ${careerKeywords.length > 0 ? `
    <!-- 職涯方向 lite -->
    <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;margin:12px 0;">
      <div style="font-size:10px;color:#AAA;margin-bottom:8px;">職涯方向</div>
      <div>
        ${careerKeywords.map(k => `<span style="display:inline-block;white-space:nowrap;background:white;border:1px solid #BBF7D0;border-radius:20px;padding:5px 12px;font-size:13px;font-weight:500;color:#059669;margin:0 6px 6px 0;">${k}</span>`).join('')}
      </div>
      <div style="margin-top:10px;">
        <a href="https://wumingai.app/career?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}" style="font-size:12px;color:#059669;text-decoration:none;">💼 查看完整職涯分析 →</a>
      </div>
    </div>
    ` : ''}

    <!-- 緣分指數測試 -->
    <div style="background:white;border:1px solid #E6F7F5;border-radius:12px;padding:14px;margin:12px 0;">
      <div style="font-size:11px;color:#059669;font-weight:500;letter-spacing:1px;margin-bottom:10px;">緣分指數測試</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="48%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:10px;vertical-align:top;">
            <div style="font-size:9px;color:#059669;font-weight:500;margin-bottom:4px;">五行配對</div>
            <div style="font-size:10px;color:#AAA;margin-bottom:2px;">你：${dayStemElement}命人</div>
            <div style="font-size:14px;font-weight:600;color:#0F2027;margin-bottom:2px;">${bestPartner?.stem || ''}${bestPartner?.element || ''}人</div>
            <div style="font-size:10px;color:#888;">${bestPartner?.desc || ''}</div>
          </td>
          <td width="4%"></td>
          <td width="48%" style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:10px;vertical-align:top;">
            <div style="font-size:9px;color:#D97706;font-weight:500;margin-bottom:4px;">生命數字</div>
            <div style="font-size:10px;color:#AAA;margin-bottom:2px;">你：${lifePath} 號人</div>
            <div style="font-size:14px;font-weight:600;color:#0F2027;margin-bottom:2px;">${lifePathPartner?.num || ''} 號人</div>
            <div style="font-size:10px;color:#888;">${lifePathPartner?.desc || ''}</div>
          </td>
        </tr>
        <tr><td colspan="3" style="height:6px;"></td></tr>
        <tr>
          <td width="48%" style="background:#F5F3FF;border:1px solid #DDD6FE;border-radius:10px;padding:10px;vertical-align:top;">
            <div style="font-size:9px;color:#7C3AED;font-weight:500;margin-bottom:4px;">西洋星座</div>
            <div style="font-size:10px;color:#AAA;margin-bottom:2px;">你：${zodiac?.sign || ''}</div>
            <div style="font-size:14px;font-weight:600;color:#0F2027;margin-bottom:2px;">${zodiacPartner?.sign || ''}</div>
            <div style="font-size:10px;color:#888;">${zodiacPartner?.desc || ''}</div>
          </td>
          <td width="4%"></td>
          <td width="48%" style="background:#FFF1F2;border:1px solid #FECDD3;border-radius:10px;padding:10px;vertical-align:top;">
            <div style="font-size:9px;color:#E11D48;font-weight:500;margin-bottom:4px;">生肖配對</div>
            <div style="font-size:10px;color:#AAA;margin-bottom:2px;">你：屬${chineseZodiac?.animal || ''}</div>
            <div style="font-size:14px;font-weight:600;color:#0F2027;margin-bottom:2px;">屬${chineseZodiacPartner?.animal || ''}</div>
            <div style="font-size:10px;color:#888;">${chineseZodiacPartner?.desc || ''}</div>
          </td>
        </tr>
      </table>
    </div>
  ` : ''

  const sectionsHtml = bazi ? `
    <div style="margin-top:28px;">
      <p style="font-size:12px;color:#AAA;margin:0 0 12px;text-align:center;">還想探索更多？</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="31%" style="text-align:center;">
            <a href="https://wumingai.app/career?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}" style="display:block;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px 8px;text-decoration:none;">
              <div style="font-size:18px;margin-bottom:4px;">💼</div>
              <div style="font-size:12px;font-weight:600;color:#059669;">職涯分析</div>
              <div style="font-size:10px;color:#888;margin-top:2px;">深度職涯天賦</div>
            </a>
          </td>
          <td width="3%"></td>
          <td width="31%" style="text-align:center;">
            <a href="https://wumingai.app/monthly?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}" style="display:block;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px 8px;text-decoration:none;">
              <div style="font-size:18px;margin-bottom:4px;">📅</div>
              <div style="font-size:12px;font-weight:600;color:#059669;">每月運程</div>
              <div style="font-size:10px;color:#888;margin-top:2px;">未來12個月</div>
            </a>
          </td>
          <td width="3%"></td>
          <td width="31%" style="text-align:center;">
            <a href="https://wumingai.app/compatibility" style="display:block;background:#FFF1F2;border:1px solid #FECDD3;border-radius:12px;padding:12px 8px;text-decoration:none;">
              <div style="font-size:18px;margin-bottom:4px;">☯</div>
              <div style="font-size:12px;font-weight:600;color:#E11D48;">緣分指數</div>
              <div style="font-size:10px;color:#888;margin-top:2px;">測試你們的緣分</div>
            </a>
          </td>
        </tr>
      </table>
    </div>
  ` : ''

  const upsellHtml = `
    <div style="background:#0F2027;border-radius:14px;padding:20px;margin-top:28px;text-align:center;">
      <p style="font-size:14px;color:#AAA;margin:0 0 6px;">喜歡這份解讀？</p>
      <p style="font-size:16px;font-weight:600;color:white;margin:0 0 16px;">分享給你的朋友，讓他們也來讀懂自己</p>
      <a href="https://wumingai.app" style="display:inline-block;background:#059669;color:white;text-decoration:none;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:600;margin-bottom:16px;">
        ✦ 分享悟明
      </a>
      <br/>
      <a href="https://www.instagram.com/wuming.app" style="display:inline-block;background:rgba(193,53,132,0.1);border:1px solid rgba(193,53,132,0.3);border-radius:10px;padding:10px 20px;text-decoration:none;font-size:13px;color:#C13584;margin-top:4px;">
        📸 追蹤 @wuming.app
      </a>
    </div>
  `

  try {
    await resend.emails.send({
      from: '悟明 App - 讀懂自己 導航人生 <noreply@wumingai.app>',
      to: email,
      subject: bazi ? `${name} 的天賦報告 ✦` : `${name} 的悟明解讀報告 ✦`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0F2027;">

          <!-- Header: logo + brand -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            <tr>
              <td style="padding-right:10px;vertical-align:middle;">
                <img src="https://wumingai.app/favicon.svg" width="36" height="36" alt="悟明" style="border-radius:10px;display:block;" />
              </td>
              <td style="vertical-align:middle;">
                <div style="font-size:17px;font-weight:500;color:#059669;line-height:1.2;">悟明</div>
                <div style="font-size:11px;color:#AAA;line-height:1.4;">讀懂自己，導航人生</div>
              </td>
            </tr>
          </table>

          <p style="font-size:16px;color:#0F2027;margin:0 0 4px;">嗨 ${bazi ? name : name.split(' × ')[0]}，</p>
          <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 4px;">
            以下是你的完整天賦報告。<br/>
            收藏這封信，隨時回來查看。
          </p>

          ${identityHtml}

          <div style="margin-top:8px;">
            ${formatReadingHtml(reading)}
          </div>

          ${sectionsHtml}

          ${upsellHtml}

          <div style="margin-top:32px;padding-top:20px;border-top:1px solid #F0F0F0;">
            <a href="https://wumingai.app" style="display:inline-block;background:#F0FDF4;color:#059669;text-decoration:none;padding:10px 20px;border-radius:10px;font-size:13px;border:1px solid #BBF7D0;">
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
