import type { ReactNode } from 'react'

const tones = {
  light: 'bg-white text-slate-900',
  dark: 'bg-black text-white',
}

interface Props {
  id: string
  tone: keyof typeof tones
  children: ReactNode
}

export default function Section({ id, tone, children }: Props) {
  return (
    <section
      id={id}
      className={`flex min-h-[calc(100svh-4rem)] scroll-mt-16 items-center px-4 py-16 ${tones[tone]}`}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  )
}
