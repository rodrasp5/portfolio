export type EventType = 'login_attempt' | 'login_success' | 'save_attempt'

const KEY = 'portfolio-stats'

export function track(type: EventType) {
  try {
    const raw = localStorage.getItem(KEY)
    const events: { type: EventType; at: string }[] = raw ? JSON.parse(raw) : []
    events.push({ type, at: new Date().toISOString() })
    localStorage.setItem(KEY, JSON.stringify(events))
  } catch {
    // ignorar erros de storage
  }
  console.info('[stats]', type)
}
