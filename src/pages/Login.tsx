import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { track } from '../lib/stats'

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

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    track('login_attempt')

    if (COMMON_PASSWORDS.includes(password.trim().toLowerCase())) {
      sessionStorage.setItem('honeypot', '1')
      track('login_success')
      navigate('/admin')
    } else {
      setError(true)
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-sm flex-col justify-center px-4">
      <h1 className="text-2xl font-bold">{t('login.title')}</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder={t('login.user')}
          autoComplete="off"
          className="w-full rounded border border-slate-300 px-3 py-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('login.password')}
          autoComplete="off"
          className="w-full rounded border border-slate-300 px-3 py-2"
        />
        {error && <p className="text-sm text-red-600">{t('login.error')}</p>}
        <button type="submit" className="w-full rounded bg-black px-3 py-2 text-white">
          {t('login.submit')}
        </button>
      </form>
    </main>
  )
}
