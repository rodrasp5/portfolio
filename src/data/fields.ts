import type { Field } from "./types";

// A ordem define a posição: o 1.º fica no setor superior esquerdo e os seguintes
// seguem no sentido dos ponteiros do relógio.
export const fields: Field[] = [
  { id: "frontend", name: { pt: "Front end", en: "Front end" } },
  { id: "backend", name: { pt: "Back end", en: "Back end" } },
  { id: "data", name: { pt: "Dados e IA", en: "Data & AI" } },
  { id: "devops", name: { pt: "DevOps e Sistemas", en: "DevOps & Systems" } },
  { id: "security", name: { pt: "Segurança", en: "Security" } },
];
