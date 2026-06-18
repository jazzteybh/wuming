'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

type HType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

const QUESTIONS: { q: string; opts: { label: string; type: HType }[] }[] = [
  {
    q: '你比較享受哪種狀態？',
    opts: [
      { label: '🔨 動手做，完成那一刻最有成就感', type: 'R' },
      { label: '📚 越研究越停不下來，搞懂比什麼都滿足', type: 'I' },
      { label: '🎨 自由發揮，做出有自己風格的作品', type: 'A' },
      { label: '🤝 跟人連結，幫到別人就開心', type: 'S' },
      { label: '🎯 說服別人，讓一件事真的發生', type: 'E' },
      { label: '📋 把混亂的事情整理清楚，一切都在掌控中', type: 'C' },
    ],
  },
  {
    q: '朋友眼中的你是？',
    opts: [
      { label: '🔧 很會動手，壞掉的東西找你準沒錯', type: 'R' },
      { label: '🧠 什麼都要問為什麼，腦袋停不下來', type: 'I' },
      { label: '✨ 很有自己的品味，審美跟別人不一樣', type: 'A' },
      { label: '💛 很溫暖，大家有心事第一個找你', type: 'S' },
      { label: '🔥 有衝勁，說到做到，敢帶頭', type: 'E' },
      { label: '📁 超可靠，交給你的事絕對不會漏掉', type: 'C' },
    ],
  },
  {
    q: '什麼工作會讓你做到忘記時間？',
    opts: [
      { label: '🏗️ 親手做出一個實際存在的東西', type: 'R' },
      { label: '🔬 深入研究一個問題，找到答案', type: 'I' },
      { label: '🖌️ 寫作、拍片、設計，純粹的創作', type: 'A' },
      { label: '👥 陪伴或幫助某人真正解決困擾', type: 'S' },
      { label: '📢 說服別人、談判、帶著團隊衝目標', type: 'E' },
      { label: '📊 把複雜的數字或流程整理得清清楚楚', type: 'C' },
    ],
  },
  {
    q: '哪種情況會讓你最快崩潰？',
    opts: [
      { label: '😰 整天要應酬、跟陌生人社交', type: 'R' },
      { label: '⏱️ 被逼著快速決定，根本沒時間想清楚', type: 'I' },
      { label: '🚫 什麼都要照規定來，完全不能發揮', type: 'A' },
      { label: '🏝️ 長期獨自工作，沒有人可以說話', type: 'S' },
      { label: '🔇 只能執行別人的想法，完全沒話語權', type: 'E' },
      { label: '🌀 規則不清楚，什麼都靠感覺，完全沒方向', type: 'C' },
    ],
  },
  {
    q: '遇到困難，你的本能反應是？',
    opts: [
      { label: '🛠️ 直接動手試，做了再說', type: 'R' },
      { label: '🔍 先搜資料，把問題搞清楚再動', type: 'I' },
      { label: '💡 腦中閃過很多可能性，想找最有創意的解法', type: 'A' },
      { label: '🗣️ 問問身邊的人，聽聽大家怎麼看', type: 'S' },
      { label: '⚡ 快速判斷，找最有效的路直接衝', type: 'E' },
      { label: '📝 列清單，拆步驟，一步一步來', type: 'C' },
    ],
  },
  {
    q: '有筆錢可以投資自己，你最想做什麼？',
    opts: [
      { label: '🔩 學一門技術或手藝，真正做出東西', type: 'R' },
      { label: '📖 報名深度課程，系統性搞懂一個領域', type: 'I' },
      { label: '🎭 去上創作課，找到自己的表達方式', type: 'A' },
      { label: '🫂 學溝通、教練或輔導技巧', type: 'S' },
      { label: '🚀 學創業、行銷或領導力', type: 'E' },
      { label: '📜 考一張有含金量的專業證照', type: 'C' },
    ],
  },
]

function CareerQuizContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get('name') || ''
  const date = searchParams.get('date') || ''
  const time = searchParams.get('time') || ''
  const gender = searchParams.get('gender') || 'male'

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<HType[][]>(Array(6).fill([]))
  const [submitting, setSubmitting] = useState(false)

  const current = answers[step]

  function toggle(type: HType) {
    setAnswers(prev => {
      const curr = prev[step]
      if (curr.includes(type)) return prev.map((a, i) => i === step ? curr.filter(t => t !== type) : a)
      if (curr.length >= 2) return prev
      return prev.map((a, i) => i === step ? [...curr, type] : a)
    })
  }

  function next() {
    if (step < 5) {
      setStep(s => s + 1)
    } else {
      setSubmitting(true)
      const scores: Record<HType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
      answers.forEach(a => a.forEach(t => { scores[t]++ }))
      const sorted = (Object.keys(scores) as HType[]).sort((a, b) => scores[b] - scores[a])
      const h = sorted[0] + sorted[1]
      const params = new URLSearchParams({ name, date, gender, h })
      if (time) params.set('time', time)
      router.push(`/career?${params.toString()}`)
    }
  }

  if (submitting) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
        <div className="w-12 h-12 border-2 border-[#BBF7D0] border-t-[#059669] rounded-full animate-spin mb-4" />
        <p className="text-[14px] text-[#888]">分析你的職涯型態中...</p>
      </main>
    )
  }

  const progress = ((step) / 6) * 100

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-5 pt-4 pb-3">
        <button onClick={() => step > 0 ? setStep(s => s - 1) : router.back()} className="text-[13px] text-[#059669]">
          ← 返回
        </button>
        <span className="text-[12px] text-[#AAA] font-medium">{step + 1} / 6</span>
      </nav>

      <div className="h-1 bg-[#F0FAF8]">
        <div
          className="h-full bg-[#059669] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="px-5 py-6 max-w-lg mx-auto">
        <div className="mb-2">
          <span className="text-[11px] text-[#059669] font-medium bg-[#F0FDF4] px-2.5 py-1 rounded-full">
            悟明職涯型態測驗
          </span>
        </div>
        <h2 className="text-[19px] font-medium text-[#0F2027] mb-1 mt-3 leading-snug">
          Q{step + 1}. {QUESTIONS[step].q}
        </h2>
        <p className="text-[12px] text-[#AAA] mb-5">選最像你的 1–2 個</p>

        <div className="space-y-2.5 mb-6">
          {QUESTIONS[step].opts.map(opt => {
            const selected = current.includes(opt.type)
            const maxed = current.length >= 2 && !selected
            return (
              <button
                key={opt.type}
                onClick={() => toggle(opt.type)}
                disabled={maxed}
                className={`w-full text-left px-4 py-3.5 rounded-2xl border text-[14px] leading-snug transition-all active:scale-[0.99] ${
                  selected
                    ? 'bg-[#F0FDF4] border-[#059669] text-[#0F2027] font-medium'
                    : maxed
                    ? 'bg-white border-[#F0F0F0] text-[#CCC]'
                    : 'bg-white border-[#E5E7EB] text-[#444]'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>

        <button
          onClick={next}
          disabled={current.length === 0}
          className="w-full h-13 bg-[#059669] text-white text-[15px] font-medium rounded-2xl py-4 disabled:opacity-40 active:opacity-90 transition-opacity"
        >
          {step < 5 ? '下一題 →' : '查看我的職涯型態 →'}
        </button>

        {current.length === 1 && (
          <p className="text-center text-[11px] text-[#AAA] mt-2">可以再選一個，或直接下一題</p>
        )}
      </div>
    </main>
  )
}

export default function CareerQuizPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#059669] border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <CareerQuizContent />
    </Suspense>
  )
}
