import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email, name, reading, bazi, lifePath, lifePathInfo } = await req.json()

  if (!email || !name) {
    return Response.json({ error: '缺少必要資料' }, { status: 400 })
  }

  const readingHtml = reading
    ? reading
        .replace(/\*\*(.+?)\*\*/g, '</p><h3 style="font-size:15px;font-weight:600;color:#0D9488;margin:20px 0 6px;">$1</h3><p style="font-size:14px;color:#444;line-height:1.8;margin:0;">')
        .replace(/\n\n/g, '</p><p style="font-size:14px;color:#444;line-height:1.8;margin:8px 0;">')
        .replace(/\n/g, '<br/>')
    : ''

  const baziHtml = bazi ? `
    <div style="background:#F0FDF9;border:1px solid #CCFBF1;border-radius:12px;padding:16px;margin:20px 0;">
      <p style="font-size:13px;color:#0D9488;font-weight:600;margin:0 0 10px;">你的八字四柱</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${[
          { label: '年柱', val: bazi.year.stem + bazi.year.branch },
          { label: '月柱', val: bazi.month.stem + bazi.month.branch },
          { label: '日柱', val: bazi.day.stem + bazi.day.branch },
          ...(bazi.hour ? [{ label: '時柱', val: bazi.hour.stem + bazi.hour.branch }] : []),
        ].map(p => `
          <div style="text-align:center;background:white;border:1px solid #CCFBF1;border-radius:8px;padding:8px 12px;min-width:48px;">
            <div style="font-size:10px;color:#AAA;margin-bottom:2px;">${p.label}</div>
            <div style="font-size:16px;font-weight:600;color:#0F2027;">${p.val}</div>
          </div>
        `).join('')}
      </div>
      <p style="font-size:12px;color:#888;margin:10px 0 0;">日主：${bazi.dayStem} · 主導五行：${bazi.dominantElement} · 生命數字：${lifePath}（${lifePathInfo?.title || ''}）</p>
    </div>
  ` : ''

  try {
    await resend.emails.send({
      from: '悟明 <noreply@wumingai.app>',
      to: email,
      subject: `${name}，你的完整命盤解讀 ✦`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0F2027;">
          <h1 style="font-size:24px;font-weight:500;margin-bottom:4px;">
            悟<span style="color:#0D9488;">明</span>
          </h1>
          <p style="font-size:12px;color:#AAA;margin:0 0 24px;">讀懂自己，導航人生</p>

          <p style="font-size:16px;color:#0F2027;margin-bottom:8px;">嗨 ${name}，</p>
          <p style="font-size:14px;color:#555;line-height:1.7;margin-bottom:4px;">
            以下是你的完整命盤解讀，請收藏這封信，隨時回來查看。
          </p>

          ${baziHtml}

          <div style="margin-top:8px;">
            <p style="font-size:14px;color:#444;line-height:1.8;margin:0;">${readingHtml}</p>
          </div>

          <div style="margin-top:32px;padding-top:20px;border-top:1px solid #F0F0F0;">
            <a href="https://wumingai.app" style="display:inline-block;background:#0D9488;color:white;text-decoration:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:500;">
              返回悟明重新解讀
            </a>
          </div>

          <p style="font-size:11px;color:#CCC;margin-top:28px;line-height:1.6;">
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
