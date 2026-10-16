import { useTranslation } from "react-i18next";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import ProjectCard from "../ProjectCard";
import type { ProjectStatus } from "../../data/types";
import { useProjects } from "../../lib/projectsContext";

// Ordem dos blocos na página
const GROUPS: ProjectStatus[] = ["concluido", "desenvolvimento", "inacabado"];

export default function ProjectsSection() {
  const { t } = useTranslation();
  const { projects, loading } = useProjects();

  return (
    <Section id="projetos" tone="light">
      <SectionHeading index="02">{t("projects.title")}</SectionHeading>

      {projects.length > 0 ? (
        <div className="mt-8 space-y-12">
          {GROUPS.map((status) => {
            const items = projects.filter((p) => p.status === status);
            if (items.length === 0) return null;
            return (
              <div key={status}>
                <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-slate-200 pb-3">
                  <h3 className="font-display text-lg font-semibold">
                    {t(`projects.groups.${status}`)}
                  </h3>
                  <span className="text-sm text-slate-400">{items.length}</span>
                  <p className="w-full text-sm text-slate-500 sm:ml-auto sm:w-auto">
                    {t(`projects.hints.${status}`)}
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <ProjectCard key={p.slug} project={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : loading ? (
        <div
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-hidden="true"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-slate-500">{t("projects.empty")}</p>
      )}
    </Section>
  );
}
