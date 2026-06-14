import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, wantMore, source, freeText, email } = await req.json()

  try {
    await resend.emails.send({
      from: '悟明 <noreply@wumingai.app>',
      to: 'wumingai.app@gmail.com',
      subject: `悟明 用戶回饋 — ${name || '匿名'}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#0F2027;">
          <h2 style="color:#059669;margin-bottom:16px;">用戶回饋</h2>
          <p><strong>用戶名：</strong>${name || '未填寫'}</p>
          ${email ? `<p><strong>Email：</strong>${email}</p>` : ''}
          <hr style="border:none;border-top:1px solid #E5E7EB;margin:16px 0;"/>
          <p><strong>還想探索什麼：</strong></p>
          <ul>${(wantMore || []).map((i: string) => `<li>${i}</li>`).join('')}</ul>
          <p><strong>從哪裡知道悟明：</strong></p>
          <ul>${(source || []).map((i: string) => `<li>${i}</li>`).join('')}</ul>
          ${freeText ? `<p><strong>其他意見：</strong><br/>${freeText}</p>` : ''}
        </div>
      `,
    })
    return Response.json({ success: true })
  } catch (err) {
    console.error(err)
    return Response.json({ error: '發送失敗' }, { status: 500 })
  }
}
