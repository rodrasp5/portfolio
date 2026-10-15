import type { Localizable } from "../i18n/useLocalized";

export type SkillCategory =
  | "linguagem"
  | "framework"
  | "base-de-dados"
  | "ferramenta"
  | "conceito";

// Campo = setor da skill tree (Front end, Back end, Segurança...)
export interface Field {
  id: string;
  name: Localizable;
  color: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory; // tipo de tecnologia
  field: string; // id de um Field (setor da árvore onde aparece)
  requires?: string[]; // pré-requisitos (ex: laravel requer php)
}

export interface ProjectLink {
  label: Localizable;
  url: string;
}

export type ProjectStatus = "concluido" | "producao";

// Bloco da galeria: imagem com descrição ao lado, à esquerda ou à direita
export interface GalleryBlock {
  image: string;
  caption: Localizable;
  side: "left" | "right";
}

export interface Project {
  slug: string;
  name: Localizable;
  description: Localizable;
  status: ProjectStatus;
  gallery: GalleryBlock[];
  links: ProjectLink[];
  skills: string[]; // ids de Skill usadas neste projeto
  date: string; // 'YYYY-MM'
  featured?: boolean;
}
