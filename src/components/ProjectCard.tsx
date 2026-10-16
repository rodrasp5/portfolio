import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import type { Project } from "../data/types";
import { skills } from "../data/skills";
import { useLocalized } from "../i18n/useLocalized";
import { useProjectPeriod } from "../lib/useProjectPeriod";
import StatusBadge from "./StatusBadge";

const skillName = (id: string) => skills.find((s) => s.id === id)?.name ?? id;

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const { l } = useLocalized();
  const period = useProjectPeriod();
  const cover = project.gallery[0]?.image;
  const to = `/projetos/${project.slug}`;
  const unfinished = project.status === "inacabado";

  return (
    <article
      className={`rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        unfinished ? "border-dashed border-slate-300" : "border-slate-200"
      }`}
    >
      {cover && (
        <Link to={to}>
          <img
            src={cover}
            alt={l(project.name)}
            className={`mb-4 aspect-video w-full rounded-lg object-cover ${unfinished ? "grayscale" : ""}`}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </Link>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold">
          <Link to={to} className="hover:underline">
            {l(project.name)}
          </Link>
        </h3>
        <StatusBadge status={project.status} />
      </div>
      <p className="mt-1 text-xs capitalize text-slate-400">
        {period(project)}
      </p>
      <p className="mt-2 text-sm text-slate-600">{l(project.description)}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.skills.map((id) => (
          <li
            key={id}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs"
          >
            {skillName(id)}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link to={to} className="font-medium underline underline-offset-4">
          {t("projects.view")}
        </Link>
        {project.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            {l(link.label)}
          </a>
        ))}
      </div>
    </article>
  );
}
