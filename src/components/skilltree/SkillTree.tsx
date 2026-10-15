import { useMemo } from 'react'
import { ReactFlow, Background, BackgroundVariant, Controls, ViewportPortal } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import CenterNode from './CenterNode'
import HubNode from './HubNode'
import SkillNode from './SkillNode'
import { buildGraph } from './buildGraph'

const nodeTypes = { center: CenterNode, hub: HubNode, skill: SkillNode }

interface Props {
  embedded?: boolean // true: não rouba o scroll nem o toque da página
  className?: string // altura e margens, ex: 'h-[75vh]'
}

export default function SkillTree({ embedded = false, className = 'h-[70vh]' }: Props) {
  const { nodes, edges, dividers } = useMemo(() => buildGraph(), [])

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 ${className}`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        colorMode="dark"
        fitView
        fitViewOptions={{ padding: 0.12 }}
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
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.2} color="#1e293b" />
        <ViewportPortal>
          <svg
            width="1"
            height="1"
            style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none' }}
          >
            {dividers.map((d) => (
              <line
                key={d.id}
                x1={0}
                y1={0}
                x2={d.x}
                y2={d.y}
                stroke="#1e293b"
                strokeWidth={2}
                strokeDasharray="8 10"
              />
            ))}
          </svg>
        </ViewportPortal>
        {!embedded && <Controls showInteractive={false} />}
      </ReactFlow>
    </div>
  )
}
