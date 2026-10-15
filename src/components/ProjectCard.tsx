import type { Project } from '../data/types'
import { skills } from '../data/skills'
import { useLocalized } from '../i18n/useLocalized'

const skillName = (id: string) => skills.find((s) => s.id === id)?.name ?? id

export default function ProjectCard({ project }: { project: Project }) {
  const { l } = useLocalized()

  return (
    <article className="rounded-lg border border-slate-200 p-5">
      {project.images[0] && (
        <img
          src={project.images[0]}
          alt={l(project.name)}
          className="mb-4 aspect-video w-full rounded object-cover"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
      <h3 className="text-xl font-semibold">{l(project.name)}</h3>
      <p className="mt-2 text-sm text-slate-600">{l(project.description)}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.skills.map((id) => (
          <li key={id} className="rounded bg-slate-100 px-2 py-1 text-xs">
            {skillName(id)}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-4 text-sm">
        {project.links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="underline">
            {l(link.label)}
          </a>
        ))}
      </div>
    </article>
  )
}
