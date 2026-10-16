import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { skills } from "../data/skills";
import StatusBadge from "../components/StatusBadge";
import { useLocalized } from "../i18n/useLocalized";
import { useProjectPeriod } from "../lib/useProjectPeriod";
import { useProjects } from "../lib/projectsContext";

const skillName = (id: string) => skills.find((s) => s.id === id)?.name ?? id;

export default function ProjectPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { l } = useLocalized();
  const period = useProjectPeriod();
  const { projects, loading } = useProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    if (loading) return null;
    return (
      <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-12">
        <p>{t("project.notFound")}</p>
        <Link to="/#projetos" className="mt-4 inline-block text-sm underline">
          {t("project.back")}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-12">
      <Link to="/#projetos" className="text-sm underline">
        ← {t("project.back")}
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {l(project.name)}
          </h1>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-1 text-sm capitalize text-slate-500">
          {period(project)}
        </p>
        <p className="mt-4 max-w-3xl whitespace-pre-line text-slate-700">
          {l(project.description)}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.skills.map((id) => (
            <li
              key={id}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs"
            >
              {skillName(id)}
            </li>
          ))}
        </ul>

        {project.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
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
        )}
      </header>

      <div className="mt-12 space-y-12">
        {project.gallery.map((block, i) => {
          const caption = l(block.caption);
          return (
            <figure
              key={`${block.image}-${i}`}
              className="grid items-center gap-6 md:grid-cols-2"
            >
              <img
                src={block.image}
                alt={caption || l(project.name)}
                loading="lazy"
                className={`w-full rounded-lg border border-slate-200 ${
                  block.side === "right" ? "md:order-2" : ""
                } ${caption ? "" : "md:col-span-2"}`}
              />
              {caption && (
                <figcaption className="whitespace-pre-line text-slate-700">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </main>
  );
}
