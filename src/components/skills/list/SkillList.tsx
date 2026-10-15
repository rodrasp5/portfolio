import { useTranslation } from "react-i18next";
import { deriveSkills } from "../../../lib/deriveSkills";
import { getProfileLevel } from "../../../lib/profileLevel";
import { useProjects } from "../../../lib/projectsContext";
import { groupBySector } from "../../../lib/sectors";
import { round1 } from "../../../lib/years";
import { useLocalized } from "../../../i18n/useLocalized";
import LevelPips from "../../skilltree/LevelPips";
import CertificateList from "./CertificateList";
import EducationList from "./EducationList";
import ExperienceList from "./ExperienceList";
import ListBlock from "./ListBlock";

export default function SkillList() {
  const { t } = useTranslation();
  const { l } = useLocalized();
  const { projects } = useProjects();
  const { sectors, skills } = groupBySector(deriveSkills(projects));
  const { level, formation, experience } = getProfileLevel();

  // Só o que foi mesmo usado; campos sem skills desbloqueadas não aparecem
  const used = skills.filter((s) => s.level > 0);
  const groups = sectors
    .map((f) => ({ field: f, items: used.filter((s) => s.field === f.id) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-12">
      <div>
        <p className="font-display text-4xl font-semibold">
          {t("tree.level", { level })}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {t("tree.formationYears", { count: round1(formation) })} +{" "}
          {t("tree.experienceYears", { count: round1(experience) })}
        </p>
      </div>

      {groups.length > 0 && (
        <ListBlock title={t("list.skills")}>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map(({ field, items }) => (
              <div key={field.id}>
                <h4 className="mb-3 text-sm font-medium text-slate-300">
                  {l(field.name)}
                </h4>
                <ul>
                  {items.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between gap-3 border-b border-slate-900 py-2.5"
                    >
                      <div>
                        <p className="text-sm text-slate-200">{s.name}</p>
                        <p className="text-xs text-slate-600">
                          {t(`category.${s.category}`)}
                        </p>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        <LevelPips level={s.level} className="justify-end" />
                        <p className="mt-1">
                          {s.count > 0
                            ? t("tree.projects", { count: s.count })
                            : t("tree.base")}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ListBlock>
      )}

      <EducationList />
      <ExperienceList />
      <CertificateList />
    </div>
  );
}
