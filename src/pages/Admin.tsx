import { Navigate } from 'react-router'
import { useSession } from '../lib/useSession'
import HoneypotAdmin from './admin/HoneypotAdmin'
import RealAdmin from './admin/RealAdmin'

// Decide qual admin mostrar: o real (sessão Supabase), o falso (piada) ou nenhum.
export default function Admin() {
  const { session, loading } = useSession()

  if (loading) return null
  if (session) return <RealAdmin session={session} />
  if (sessionStorage.getItem('honeypot')) return <HoneypotAdmin />
  return <Navigate to="/login" replace />
}
