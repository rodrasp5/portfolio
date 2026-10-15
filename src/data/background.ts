import type { Localizable } from "../i18n/useLocalized";

// Datas no formato 'YYYY-MM'. Sem "end" significa que ainda está em curso.
export interface Period {
  start: string;
  end?: string;
}

export interface Education {
  id: string;
  title: Localizable;
  institution: string;
  period: Period;
  // Anos que contam para o nível. Se não for indicado, calcula-se pelas datas.
  years?: number;
}

export interface Experience {
  id: string;
  role: Localizable;
  company: string;
  period: Period;
  description?: Localizable;
  // Anos que contam para o nível. Se não for indicado, calcula-se pelas datas.
  // Com 0, a experiência aparece na lista mas não conta para o nível.
  years?: number;
}

export interface Certificate {
  id: string;
  title: Localizable;
  issuer: string;
  date: string; // 'YYYY-MM'
  url?: string;
}

// Formação: entra no cálculo do nível (6 anos no total).
export const education: Education[] = [
  {
    id: "leic",
    title: {
      pt: "Licenciatura em Engenharia Informática",
      en: "Bachelor's Degree in Computer Engineering",
    },
    institution: "IPLeiria (ESTG)",
    period: { start: "2023-09", end: "2026-07" },
    years: 3,
  },
  {
    id: "profissional",
    title: {
      pt: "Curso Profissional de Técnico de Informática - Sistemas",
      en: "Vocational Course: IT Technician (Systems)",
    },
    institution: "Colégio Dr. Luís Pereira da Costa (CDLPC)",
    period: { start: "2020-10", end: "2023-07" },
    years: 3,
  },
];

// Experiência profissional: entra no cálculo do nível, exceto com years: 0.
export const experiences: Experience[] = [
  {
    id: "happycode",
    role: { pt: "Professor Coadjuvante", en: "Teaching Assistant" },
    company: "HappyCode",
    period: { start: "2022-02", end: "2023-07" },
    description: {
      pt: "Apoio a aulas semanais de programação básica, raciocínio lógico e pensamento computacional para crianças e adolescentes (5 a 18 anos).",
      en: "Support for weekly classes in basic programming, logical reasoning and computational thinking for children and teenagers (ages 5 to 18).",
    },
    years: 0, // não conta para o nível
  },
];

// Certificados. Exemplo de entrada:
// { id: 'c1', title: 'Nome do certificado', issuer: 'Entidade', date: '2025-11', url: 'https://...' },
export const certificates: Certificate[] = [];
