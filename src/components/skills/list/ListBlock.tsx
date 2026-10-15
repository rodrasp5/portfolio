import type { ReactNode } from 'react'

export default function ListBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      {children}
    </section>
  )
}
