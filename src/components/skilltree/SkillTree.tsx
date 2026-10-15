import { useEffect, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  ViewportPortal,
  useReactFlow,
  useStore,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useProjects } from "../../lib/projectsContext";
import CenterNode from "./CenterNode";
import HubNode from "./HubNode";
import SkillNode from "./SkillNode";
import { buildGraph } from "./buildGraph";
import { COLORS } from "./theme";

const nodeTypes = { center: CenterNode, hub: HubNode, skill: SkillNode };

// Enquadra uma área simétrica à volta do centro (o nó central fica sempre ao meio)
// e repete quando o contentor muda de tamanho ou os nós mudam
function Refit({ radius, trigger }: { radius: number; trigger: unknown }) {
  const { fitBounds } = useReactFlow();
  const width = useStore((s) => s.width);
  const height = useStore((s) => s.height);

  useEffect(() => {
    if (!width || !height) return;
    void fitBounds(
      { x: -radius, y: -radius, width: radius * 2, height: radius * 2 },
      { padding: 0.04, duration: 0 },
    );
  }, [fitBounds, width, height, radius, trigger]);

  return null;
}

interface Props {
  embedded?: boolean; // true: não rouba o scroll nem o toque da página
  className?: string; // altura e margens, ex: 'h-[75vh]'
}

export default function SkillTree({
  embedded = false,
  className = "h-[70vh]",
}: Props) {
  const { projects } = useProjects();
  const { nodes, edges, dividers, radius } = useMemo(
    () => buildGraph(projects),
    [projects],
  );

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        colorMode="dark"
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent" }}
        minZoom={0.2}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={!embedded}
        zoomOnScroll={!embedded}
        zoomOnPinch={!embedded}
        zoomOnDoubleClick={!embedded}
        preventScrolling={!embedded}
      >
        <Refit radius={radius} trigger={nodes} />
        <ViewportPortal>
          <svg
            width="1"
            height="1"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            {dividers.map((d) => (
              <line
                key={d.id}
                x1={0}
                y1={0}
                x2={d.x}
                y2={d.y}
                stroke={COLORS.line}
                strokeWidth={1}
                strokeDasharray="4 8"
              />
            ))}
          </svg>
        </ViewportPortal>
        {!embedded && <Controls showInteractive={false} />}
      </ReactFlow>
    </div>
  );
}
