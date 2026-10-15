import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import SkillTree from "../skilltree/SkillTree";
import SkillList from "./list/SkillList";
import ViewToggle, { ExpandIcon, type SkillsView } from "./ViewToggle";

interface Props {
  embedded?: boolean;
  treeClassName?: string;
  fullscreenTo?: string; // se definido, mostra o botão de ecrã inteiro
}

// No telemóvel, a versão embebida abre na lista (a árvore precisa de largura)
const isNarrow = () => window.matchMedia("(max-width: 767px)").matches;

// Alterna entre a skill tree e a versão simplificada em lista
export default function SkillsExplorer({
  embedded = false,
  treeClassName,
  fullscreenTo,
}: Props) {
  const { t } = useTranslation();
  const [view, setView] = useState<SkillsView>(() =>
    embedded && isNarrow() ? "list" : "tree",
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-2">
        <ViewToggle view={view} onChange={setView} />
        {fullscreenTo && (
          <Link
            to={fullscreenTo}
            aria-label={t("skills.fullscreen")}
            title={t("skills.fullscreen")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition hover:border-slate-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ExpandIcon />
          </Link>
        )}
      </div>
      {view === "tree" ? (
        <SkillTree embedded={embedded} className={treeClassName} />
      ) : (
        <SkillList />
      )}
    </div>
  );
}
