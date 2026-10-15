import { Handle, Position } from '@xyflow/react'

// Ligações no centro do nó (invisíveis), para as linhas saírem em raio.
const style = {
  left: '50%',
  top: '50%',
  width: 1,
  height: 1,
  minWidth: 0,
  minHeight: 0,
  border: 0,
  background: 'transparent',
  opacity: 0,
  pointerEvents: 'none' as const,
}

export default function CenterHandles() {
  return (
    <>
      <Handle type="target" position={Position.Top} style={style} isConnectable={false} />
      <Handle type="source" position={Position.Top} style={style} isConnectable={false} />
    </>
  )
}
