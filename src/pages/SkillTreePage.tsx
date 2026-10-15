import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import SkillsExplorer from "../components/skills/SkillsExplorer";

export default function SkillTreePage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100svh-4rem)] bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {t("skills.pageTitle")}
          </h1>
          <Link
            to="/#skills"
            className="text-sm text-slate-400 underline underline-offset-4 hover:text-white"
          >
            {t("skills.backHome")}
          </Link>
        </div>
        <div className="mt-4">
          <SkillsExplorer treeClassName="h-[calc(100svh-12rem)] min-h-[480px]" />
        </div>
      </div>
    </main>
  );
}
