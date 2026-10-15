import type { Node, NodeProps } from "@xyflow/react";
import { useTranslation } from "react-i18next";
import { useLocalized, type Localizable } from "../../i18n/useLocalized";
import CenterHandles from "./CenterHandles";

export type HubNodeType = Node<
  { name: Localizable; done: number; total: number },
  "hub"
>;

export default function HubNode({ data }: NodeProps<HubNodeType>) {
  const { t } = useTranslation();
  const { l } = useLocalized();
  const active = data.done > 0;

  return (
    <div
      className={`w-32 rounded-full border bg-black px-4 py-2 text-center ${
        active
          ? "border-slate-500 text-white"
          : "border-slate-800 text-slate-600"
      }`}
    >
      <CenterHandles />
      <div className="text-sm font-medium">{l(data.name)}</div>
      <div className="text-[11px] text-slate-500">
        {t("tree.fieldProgress", { done: data.done, total: data.total })}
      </div>
    </div>
  );
}
