import type { Edge } from "@xyflow/react";
import { site } from "../../data/site";
import type { Project } from "../../data/types";
import { deriveSkills, type DerivedSkill } from "../../lib/deriveSkills";
import { getProfileLevel } from "../../lib/profileLevel";
import { groupBySector } from "../../lib/sectors";
import type { CenterNodeType } from "./CenterNode";
import type { HubNodeType } from "./HubNode";
import type { SkillNodeType } from "./SkillNode";
import { COLORS } from "./theme";

export type GraphNode = CenterNodeType | HubNodeType | SkillNodeType;

// 'next': mostra as desbloqueadas e o próximo passo de cada uma (árvore limpa)
// 'all': mostra todas, incluindo as bloqueadas sem ligação a nada desbloqueado
const LOCKED_MODE: "next" | "all" = "next";

// Medidas (px) dos nós, usadas para os centrar nas posições calculadas
const CENTER = { w: 160, h: 160 };
const HUB = { w: 128, h: 52, minRadius: 190, maxRadius: 700, gap: 28 };
const SKILL = { w: 132, h: 76, ringGap: 140, gap: 24, hubClearance: 130 };
const SPREAD = 0.86; // fração do setor usada para espalhar os nós
const BASE_WEIGHT = 2; // peso mínimo de um setor, mesmo sem skills

const rad = (deg: number) => (deg * Math.PI) / 180;
const at = (angle: number, radius: number, w: number, h: number) => ({
  x: Math.cos(angle) * radius - w / 2,
  y: Math.sin(angle) * radius - h / 2,
});

const makeEdge = (source: string, target: string, active: boolean): Edge => ({
  id: `${source}>${target}`,
  source,
  target,
  type: "straight",
  style: active
    ? { stroke: COLORS.lineActive, strokeWidth: 1.5 }
    : { stroke: COLORS.line, strokeWidth: 1, strokeDasharray: "4 6" },
});

interface Placed {
  skill: DerivedSkill;
  depth: number; // anel: 0 junto ao campo, 1 a seguir, etc.
  angle: number;
}

// Reparte o setor do campo pelas skills: cada raiz recebe uma fatia proporcional
// ao nº de skills que dela dependem, e as dependentes ficam na fatia da skill de que precisam.
function layoutField(
  inField: DerivedSkill[],
  center: number,
  arc: number,
): Placed[] {
  const ids = new Set(inField.map((s) => s.id));
  const children = new Map<string, DerivedSkill[]>();
  const roots: DerivedSkill[] = [];

  inField.forEach((s) => {
    const parent = s.requires.find((r) => r !== s.id && ids.has(r));
    if (parent) children.set(parent, [...(children.get(parent) ?? []), s]);
    else roots.push(s);
  });

  const kidsOf = (s: DerivedSkill, path: Set<string>) =>
    (children.get(s.id) ?? []).filter((k) => !path.has(k.id) && k.id !== s.id);

  const leaves = (s: DerivedSkill, path: Set<string>): number => {
    const next = new Set([...path, s.id]);
    const kids = kidsOf(s, next);
    return kids.length ? kids.reduce((sum, k) => sum + leaves(k, next), 0) : 1;
  };

  const placed: Placed[] = [];
  const visited = new Set<string>();

  const place = (
    s: DerivedSkill,
    depth: number,
    start: number,
    end: number,
    path: Set<string>,
  ) => {
    if (visited.has(s.id)) return;
    visited.add(s.id);
    placed.push({ skill: s, depth, angle: (start + end) / 2 });

    const next = new Set([...path, s.id]);
    const kids = kidsOf(s, next);
    const total = kids.reduce((sum, k) => sum + leaves(k, next), 0);
    let cursor = start;
    kids.forEach((k) => {
      const span = ((end - start) * leaves(k, next)) / total;
      place(k, depth + 1, cursor, cursor + span, next);
      cursor += span;
    });
  };

  const total = roots.reduce((sum, r) => sum + leaves(r, new Set()), 0);
  let cursor = center - arc / 2;
  roots.forEach((r) => {
    const span = (arc * leaves(r, new Set())) / total;
    place(r, 0, cursor, cursor + span, new Set());
    cursor += span;
  });

  inField
    .filter((s) => !visited.has(s.id))
    .forEach((s) =>
      console.warn(
        `[skill tree] "${s.id}" tem pré-requisitos em ciclo e não foi desenhada`,
      ),
    );

  return placed;
}

export function buildGraph(projects: Project[]) {
  const { sectors, skills: all } = groupBySector(deriveSkills(projects));
  const byId = new Map(all.map((s) => [s.id, s]));
  const { formation, experience, level } = getProfileLevel();

  // Skills desenhadas: desbloqueadas, ou (modo 'next') o próximo passo de uma desbloqueada
  const isShown = (s: DerivedSkill) =>
    LOCKED_MODE === "all" ||
    s.level > 0 ||
    s.requires.some((r) => (byId.get(r)?.level ?? 0) > 0);
  const skills = all.filter(isShown);
  const shownIds = new Set(skills.map((s) => s.id));

  // Cada setor ocupa uma fatia proporcional ao nº de skills desenhadas
  const weights = sectors.map(
    (f) => BASE_WEIGHT + skills.filter((s) => s.field === f.id).length,
  );
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const spans = weights.map((w) => rad((360 * w) / totalWeight));

  // O 1.º setor termina no topo; os seguintes seguem no sentido dos ponteiros do relógio
  const starts: number[] = [];
  let cursor = rad(-90) - spans[0];
  spans.forEach((span) => {
    starts.push(cursor);
    cursor += span;
  });

  // Raio dos campos: o mínimo para os vizinhos não se sobreporem
  const minSpan = Math.min(...spans);
  const hubRadius = Math.min(
    HUB.maxRadius,
    Math.max(
      HUB.minRadius,
      (HUB.w + HUB.gap) / (2 * Math.sin(Math.min(minSpan, Math.PI) / 2)),
    ),
  );
  const firstRing = hubRadius + SKILL.hubClearance;
  let maxRadius = hubRadius;

  const nodes: GraphNode[] = [
    {
      id: "center",
      type: "center",
      position: { x: -CENTER.w / 2, y: -CENTER.h / 2 },
      draggable: false,
      data: { name: site.name, level, formation, experience },
    },
  ];
  const edges: Edge[] = [];

  sectors.forEach((field, i) => {
    const sectorCenter = starts[i] + spans[i] / 2;
    const inField = skills.filter((s) => s.field === field.id);
    const catalog = all.filter((s) => s.field === field.id); // o campo conta o catálogo todo
    const done = catalog.filter((s) => s.level > 0).length;
    const hubId = `hub-${field.id}`;

    nodes.push({
      id: hubId,
      type: "hub",
      position: at(sectorCenter, hubRadius, HUB.w, HUB.h),
      draggable: false,
      data: { name: field.name, done, total: catalog.length },
    });
    edges.push(makeEdge("center", hubId, done > 0));

    const placed = layoutField(inField, sectorCenter, spans[i] * SPREAD);

    // Raio de cada anel: o mínimo para os nós vizinhos não se sobreporem
    const maxDepth = Math.max(-1, ...placed.map((p) => p.depth));
    const radii: number[] = [];
    for (let d = 0; d <= maxDepth; d++) {
      const row = placed
        .filter((p) => p.depth === d)
        .sort((a, b) => a.angle - b.angle);
      let needed = 0;
      for (let k = 1; k < row.length; k++) {
        needed = Math.max(
          needed,
          (SKILL.w + SKILL.gap) / (row[k].angle - row[k - 1].angle),
        );
      }
      radii[d] = Math.max(
        d === 0 ? firstRing : radii[d - 1] + SKILL.ringGap,
        needed,
      );
      maxRadius = Math.max(maxRadius, radii[d]);
    }

    placed.forEach(({ skill: s, depth, angle }) => {
      nodes.push({
        id: s.id,
        type: "skill",
        position: at(angle, radii[depth], SKILL.w, SKILL.h),
        draggable: false,
        data: { name: s.name, level: s.level, count: s.count },
      });

      if (depth === 0) edges.push(makeEdge(hubId, s.id, s.level > 0));
      s.requires.forEach((r) => {
        const req = byId.get(r);
        if (!req || !shownIds.has(r)) return;
        edges.push(makeEdge(r, s.id, req.level > 0 && s.level > 0));
      });
    });
  });

  // Linhas que separam os setores
  const dividers = starts.map((a, i) => {
    const len = maxRadius + 100;
    return { id: `divider-${i}`, x: Math.cos(a) * len, y: Math.sin(a) * len };
  });

  return { nodes, edges, dividers, radius: maxRadius + SKILL.w };
}
