import { useTranslation } from "react-i18next";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import ProjectCard from "../ProjectCard";
import { useProjects } from "../../lib/projectsContext";

export default function ProjectsSection() {
  const { t } = useTranslation();
  const { projects, loading } = useProjects();

  return (
    <Section id="projetos" tone="light">
      <SectionHeading index="02">{t("projects.title")}</SectionHeading>

      {projects.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
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
