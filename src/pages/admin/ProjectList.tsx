import { useTranslation } from "react-i18next";
import type { Project } from "../../data/types";
import { useLocalized } from "../../i18n/useLocalized";

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

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t("admin.projectsTitle")}</h2>
        <button
          onClick={onNew}
          className="rounded bg-black px-4 py-2 text-sm text-white"
        >
          {t("admin.newProject")}
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">{t("admin.empty")}</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-200 rounded border border-slate-200">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{l(p.name)}</p>
                <p className="text-xs text-slate-500">
                  {t(`status.${p.status}`)} · {p.date}
                </p>
              </div>
              <div className="flex shrink-0 gap-4 text-sm">
                <button onClick={() => onEdit(p)} className="underline">
                  {t("admin.edit")}
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className="text-red-700 underline"
                >
                  {t("admin.delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
