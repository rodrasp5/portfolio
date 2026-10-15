import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'

// Provisório: aqui vai ficar a gestão real de projetos.
export default function RealAdmin({ session }: { session: Session }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  async function logout() {
    // Navega primeiro: ao terminar a sessão, esta página redirecionava para o login
    navigate('/')
    await supabase?.auth.signOut()
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('admin.title')}</h1>
        <button onClick={() => void logout()} className="text-sm underline">
          {t('admin.logout')}
        </button>
      </div>
      <p className="mt-4 text-sm text-slate-500">{session.user.email}</p>
    </main>
  )
}
