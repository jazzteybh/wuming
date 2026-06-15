import Anthropic from '@anthropic-ai/sdk'
import { calculateBazi, getDayStemDescription } from '@/lib/bazi'
import { calculateLifePath } from '@/lib/numerology'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  const { name1, date1, time1, name2, date2, time2 } = await req.json()

  if (!name1 || !date1 || !name2 || !date2) {
    return Response.json({ error: '缺少必要資料' }, { status: 400 })
  }

  const bazi1 = calculateBazi(date1, time1 || null, '')
  const bazi2 = calculateBazi(date2, time2 || null, '')
  const lifePath1 = calculateLifePath(date1)
  const lifePath2 = calculateLifePath(date2)
  const desc1 = getDayStemDescription(bazi1.dayStem)
  const desc2 = getDayStemDescription(bazi2.dayStem)

  const prompt = `你是一位溫暖專業的命理合盤顧問，使用繁體中文。語氣真誠、有洞察力，著重雙方互補與成長，避免負面批判。

兩人資料：

【${name1}】
- 日主：${bazi1.dayStem}（${desc1}）
- 五行：${bazi1.dayStemElement}命人
- 生命數字：${lifePath1}
- 五行分佈：${JSON.stringify(bazi1.elements)}
- 缺乏五行：${bazi1.missingElements.join('、') || '無'}

【${name2}】
- 日主：${bazi2.dayStem}（${desc2}）
- 五行：${bazi2.dayStemElement}命人
- 生命數字：${lifePath2}
- 五行分佈：${JSON.stringify(bazi2.elements)}
- 缺乏五行：${bazi2.missingElements.join('、') || '無'}

請根據兩人的八字日主與五行進行合盤分析，嚴格按照以下格式輸出：

**緣分指數**
只輸出一個1-100的整數，代表兩人的命格契合度。

**合盤總覽**
用50-60字描述兩人在一起的整體能量與關係基調。語氣正面，點出最核心的相處模式。

**你們的天然默契**
描述2-3個兩人天生就容易產生共鳴的地方。每點一行，具體說明在生活中如何體現。

**互補與成長**
${name1}能給${name2}什麼？${name2}又能給${name1}什麼？描述兩人如何互相補足對方的不足。（50-70字）

**相處的挑戰**
描述1-2個兩人可能出現摩擦的地方，以及如何化解。語氣溫和，著重解決而非問題。

**最佳合作模式**
無論是愛情還是合作關係，兩人在什麼情況下最能發揮彼此的優勢？給出具體的建議。（50-60字）

**給你們的話**
一段溫暖且真誠的祝福與建議，告訴${name1}與${name2}如何讓這段關係走得更長遠。（60-80字）

請直接輸出分析內容，不要有開場白。`

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1400,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    return Response.json({ compatibility: text, bazi1, bazi2, lifePath1, lifePath2 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: '生成失敗，請稍後再試' }, { status: 500 })
  }
}
