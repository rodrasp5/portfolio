import { useTranslation } from "react-i18next";
import { deriveSkills } from "../../lib/deriveSkills";
import { getProfileLevel } from "../../lib/profileLevel";
import { useProjects } from "../../lib/projectsContext";

// Resumo em números, calculado a partir dos projetos e da skill tree
export default function StatsStrip() {
  const { t } = useTranslation();
  const { projects, loading } = useProjects();
  const { level } = getProfileLevel();
  const skills = deriveSkills(projects);
  const done = skills.filter((s) => s.level > 0).length;

  const items = [
    t("tree.level", { level }),
    t("tree.projects", { count: projects.length }),
    t("tree.fieldProgress", { done, total: skills.length }),
  ];

  return (
    <a
      href="#skills"
      className={`mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-slate-200 pt-6 text-sm font-medium text-slate-600 transition hover:text-slate-900 md:justify-start ${
        loading ? "invisible" : ""
      }`}
    >
      {items.map((text, i) => (
        <span key={i} className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full bg-amber-500"
            aria-hidden="true"
          />
          {text}
        </span>
      ))}
    </a>
  );
}
