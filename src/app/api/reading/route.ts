import Anthropic from '@anthropic-ai/sdk'
import { calculateBazi, getDayStemDescription } from '@/lib/bazi'
import { calculateLifePath, getLifePathDescription } from '@/lib/numerology'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const readingCache = new Map<string, string>()

export async function POST(req: Request) {
  const { name, date, time } = await req.json()

  if (!name || !date) {
    return Response.json({ error: '缺少必要資料' }, { status: 400 })
  }

  const bazi = calculateBazi(date, time || null, '')
  const lifePath = calculateLifePath(date)
  const lifePathInfo = getLifePathDescription(lifePath)
  const dayStemDesc = getDayStemDescription(bazi.dayStem)

  const elementsText = Object.entries(bazi.elements)
    .map(([el, count]) => `${el}(${count})`)
    .join('、')

  const missingText = bazi.missingElements.length > 0
    ? `缺少五行：${bazi.missingElements.join('、')}`
    : '五行較為均衡'

  const pillarsText = `年柱${bazi.year.stem}${bazi.year.branch}、月柱${bazi.month.stem}${bazi.month.branch}、日柱${bazi.day.stem}${bazi.day.branch}${bazi.hour ? `、時柱${bazi.hour.stem}${bazi.hour.branch}` : ''}`

  const prompt = `你是一位溫暖、鼓勵式的AI命理顧問，使用繁體中文。你的語氣像一位智慧的好朋友，從不說負面或嚇人的話，永遠以正面、建設性的角度解讀命盤。全程使用「你」來稱呼用戶，不使用「他」或「她」。

用戶資料：
- 姓名：${name}
- 出生日期：${date}${time ? `，出生時間：${time}` : '（未提供出生時間）'}
- 八字四柱：${pillarsText}
- 日主：${bazi.dayStem}（${dayStemDesc}）
- 五行分佈：${elementsText}
- ${missingText}
- 主導五行：${bazi.dominantElement}
- 生命數字：${lifePath}（${lifePathInfo.title}）

請提供以下四個部分的深度解讀，每個部分約200-250字，用溫暖鼓勵的語氣：

**性格天賦**
根據日主${bazi.dayStem}和五行分佈，分析${name}的核心性格特質、天生優勢和潛在天賦。強調優點，對不足之處以「成長機會」角度呈現。

**職涯方向**
根據命盤，分析最適合${name}的職業領域（列出3-4個具體行業）、工作風格和職場優勢。說明為何這些方向與其命格契合。

**2026年運勢**
分析${name}在2026年（丙午年）的整體運勢走向。分上半年和下半年說明，指出最有利的發展時機和需要注意的月份。語氣積極，著重機遇而非挑戰。

**生命數字 ${lifePath}（${lifePathInfo.title}）**
結合生命數字${lifePath}的特質，說明${name}此生的人生功課和使命，以及如何在日常生活中發揮這個數字的能量。

**成長方向**
根據命盤中五行的分佈與缺失，提供2-3個具體的成長建議。以「你的潛力還有這些空間」的角度呈現，語氣溫暖積極，讓${name}感到被鼓勵而非被批評。每個建議都要具體可行。

**職涯關鍵字**
只列出4個最適合的職業名稱，用「·」分隔，不需要任何說明文字。例如：創業家 · 品牌顧問 · 內容創作者 · 教育工作者

最後用一句充滿力量的話作為激勵總結。

請直接開始內容，不要有開場白。每個標題用**粗體**。`

  const cacheKey = `${name}-${date}-${time || ''}`
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send metadata immediately (bazi calculations are instant)
        controller.enqueue(encoder.encode(
          `data:${JSON.stringify({ type: 'meta', bazi, lifePath, lifePathInfo })}\n\n`
        ))

        // Return cached result instantly if available
        const cached = readingCache.get(cacheKey)
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
          max_tokens: 2000,
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
        if (fullText) readingCache.set(cacheKey, fullText)
      } catch (err) {
        console.error(err)
        controller.enqueue(encoder.encode(
          `data:${JSON.stringify({ type: 'error', error: 'AI生成失敗，請稍後再試' })}\n\n`
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
