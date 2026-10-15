import { useTranslation } from "react-i18next";
import Section from "./Section";
import ProjectCard from "../ProjectCard";
import { useProjects } from "../../lib/projectsContext";

export default function ProjectsSection() {
  const { t } = useTranslation();
  const { projects } = useProjects();

  return (
    <Section id="projetos" tone="light">
      <h2 className="text-3xl font-bold">{t("projects.title")}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Section>
  );
}
