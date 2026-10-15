import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { track } from '../../lib/stats'

type Status = 'idle' | 'saving' | 'blocked'

const input = 'w-full rounded border border-slate-300 px-3 py-2'

// A piada: parece um admin a sério, mas nunca guarda nada.
export default function HoneypotAdmin() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [status, setStatus] = useState<Status>('idle')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    track('save_attempt')
    setStatus('saving')
    setTimeout(() => setStatus('blocked'), 1200)
  }

  function logout() {
    sessionStorage.removeItem('honeypot')
    navigate('/')
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('admin.title')}</h1>
        <button onClick={logout} className="text-sm underline">
          {t('admin.logout')}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input required placeholder={t('admin.name')} className={input} />
        <textarea required placeholder={t('admin.description')} rows={4} className={input} />
        <input type="file" accept="image/*" multiple className={input} />
        <input type="url" placeholder={t('admin.link')} className={input} />
        <input placeholder={t('admin.tech')} className={input} />
        <button
          type="submit"
          disabled={status === 'saving'}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {status === 'saving' ? t('admin.saving') : t('admin.save')}
        </button>
      </form>

      {status === 'blocked' && (
        <div className="mt-6 rounded border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-semibold">{t('admin.errorTitle')}</p>
          <p className="mt-1">{t('admin.errorBody')}</p>
        </div>
      )}
    </main>
  )
}
