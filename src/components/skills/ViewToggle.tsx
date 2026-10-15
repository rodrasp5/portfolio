import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type SkillsView = "tree" | "list";

interface Props {
  view: SkillsView;
  onChange: (view: SkillsView) => void;
}

const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const TreeIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="5" cy="5" r="1.8" />
    <circle cx="19" cy="5" r="1.8" />
    <circle cx="12" cy="20" r="1.8" />
    <path d="M10 10 6.3 6.3M14 10l3.7-3.7M12 14.5V18" />
  </svg>
);

const ListIcon = () => (
  <svg {...iconProps}>
    <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
  </svg>
);

export const ExpandIcon = () => (
  <svg {...iconProps}>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

const options: { id: SkillsView; label: string; icon: ReactNode }[] = [
  { id: "tree", label: "view.tree", icon: <TreeIcon /> },
  { id: "list", label: "view.list", icon: <ListIcon /> },
];

// Controlo segmentado: Árvore | Lista
export default function ViewToggle({ view, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <div
      role="group"
      className="inline-flex rounded-full border border-slate-800 p-0.5"
    >
      {options.map((o) => {
        const active = view === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              active ? "bg-white text-black" : "text-slate-400 hover:text-white"
            }`}
          >
            {o.icon}
            {t(o.label)}
          </button>
        );
      })}
    </div>
  );
}
