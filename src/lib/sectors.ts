import { fields } from "../data/fields";
import type { Field } from "../data/types";
import type { DerivedSkill } from "./deriveSkills";

// Setor automático para skills cujo campo não existe em fields.ts
export const OTHER_FIELD: Field = {
  id: "other",
  name: { pt: "Outros", en: "Other" },
};

// Devolve os setores a desenhar e as skills já com o campo normalizado
export function groupBySector(skills: DerivedSkill[]) {
  const known = new Set(fields.map((f) => f.id));
  const normalized = skills.map((s) =>
    known.has(s.field) ? s : { ...s, field: OTHER_FIELD.id },
  );
  const needsOther = normalized.some(
    (s) => s.field === OTHER_FIELD.id && !known.has(OTHER_FIELD.id),
  );
  return {
    sectors: needsOther ? [...fields, OTHER_FIELD] : fields,
    skills: normalized,
  };
}
