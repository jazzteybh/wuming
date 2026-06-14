import Anthropic from '@anthropic-ai/sdk'
import { calculateBazi, getDayStemDescription } from '@/lib/bazi'
import { calculateLifePath } from '@/lib/numerology'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  const { name, date, time } = await req.json()

  if (!name || !date) {
    return Response.json({ error: '缺少必要資料' }, { status: 400 })
  }

  const bazi = calculateBazi(date, time || null, '')
  const lifePath = calculateLifePath(date)
  const dayStemDesc = getDayStemDescription(bazi.dayStem)

  const now = new Date()
  const months = []
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    months.push(`${d.getFullYear()}年${d.getMonth() + 1}月`)
  }

  const prompt = `你是一位溫暖的命理顧問，使用繁體中文。全程使用「你」稱呼用戶，語氣正面積極。

用戶資料：
- 姓名：${name}
- 出生日期：${date}
- 日主：${bazi.dayStem}（${dayStemDesc}）
- 主導五行：${bazi.dayStemElement}
- 生命數字：${lifePath}

請根據丙午年（2026）流年與各月份的天干地支，為${name}分析以下12個月的運勢。

每個月份嚴格按照以下格式輸出，不要有任何額外文字：

**${months[0]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[1]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[2]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[3]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[4]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[5]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[6]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[7]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[8]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[9]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[10]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

**${months[11]}**
主題：（4-6個字的主題）
能量：（1-5的數字）
描述：（20-30字，正面積極的運勢描述）
行動：（2-5字的行動建議標籤）

請直接輸出12個月份，不要有開場白或結語。`

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    const monthlyData = months.map((monthLabel) => {
      const block = text.split(new RegExp(`\\*\\*${monthLabel.replace('年', '年').replace('月', '月')}\\*\\*`))[1]?.split(/\*\*\d{4}年\d+月\*\*/)[0] || ''
      const get = (key: string) => block.match(new RegExp(`${key}：(.+)`))?.[1]?.trim() || ''
      return {
        month: monthLabel,
        theme: get('主題'),
        energy: parseInt(get('能量')) || 3,
        desc: get('描述'),
        action: get('行動'),
      }
    })

    return Response.json({ monthly: monthlyData })
  } catch (err) {
    console.error(err)
    return Response.json({ error: '生成失敗，請稍後再試' }, { status: 500 })
  }
}
