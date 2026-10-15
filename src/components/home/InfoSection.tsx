import { useState } from 'react'
import Section from './Section'
import { site } from '../../data/site'
import { useLocalized } from '../../i18n/useLocalized'

const initials = site.name
  .split(' ')
  .map((n) => n[0])
  .join('')
  .slice(0, 2)

const photoSize = 'h-56 w-56 rounded-full md:h-72 md:w-72'

export default function InfoSection() {
  const { l } = useLocalized()
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <Section id="info" tone="light">
      <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
        <div>
          <p className="text-lg text-slate-500">{l(site.role)}</p>
          <h1 className="mt-2 text-5xl font-bold sm:text-6xl">{site.name}</h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600">{l(site.bio)}</p>
        </div>

        {photoFailed ? (
          <div
            className={`${photoSize} flex shrink-0 items-center justify-center bg-slate-900 text-6xl font-bold text-white`}
          >
            {initials}
          </div>
        ) : (
          <img
            src={site.photo}
            alt={site.name}
            onError={() => setPhotoFailed(true)}
            className={`${photoSize} shrink-0 border-4 border-slate-900 object-cover`}
          />
        )}
      </div>
    </Section>
  )
}
