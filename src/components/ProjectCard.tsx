import { useTranslation } from "react-i18next";
import type { Project } from "../data/types";
import { skills } from "../data/skills";
import { useLocalized } from "../i18n/useLocalized";

const skillName = (id: string) => skills.find((s) => s.id === id)?.name ?? id;

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const { l } = useLocalized();
  const cover = project.gallery[0]?.image;

  return (
    <article className="rounded-lg border border-slate-200 p-5">
      {cover && (
        <img
          src={cover}
          alt={l(project.name)}
          className="mb-4 aspect-video w-full rounded object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold">{l(project.name)}</h3>
        <span className="shrink-0 rounded-full border border-slate-300 px-2 py-0.5 text-xs text-slate-600">
          {t(`status.${project.status}`)}
        </span>
      </div>
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
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {l(link.label)}
          </a>
        ))}
      </div>
    </article>
  );
}
