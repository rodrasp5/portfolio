import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

// Sem as variáveis o site funciona na mesma: só o login real fica desligado.
export const supabase = url && key ? createClient(url, key) : null

if (!supabase) {
  console.warn(
    '[supabase] Faltam VITE_SUPABASE_URL e/ou VITE_SUPABASE_PUBLISHABLE_KEY: o login real está desligado.',
  )
}
