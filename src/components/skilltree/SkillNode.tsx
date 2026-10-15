import type { Node, NodeProps } from "@xyflow/react";
import { useTranslation } from "react-i18next";
import CenterHandles from "./CenterHandles";
import LevelPips from "./LevelPips";

export type SkillNodeType = Node<
  {
    name: string;
    level: number; // 0 bloqueada, 1 a 3
    count: number; // nº de projetos que usam a skill
  },
  "skill"
>;

export default function SkillNode({ data }: NodeProps<SkillNodeType>) {
  const { t } = useTranslation();
  const locked = data.level === 0;

  return (
    <div
      className={`w-[132px] rounded-lg border bg-black px-3 py-2 text-center ${
        locked
          ? "border-dashed border-slate-800 text-slate-600"
          : "border-slate-500 text-white"
      }`}
    >
      <CenterHandles />
      <div className="text-sm font-medium">{data.name}</div>
      <div className="mt-1.5">
        <LevelPips level={data.level} />
      </div>
      {!locked && (
        <div className="mt-1 text-[11px] text-slate-500">
          {data.count > 0
            ? t("tree.projects", { count: data.count })
            : t("tree.base")}
        </div>
      )}
    </div>
  );
}
