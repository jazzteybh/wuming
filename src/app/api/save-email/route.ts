import { Resend } from 'resend'
import { getZodiac, getChineseZodiac, ZODIAC_BEST_PARTNER, CHINESE_ZODIAC_BEST_PARTNER, DAY_STEM_BEST_PARTNER, ELEMENT_LUCKY_COLORS, ELEMENT_EMOJI, ELEMENT_CRYSTALS } from '@/lib/bazi'
import { LIFE_PATH_BEST_PARTNER } from '@/lib/numerology'

const resend = new Resend(process.env.RESEND_API_KEY)

const STEM_ELEMENT: Record<string, string> = {
  甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'
}

function formatReadingHtml(reading: string): string {
  if (!reading) return ''
  let html = reading.replace(/(\d+)\.\s*\*\*(.+?)\*\*/g, '<br/><strong style="color:#059669;">$1. $2</strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#059669;">$1</strong>')
  html = html.replace(/<strong style="color:#059669;">(性格天賦|職涯方向|2026年運勢|成長方向|生命數字[^<]*)<\/strong>/g,
    '<h3 style="font-size:15px;font-weight:600;color:#059669;margin:24px 0 6px;">$1</h3>')
  html = html.replace(/\n\n/g, '</p><p style="font-size:14px;color:#444;line-height:1.8;margin:6px 0;">')
  html = html.replace(/\n/g, '<br/>')
  return `<p style="font-size:14px;color:#444;line-height:1.8;margin:6px 0;">${html}</p>`
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

  const identityHtml = bazi ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
      <tr>
        <td width="32%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:4px;">五行命格</div>
          <div style="font-size:20px;margin-bottom:4px;">${elementEmoji}</div>
          <div style="font-size:14px;font-weight:600;color:#0F2027;">${dayStemElement}命人</div>
          <div style="font-size:11px;color:#888;margin-top:2px;">${bazi.dayStem}${dayStemElement}日主</div>
        </td>
        <td width="2%"></td>
        <td width="32%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:4px;">生命數字</div>
          <div style="font-size:26px;font-weight:600;color:#059669;line-height:1;">${lifePath}</div>
          <div style="font-size:12px;font-weight:500;color:#0F2027;margin-top:4px;">${lifePathInfo?.title || ''}</div>
        </td>
        <td width="2%"></td>
        <td width="32%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:4px;">西洋星座</div>
          <div style="font-size:20px;margin-bottom:4px;">${zodiac?.emoji || ''}</div>
          <div style="font-size:14px;font-weight:600;color:#0F2027;">${zodiac?.sign || ''}</div>
          <div style="font-size:11px;color:#888;margin-top:2px;">${chineseZodiac?.emoji || ''}屬${chineseZodiac?.animal || ''}</div>
        </td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0;">
      <tr>
        <td width="48%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:6px;">八字四柱</div>
          ${[
            { label: '年柱', val: bazi.year.stem + bazi.year.branch },
            { label: '月柱', val: bazi.month.stem + bazi.month.branch },
            { label: '日柱', val: bazi.day.stem + bazi.day.branch },
            ...(bazi.hour ? [{ label: '時柱', val: bazi.hour.stem + bazi.hour.branch }] : []),
          ].map(p => `<span style="display:inline-block;text-align:center;background:white;border:1px solid #BBF7D0;border-radius:6px;padding:4px 7px;font-size:13px;font-weight:600;color:#0F2027;margin-right:4px;">${p.val}<br/><span style="font-size:9px;color:#AAA;font-weight:400;">${p.label}</span></span>`).join('')}
        </td>
        <td width="4%"></td>
        <td width="48%" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px;vertical-align:top;">
          <div style="font-size:10px;color:#AAA;margin-bottom:6px;">能量寶石 &amp; 幸運色</div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:${crystal?.color || '#059669'};"></span>
            <span style="font-size:13px;font-weight:500;color:#0F2027;">${crystal?.name || ''}</span>
          </div>
          ${luckyColors ? `
            <div style="display:flex;gap:5px;margin-bottom:3px;">
              ${luckyColors.hex.map(h => `<span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:${h};"></span>`).join('')}
            </div>
            <div style="font-size:12px;color:#888;">${luckyColors.colors.join('・')}</div>
          ` : ''}
        </td>
      </tr>
    </table>

    <div style="background:white;border:1px solid #E6F7F5;border-radius:12px;padding:14px;margin:12px 0;">
      <div style="font-size:11px;color:#059669;font-weight:500;letter-spacing:0.06em;margin-bottom:10px;">天作之合</div>
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

  const upsellHtml = `
    <div style="background:#0F2027;border-radius:14px;padding:20px;margin-top:32px;text-align:center;">
      <p style="font-size:14px;color:#AAA;margin:0 0 6px;">喜歡這份解讀？</p>
      <p style="font-size:16px;font-weight:600;color:white;margin:0 0 16px;">分享給你的朋友，讓他們也來讀懂自己</p>
      <a href="https://wumingai.app" style="display:inline-block;background:#059669;color:white;text-decoration:none;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:600;margin-bottom:12px;">
        ✦ 分享悟明
      </a>
      <p style="font-size:12px;color:#AAA;margin:12px 0 0;">追蹤我們的 Instagram 獲取更多自我探索內容</p>
      <a href="https://www.instagram.com/wuming.app" style="font-size:13px;color:#C13584;text-decoration:none;">@wuming.app</a>
    </div>
  `

  try {
    await resend.emails.send({
      from: '悟明 <noreply@wumingai.app>',
      to: email,
      subject: `${name} 的天賦報告 ✦`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0F2027;">
          <h1 style="font-size:24px;font-weight:500;margin-bottom:4px;">
            悟<span style="color:#059669;">明</span>
          </h1>
          <p style="font-size:12px;color:#AAA;margin:0 0 24px;">讀懂自己，導航人生</p>

          <p style="font-size:16px;color:#0F2027;margin-bottom:4px;">嗨 ${name}，</p>
          <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:0;">
            以下是你的完整天賦報告。<br/>
            收藏這封信，隨時回來查看你的命盤與天作之合。
          </p>

          ${identityHtml}

          <div style="margin-top:8px;">
            ${formatReadingHtml(reading)}
          </div>

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
