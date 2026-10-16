import { useTranslation } from "react-i18next";
import type { Project } from "../../data/types";
import { useLocalized } from "../../i18n/useLocalized";
import { useProjectPeriod } from "../../lib/useProjectPeriod";
import StatusBadge from "../../components/StatusBadge";
import { Icon } from "./AdminUi";
import { primaryBtn } from "./adminStyles";

interface Props {
  projects: Project[];
  onNew: () => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export default function ProjectList({
  projects,
  onNew,
  onEdit,
  onDelete,
}: Props) {
  const { t } = useTranslation();
  const { l } = useLocalized();
  const period = useProjectPeriod();

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          {t("admin.projectsTitle")}
        </h2>
        <button
          onClick={onNew}
          className={`${primaryBtn} inline-flex items-center gap-2`}
        >
          <Icon name="plus" size={14} />
          {t("admin.newProject")}
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          {t("admin.empty")}
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {projects.map((p) => {
            const cover = p.gallery[0]?.image;
            return (
              <li
                key={p.slug}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 p-3 transition hover:border-slate-300"
              >
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  {cover && (
                    <img
                      src={cover}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-medium">{l(p.name)}</p>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {period(p)} · {p.skills.length}{" "}
                    {t("admin.fieldSkills").toLowerCase()}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-sm">
                  <button
                    onClick={() => onEdit(p)}
                    className="rounded-full border border-slate-200 px-4 py-1.5 transition hover:border-slate-900"
                  >
                    {t("admin.edit")}
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    aria-label={t("admin.delete")}
                    title={t("admin.delete")}
                    className="rounded-full p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
