import { useState } from "react";
import { useTranslation } from "react-i18next";
import { fields } from "../../data/fields";
import { skills } from "../../data/skills";
import { useLocalized } from "../../i18n/useLocalized";
import { Icon } from "./AdminUi";
import { input } from "./adminStyles";

interface Props {
  selected: Set<string>;
  onToggle: (id: string) => void;
}

// Escolha de tecnologias com pesquisa; as escolhidas ficam em cima
export default function SkillPicker({ selected, onToggle }: Props) {
  const { t } = useTranslation();
  const { l } = useLocalized();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const known = new Set(fields.map((f) => f.id));
  const groups = [
    ...fields.map((f) => ({
      id: f.id,
      name: l(f.name),
      items: skills.filter((s) => s.field === f.id),
    })),
    {
      id: "other",
      name: t("admin.skillsOther"),
      items: skills.filter((s) => !known.has(s.field)),
    },
  ]
    .map((g) => ({
      ...g,
      items: g.items.filter((s) => !q || s.name.toLowerCase().includes(q)),
    }))
    .filter((g) => g.items.length > 0);

  const chosen = skills.filter((s) => selected.has(s.id));

  return (
    <div className="space-y-4">
      {chosen.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-slate-500">
            {t("admin.skillsSelected", { count: chosen.length })}
          </p>
          <ul className="flex flex-wrap gap-2">
            {chosen.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onToggle(s.id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 py-1 pl-3 pr-2 text-xs text-white transition hover:bg-slate-700"
                >
                  {s.name}
                  <Icon name="close" size={12} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("admin.skillsSearch")}
        className={input}
      />

      <div className="max-h-80 space-y-4 overflow-y-auto pr-1">
        {groups.length === 0 && (
          <p className="text-sm text-slate-500">{t("admin.skillsNone")}</p>
        )}
        {groups.map((g) => (
          <div key={g.id}>
            <p className="mb-2 text-xs font-medium text-slate-400">{g.name}</p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => {
                const on = selected.has(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onToggle(s.id)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      on
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
