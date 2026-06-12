import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email, name } = await req.json()

  if (!email || !name) {
    return Response.json({ error: '缺少必要資料' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: '悟明 <noreply@wumingai.app>',
      to: email,
      subject: `${name}，你的命盤已儲存 ✦`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #0F2027;">
          <h1 style="font-size: 22px; font-weight: 500; margin-bottom: 8px;">
            悟<span style="color: #0D9488;">明</span>
          </h1>
          <p style="font-size: 16px; color: #0F2027; margin-bottom: 16px;">嗨 ${name}，</p>
          <p style="font-size: 15px; color: #444; line-height: 1.7; margin-bottom: 16px;">
            你的命盤已成功儲存！我們每個月都會寄送專屬的運勢更新給你，幫助你掌握最佳時機。
          </p>
          <div style="background: #F0FDF9; border: 1px solid #CCFBF1; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <p style="font-size: 13px; color: #0D9488; margin: 0;">
              ✦ 每月運勢更新將自動寄送到此信箱<br/>
              ✦ 下個月份的運勢報告即將發送
            </p>
          </div>
          <a href="https://wumingai.app" style="display: inline-block; background: #0D9488; color: white; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 15px;">
            返回悟明
          </a>
          <p style="font-size: 11px; color: #AAA; margin-top: 32px;">
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
