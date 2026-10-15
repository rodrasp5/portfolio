export const GOLD = '#fbbf24'

const categoryIcons: Record<string, string> = {
  linguagem: '📜',
  framework: '⚔️',
  'base-de-dados': '🗄️',
  ferramenta: '🛠️',
  conceito: '💡',
}

export const categoryIcon = (category: string) => categoryIcons[category] ?? '✨'
