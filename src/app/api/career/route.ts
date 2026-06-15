import Anthropic from '@anthropic-ai/sdk'
import { calculateBazi, getDayStemDescription } from '@/lib/bazi'
import { calculateLifePath } from '@/lib/numerology'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const careerCache = new Map<string, string>()

export async function POST(req: Request) {
  const { name, date, time } = await req.json()

  if (!name || !date) {
    return Response.json({ error: '缺少必要資料' }, { status: 400 })
  }

  const bazi = calculateBazi(date, time || null, '')
  const lifePath = calculateLifePath(date)
  const dayStemDesc = getDayStemDescription(bazi.dayStem)

  const prompt = `你是一位專業的命理職涯顧問，使用繁體中文。全程使用「你」稱呼用戶，語氣真誠、具體、有洞察力。

用戶資料：
- 姓名：${name}
- 出生日期：${date}
- 日主：${bazi.dayStem}（${dayStemDesc}）
- 主導五行：${bazi.dayStemElement}
- 生命數字：${lifePath}
- 五行分佈：${JSON.stringify(bazi.elements)}
- 缺乏五行：${bazi.missingElements.join('、') || '無'}

請根據八字日主與五行，為${name}提供深度職涯分析。每個部分嚴格按照以下格式輸出：

**天賦優勢**
根據日主${bazi.dayStem}（${bazi.dayStemElement}屬性），描述3-4個天生的工作優勢與才能。每個優勢用一行，具體說明在職場上如何體現。

**最適職涯路線**
列出3條最適合的職涯方向，每條包含：
- 方向名稱（4-6字）
- 適合原因（15-20字）
- 代表職業（3-4個，用「·」分隔）

**工作風格**
描述你在職場上的天然工作風格：偏好獨立作業還是團隊合作？適合創業還是在組織內發展？如何與同事相處最自然？（60-80字）

**職涯黃金期**
根據日主分析，你職涯最容易出成績的年齡階段是哪些？什麼樣的環境和時機最有利於你發揮？（40-60字）

**需要注意的職場盲點**
你在職場上容易忽略或需要特別注意的1-2個弱點，以及如何克服。語氣溫和，著重成長而非批評。

**給你的職涯建議**
一段溫暖且具體的個人化建議，告訴${name}如何在職涯上走得更穩、更有意義。（60-80字）

請直接輸出分析內容，不要有開場白。`

  const cacheKey = `career-${name}-${date}-${time || ''}`
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode(
          `data:${JSON.stringify({ type: 'meta', bazi, lifePath })}\n\n`
        ))

        const cached = careerCache.get(cacheKey)
        if (cached) {
          controller.enqueue(encoder.encode(
            `data:${JSON.stringify({ type: 'text', text: cached })}\n\n`
          ))
          controller.close()
          return
        }

        let fullText = ''
        const aiStream = client.messages.stream({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1400,
          messages: [{ role: 'user', content: prompt }],
        })

        for await (const chunk of aiStream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            fullText += chunk.delta.text
            controller.enqueue(encoder.encode(
              `data:${JSON.stringify({ type: 'text', text: chunk.delta.text })}\n\n`
            ))
          }
        }
        if (fullText) careerCache.set(cacheKey, fullText)
      } catch (err) {
        console.error(err)
        controller.enqueue(encoder.encode(
          `data:${JSON.stringify({ type: 'error', error: '生成失敗，請稍後再試' })}\n\n`
        ))
      } finally {
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
