import { useId, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import { track } from '../lib/stats'

// Passwords comuns: levam à piada (admin falso). Nunca são enviadas ao Supabase.
const COMMON_PASSWORDS = [
  '123456',
  '123456789',
  '12345678',
  '12345',
  '1234',
  '111111',
  '123123',
  'password',
  'password1',
  'admin',
  'admin123',
  'qwerty',
  'abc123',
  'letmein',
]

const label = 'block text-sm font-medium text-slate-700'

const input =
  'mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 ' +
  'outline-none transition placeholder:text-slate-400 hover:border-slate-400 ' +
  'focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 ' +
  'aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/15'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userId = useId()
  const passwordId = useId()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    track('login_attempt')

    // 1. A piada: password comum entra no admin falso
    if (COMMON_PASSWORDS.includes(password.trim().toLowerCase())) {
      sessionStorage.setItem('honeypot', '1')
      track('login_success')
      navigate('/admin')
      return
    }

    // 2. Acesso real: o campo "Utilizador" é o teu email do Supabase
    if (!supabase) {
      setError(true)
      return
    }
    setBusy(true)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: user.trim(),
      password,
    })
    setBusy(false)

    if (authError) {
      setError(true)
      return
    }
    sessionStorage.removeItem('honeypot')
    navigate('/admin')
  }

  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold tracking-tight">{t('login.title')}</h1>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor={userId} className={label}>
              {t('login.user')}
            </label>
            <input
              id={userId}
              name="user"
              type="text"
              value={user}
              onChange={(e) => {
                setUser(e.target.value)
                setError(false)
              }}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-invalid={error}
              className={input}
            />
          </div>

          <div>
            <label htmlFor={passwordId} className={label}>
              {t('login.password')}
            </label>
            <input
              id={passwordId}
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              autoComplete="off"
              aria-invalid={error}
              className={input}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
            >
              {t('login.error')}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t('login.submit')}
          </button>
        </form>
      </div>
    </main>
  )
}
