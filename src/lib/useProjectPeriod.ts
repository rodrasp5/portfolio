import { useTranslation } from "react-i18next";
import type { Project } from "../data/types";
import { useLocalized } from "../i18n/useLocalized";
import { formatMonth } from "./years";

// Devolve uma função que formata o período de um projeto: "mar 2026 - jul 2026"
export function useProjectPeriod() {
  const { t } = useTranslation();
  const { lang } = useLocalized();

  return (p: Pick<Project, "date" | "endDate" | "status">) => {
    const start = formatMonth(p.date, lang);
    if (!p.endDate) {
      return p.status === "desenvolvimento"
        ? t("project.since", { date: start })
        : start;
    }
    const end = formatMonth(p.endDate, lang);
    return end === start ? start : `${start} - ${end}`;
  };
}
