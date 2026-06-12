const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']

const STEM_ELEMENT: Record<string, string> = {
  甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'
}
const BRANCH_ELEMENT: Record<string, string> = {
  子:'水',丑:'土',寅:'木',卯:'木',辰:'土',巳:'火',午:'火',未:'土',申:'金',酉:'金',戌:'土',亥:'水'
}
const ELEMENT_EN: Record<string, string> = {
  木:'Wood',火:'Fire',土:'Earth',金:'Metal',水:'Water'
}

function daysBetween(d1: Date, d2: Date): number {
  const msPerDay = 86400000
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())
  return Math.floor((utc2 - utc1) / msPerDay)
}

function getYearPillar(year: number) {
  const stemIdx = ((year - 4) % 10 + 10) % 10
  const branchIdx = ((year - 4) % 12 + 12) % 12
  return { stem: STEMS[stemIdx], branch: BRANCHES[branchIdx] }
}

// Approximate solar term month (立春 ~Feb 4 starts new BaZi year)
function getBaziMonth(date: Date): number {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const solarTermDays: Record<number, number> = {
    1:6, 2:4, 3:6, 4:5, 5:6, 6:6, 7:7, 8:7, 9:8, 10:8, 11:7, 12:7
  }
  const termDay = solarTermDays[month]
  if (day < termDay) {
    return month === 1 ? 12 : month - 1
  }
  return month
}

function getMonthPillar(year: number, date: Date) {
  const baziMonth = getBaziMonth(date)
  // branch: 寅(2) for Feb, cycle forward
  const branchIdx = ((baziMonth - 2 + 12) % 12 + 2) % 12
  // stem start depends on year stem
  const yearStemIdx = ((year - 4) % 10 + 10) % 10
  const monthStemBase = [2,4,6,8,0][yearStemIdx % 5]
  const stemIdx = (monthStemBase + (baziMonth - 1)) % 10
  return { stem: STEMS[stemIdx], branch: BRANCHES[branchIdx] }
}

function getDayPillar(date: Date) {
  // Reference: Jan 1 1900 = 甲戌 (stem 0, branch 10)
  const ref = new Date(1900, 0, 1)
  const days = daysBetween(ref, date)
  const stemIdx = ((0 + days) % 10 + 10) % 10
  const branchIdx = ((10 + days) % 12 + 12) % 12
  return { stem: STEMS[stemIdx], branch: BRANCHES[branchIdx] }
}

function getHourPillar(hour: number, dayStemIdx: number) {
  const branchIdx = Math.floor(((hour + 1) % 24) / 2)
  const hourStemBase = [0,2,4,6,8][dayStemIdx % 5]
  const stemIdx = (hourStemBase + branchIdx) % 10
  return { stem: STEMS[stemIdx], branch: BRANCHES[branchIdx] }
}

export interface BaziResult {
  year: { stem: string; branch: string }
  month: { stem: string; branch: string }
  day: { stem: string; branch: string }
  hour: { stem: string; branch: string } | null
  dayStem: string
  dayStemElement: string
  elements: Record<string, number>
  dominantElement: string
  dominantElementEn: string
  missingElements: string[]
}

export function calculateBazi(
  birthDate: string,
  birthTime: string | null,
  gender: string
): BaziResult {
  const [year, month, day] = birthDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  const yearPillar = getYearPillar(year)
  const monthPillar = getMonthPillar(year, date)
  const dayPillar = getDayPillar(date)

  let hourPillar = null
  if (birthTime) {
    const [h] = birthTime.split(':').map(Number)
    const dayStemIdx = STEMS.indexOf(dayPillar.stem)
    hourPillar = getHourPillar(h, dayStemIdx)
  }

  const pillars = [yearPillar, monthPillar, dayPillar, ...(hourPillar ? [hourPillar] : [])]
  const elements: Record<string, number> = { 木:0, 火:0, 土:0, 金:0, 水:0 }

  for (const p of pillars) {
    elements[STEM_ELEMENT[p.stem]]++
    elements[BRANCH_ELEMENT[p.branch]]++
  }

  const dominantElement = Object.entries(elements).sort((a,b)=>b[1]-a[1])[0][0]
  const missingElements = Object.entries(elements).filter(([,v])=>v===0).map(([k])=>k)

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    dayStem: dayPillar.stem,
    dayStemElement: STEM_ELEMENT[dayPillar.stem],
    elements,
    dominantElement,
    dominantElementEn: ELEMENT_EN[dominantElement],
    missingElements
  }
}

export function getZodiac(birthDate: string): { sign: string; emoji: string } {
  const [, month, day] = birthDate.split('-').map(Number)
  const signs = [
    { sign: '摩羯座', emoji: '♑', from: [12,22], to: [1,19] },
    { sign: '水瓶座', emoji: '♒', from: [1,20], to: [2,18] },
    { sign: '雙魚座', emoji: '♓', from: [2,19], to: [3,20] },
    { sign: '牡羊座', emoji: '♈', from: [3,21], to: [4,19] },
    { sign: '金牛座', emoji: '♉', from: [4,20], to: [5,20] },
    { sign: '雙子座', emoji: '♊', from: [5,21], to: [6,20] },
    { sign: '巨蟹座', emoji: '♋', from: [6,21], to: [7,22] },
    { sign: '獅子座', emoji: '♌', from: [7,23], to: [8,22] },
    { sign: '處女座', emoji: '♍', from: [8,23], to: [9,22] },
    { sign: '天秤座', emoji: '♎', from: [9,23], to: [10,22] },
    { sign: '天蠍座', emoji: '♏', from: [10,23], to: [11,21] },
    { sign: '射手座', emoji: '♐', from: [11,22], to: [12,21] },
  ]
  for (const s of signs) {
    const [fm, fd] = s.from
    const [tm, td] = s.to
    if (fm === 12) {
      if ((month === 12 && day >= fd) || (month === 1 && day <= td)) return { sign: s.sign, emoji: s.emoji }
    } else {
      if ((month === fm && day >= fd) || (month === tm && day <= td)) return { sign: s.sign, emoji: s.emoji }
    }
  }
  return { sign: '摩羯座', emoji: '♑' }
}

export const ELEMENT_LUCKY_COLORS: Record<string, { colors: string[]; hex: string[] }> = {
  木: { colors: ['綠色','青色'], hex: ['#16A34A','#0891B2'] },
  火: { colors: ['紅色','橙色'], hex: ['#DC2626','#EA580C'] },
  土: { colors: ['黃色','棕色'], hex: ['#CA8A04','#92400E'] },
  金: { colors: ['白色','金色'], hex: ['#9CA3AF','#D97706'] },
  水: { colors: ['黑色','深藍色'], hex: ['#1F2937','#1D4ED8'] },
}

export const ELEMENT_EMOJI: Record<string, string> = {
  木: '🌿', 火: '🔥', 土: '🌍', 金: '⚡', 水: '💧'
}

export const DAY_STEM_TAGS: Record<string, string[]> = {
  甲: ['領導型','目標導向','開創者'],
  乙: ['溝通型','親和力強','協調者'],
  丙: ['影響型','熱情開朗','感染者'],
  丁: ['洞察型','重情重義','守護者'],
  戊: ['穩健型','值得信賴','建設者'],
  己: ['務實型','細心周到','照顧者'],
  庚: ['行動型','果斷執行','決策者'],
  辛: ['品質型','追求完美','審美者'],
  壬: ['謀略型','靈活應變','思考者'],
  癸: ['直覺型','富有創意','感知者'],
}

export function getDayStemDescription(stem: string): string {
  const descriptions: Record<string, string> = {
    甲:'甲木日主 — 正直、有抱負、天生領導者',
    乙:'乙木日主 — 柔韌、有親和力、善於溝通',
    丙:'丙火日主 — 熱情、開朗、充滿感染力',
    丁:'丁火日主 — 細心、有洞察力、重情義',
    戊:'戊土日主 — 穩重、可靠、有承擔精神',
    己:'己土日主 — 謹慎、務實、善於照顧他人',
    庚:'庚金日主 — 果決、有執行力、重視效率',
    辛:'辛金日主 — 精緻、有審美力、追求完美',
    壬:'壬水日主 — 智慧、靈活、善於謀略',
    癸:'癸水日主 — 敏感、有直覺力、富有創意',
  }
  return descriptions[stem] || ''
}
