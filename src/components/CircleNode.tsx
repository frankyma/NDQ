import { Handle, Position, type NodeProps } from '@xyflow/react'

export const CIRCLE_SIZE = 60

export function CircleNode({ data }: NodeProps) {
  const label = data.label as string
  return (
    <div
      style={{
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: '50%',
        background: '#fff',
        border: '2px solid #555',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        textAlign: 'center',
        padding: 4,
        boxSizing: 'border-box',
      }}
    >
      <Handle
        type="source"
        position={Position.Top}
        style={{ opacity: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      {label}
    </div>
  )
}
