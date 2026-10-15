import { useEffect } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { skills } from "../data/skills";
import { useLocalized } from "../i18n/useLocalized";
import { useProjects } from "../lib/projectsContext";

const skillName = (id: string) => skills.find((s) => s.id === id)?.name ?? id;

export default function ProjectPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { l, lang } = useLocalized();
  const { projects, loading } = useProjects();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!project) {
    if (loading) return null;
    return (
      <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-12">
        <p>{t("project.notFound")}</p>
        <a href="/#projetos" className="mt-4 inline-block text-sm underline">
          {t("project.back")}
        </a>
      </main>
    );
  }

  const date = new Date(`${project.date}-01`).toLocaleDateString(
    lang === "en" ? "en-GB" : "pt-PT",
    {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  );

  return (
    <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-12">
      <a href="/#projetos" className="text-sm underline">
        ← {t("project.back")}
      </a>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">{l(project.name)}</h1>
          <span className="rounded-full border border-slate-300 px-2 py-0.5 text-xs text-slate-600">
            {t(`status.${project.status}`)}
          </span>
        </div>
        <p className="mt-1 text-sm capitalize text-slate-500">{date}</p>
        <p className="mt-4 max-w-3xl whitespace-pre-line text-slate-700">
          {l(project.description)}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.skills.map((id) => (
            <li key={id} className="rounded bg-slate-100 px-2 py-1 text-xs">
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
                className="underline"
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
