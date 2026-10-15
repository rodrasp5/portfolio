import { useTranslation } from "react-i18next";
import { fields } from "../../../data/fields";
import { deriveSkills } from "../../../lib/deriveSkills";
import { getProfileLevel } from "../../../lib/profileLevel";
import { useProjects } from "../../../lib/projectsContext";
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
  const skills = deriveSkills(projects);
  const { level, formation, experience } = getProfileLevel();

  return (
    <div className="space-y-10">
      <div>
        <p className="text-3xl font-bold">{t("tree.level", { level })}</p>
        <p className="mt-1 text-sm text-slate-400">
          {t("tree.formationYears", { count: round1(formation) })} +{" "}
          {t("tree.experienceYears", { count: round1(experience) })}
        </p>
      </div>

      <ListBlock title={t("list.skills")}>
        <div className="grid gap-8 md:grid-cols-3">
          {fields.map((f) => (
            <div key={f.id}>
              <h4 className="mb-2 font-medium" style={{ color: f.color }}>
                {f.icon} {l(f.name)}
              </h4>
              <ul>
                {skills
                  .filter((s) => s.field === f.id)
                  .map((s) => (
                    <li
                      key={s.id}
                      className={`flex items-center justify-between gap-3 border-b border-slate-800 py-2 ${
                        s.level === 0 ? "opacity-40" : ""
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="text-xs text-slate-400">
                          {t(`category.${s.category}`)}
                        </p>
                      </div>
                      <div className="text-right text-xs text-slate-400">
                        <LevelPips level={s.level} color={f.color} />
                        <p className="mt-1">
                          {s.level === 0
                            ? t("tree.locked")
                            : s.count > 0
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

      <EducationList />
      <ExperienceList />
      <CertificateList />
    </div>
  );
}
