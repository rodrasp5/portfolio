import { useTranslation } from "react-i18next";
import type { ProjectStatus } from "../data/types";

const styles: Record<ProjectStatus, string> = {
  concluido: "border-slate-900 bg-slate-900 text-white",
  desenvolvimento: "border-amber-400 text-slate-800",
  inacabado: "border-dashed border-slate-300 text-slate-500",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const { t } = useTranslation();

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${styles[status]}`}
    >
      {status === "desenvolvimento" && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-amber-400"
          aria-hidden="true"
        />
      )}
      {t(`status.${status}`)}
    </span>
  );
}
