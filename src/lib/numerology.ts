export const LIFE_PATH_BEST_PARTNER: Record<number, { num: number; desc: string }> = {
  1: { num: 3, desc: '創意激發領導，相得益彰' },
  2: { num: 8, desc: '溫柔遇見力量，完美互補' },
  3: { num: 9, desc: '創意共鳴，啟發彼此' },
  4: { num: 6, desc: '踏實同行，共建家園' },
  5: { num: 1, desc: '自由與領導，互相激勵' },
  6: { num: 2, desc: '愛與和諧，靈魂共鳴' },
  7: { num: 5, desc: '智慧遇見自由，深度探索' },
  8: { num: 2, desc: '力量與溫柔，天生一對' },
  9: { num: 3, desc: '博愛遇見創意，感動世界' },
}

export function calculateLifePath(birthDate: string): number {
  const digits = birthDate.replace(/-/g, '').split('').map(Number)
  let sum = digits.reduce((a, b) => a + b, 0)
  while (sum > 9) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0)
  }
  return sum
}

export function getLifePathDescription(num: number): { title: string; description: string; strengths: string[] } {
  const data: Record<number, { title: string; description: string; strengths: string[] }> = {
    1: {
      title: '領導者',
      description: '你天生具備獨立精神與開創能力，是一個勇於走在最前面的人。你的人生功課是學會相信自己的判斷，並帶領他人走向新的方向。',
      strengths: ['獨立自主','創新思維','行動力強','天生領袖']
    },
    2: {
      title: '協調者',
      description: '你擁有敏銳的感知力和天生的外交才能，能夠在衝突中找到平衡點。你的人生功課是學會在照顧他人的同時，也照顧好自己。',
      strengths: ['高情商','善於傾聽','外交手腕','和諧創造者']
    },
    3: {
      title: '創造者',
      description: '你充滿創意與表達能力，對美有天生的感受力。你的人生功課是將內在的豐富靈感化為具體的作品，感染並啟發身邊的人。',
      strengths: ['創意無限','表達力強','樂觀開朗','藝術天賦']
    },
    4: {
      title: '建設者',
      description: '你是穩定與秩序的象徵，做事踏實、有規劃。你的人生功課是在建立安全感的同時，也為自己留下彈性與空間。',
      strengths: ['踏實可靠','規劃能力','耐心毅力','建立基礎']
    },
    5: {
      title: '探索者',
      description: '你對自由有深切的渴望，充滿好奇心和冒險精神。你的人生功課是在追求多樣體驗的同時，找到真正屬於自己的核心。',
      strengths: ['適應力強','好奇開放','魅力吸引','多才多藝']
    },
    6: {
      title: '照顧者',
      description: '你對家庭和社群有深厚的責任感，天生具備照顧他人的能力。你的人生功課是在給予愛的同時，也接受他人的愛與幫助。',
      strengths: ['溫暖體貼','責任心強','美感天賦','社群連結']
    },
    7: {
      title: '智慧探尋者',
      description: '你擁有深刻的分析能力和對真理的渴望，傾向獨立思考。你的人生功課是在追求深度知識的同時，也學會信任直覺與開放心胸。',
      strengths: ['分析能力','直覺敏銳','深度思考','研究天才']
    },
    8: {
      title: '成就者',
      description: '你在物質世界有強大的建構能力，對成功和影響力有天生的感知。你的人生功課是以正直的方式運用力量，創造真正有意義的成就。',
      strengths: ['商業直覺','執行力強','目標導向','財富能量']
    },
    9: {
      title: '人道主義者',
      description: '你有寬廣的胸懷和對人類的深刻關懷，是天生的智慧傳遞者。你的人生功課是在服務他人的旅途中，也找到自己的喜悅與滿足。',
      strengths: ['同理心強','博愛精神','創意智慧','啟發他人']
    },
    11: {
      title: '靈性啟示者',
      description: '11是強大的主命數，你擁有高度的直覺力和靈性感知，能感受到他人感受不到的細微之處。你的人生功課是將這份天賦轉化為對世界的貢獻。',
      strengths: ['高度直覺','靈性感知','啟發能力','理想主義']
    },
    22: {
      title: '宏大建設者',
      description: '22是最強大的主命數之一，你有將宏大願景化為現實的罕見能力。你的人生功課是有耐心地一步一步實現那些看似不可能的目標。',
      strengths: ['宏觀視野','實踐大夢','領導影響','永恆遺產']
    },
    33: {
      title: '宇宙導師',
      description: '33是最高的主命數，代表無條件的愛與療癒。你的人生功課是透過真實的自我表達，成為他人的燈塔。',
      strengths: ['無條件愛','療癒能力','智慧傳遞','靈性導師']
    },
  }
  return data[num] || data[9]
}
