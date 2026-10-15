import type { Edge } from "@xyflow/react";
import { fields } from "../../data/fields";
import { site } from "../../data/site";
import type { Project } from "../../data/types";
import { deriveSkills, type DerivedSkill } from "../../lib/deriveSkills";
import { getProfileLevel } from "../../lib/profileLevel";
import type { CenterNodeType } from "./CenterNode";
import type { HubNodeType } from "./HubNode";
import type { SkillNodeType } from "./SkillNode";

export type GraphNode = CenterNodeType | HubNodeType | SkillNodeType;

// Medidas (px) dos nós, usadas para os centrar nas posições calculadas
const CENTER = { w: 176, h: 176 };
const HUB = { w: 144, h: 92, radius: 190 };
const SKILL = { w: 132, h: 112, firstRing: 340, ringGap: 170, gap: 24 };
const SPREAD = 0.72; // fração do setor usada para espalhar os nós

const LOCKED_EDGE = {
  stroke: "#334155",
  strokeWidth: 1.5,
  strokeDasharray: "6 6",
};
const activeEdge = (color: string) => ({
  stroke: color,
  strokeWidth: 2.5,
  filter: `drop-shadow(0 0 4px ${color})`,
});

const rad = (deg: number) => (deg * Math.PI) / 180;
const at = (angle: number, radius: number, w: number, h: number) => ({
  x: Math.cos(angle) * radius - w / 2,
  y: Math.sin(angle) * radius - h / 2,
});

const makeEdge = (
  source: string,
  target: string,
  color: string,
  active: boolean,
): Edge => ({
  id: `${source}>${target}`,
  source,
  target,
  type: "straight",
  animated: active,
  style: active ? activeEdge(color) : LOCKED_EDGE,
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
  const skills = deriveSkills(projects);
  const byId = new Map(skills.map((s) => [s.id, s]));
  const colorOf = new Map(fields.map((f) => [f.id, f.color]));
  const { formation, experience, level } = getProfileLevel();

  const step = 360 / fields.length;
  let maxRadius = HUB.radius;

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

  fields.forEach((field, i) => {
    // 1.º campo no setor superior esquerdo, seguintes no sentido dos ponteiros do relógio
    const sectorCenter = rad(-90 - step / 2 + i * step);
    const inField = skills.filter((s) => s.field === field.id);
    const done = inField.filter((s) => s.level > 0).length;
    const hubId = `hub-${field.id}`;

    nodes.push({
      id: hubId,
      type: "hub",
      position: at(sectorCenter, HUB.radius, HUB.w, HUB.h),
      draggable: false,
      data: {
        name: field.name,
        icon: field.icon,
        color: field.color,
        done,
        total: inField.length,
      },
    });
    edges.push(makeEdge("center", hubId, field.color, done > 0));

    const placed = layoutField(inField, sectorCenter, rad(step) * SPREAD);

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
        d === 0 ? SKILL.firstRing : radii[d - 1] + SKILL.ringGap,
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
        data: {
          name: s.name,
          category: s.category,
          color: field.color,
          level: s.level,
          count: s.count,
        },
      });

      if (depth === 0)
        edges.push(makeEdge(hubId, s.id, field.color, s.level > 0));
      s.requires.forEach((r) => {
        const req = byId.get(r);
        if (!req) return;
        edges.push(
          makeEdge(
            r,
            s.id,
            colorOf.get(req.field) ?? field.color,
            req.level > 0 && s.level > 0,
          ),
        );
      });
    });
  });

  skills
    .filter((s) => !colorOf.has(s.field))
    .forEach((s) =>
      console.warn(
        `[skill tree] "${s.id}" usa o campo "${s.field}", que não existe em fields.ts`,
      ),
    );

  // Linhas que separam os setores (como no esboço)
  const dividers = fields.map((_, i) => {
    const a = rad(-90 + i * step);
    const len = maxRadius + 100;
    return { id: `divider-${i}`, x: Math.cos(a) * len, y: Math.sin(a) * len };
  });

  return { nodes, edges, dividers };
}
