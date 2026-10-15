import type { Node, NodeProps } from "@xyflow/react";
import { useTranslation } from "react-i18next";
import { round1 } from "../../lib/years";
import CenterHandles from "./CenterHandles";

export type CenterNodeType = Node<
  { name: string; level: number; formation: number; experience: number },
  "center"
>;

export default function CenterNode({ data }: NodeProps<CenterNodeType>) {
  const { t } = useTranslation();

  return (
    <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border border-amber-400/70 bg-black text-center">
      <CenterHandles />
      <div className="text-xs text-slate-500">{data.name}</div>
      <div className="font-display text-3xl font-semibold text-white">
        {t("tree.level", { level: data.level })}
      </div>
      <div className="mt-1 text-[11px] leading-tight text-slate-500">
        {t("tree.formationYears", { count: round1(data.formation) })}
      </div>
      <div className="text-[11px] leading-tight text-slate-500">
        {t("tree.experienceYears", { count: round1(data.experience) })}
      </div>
    </div>
  );
}
