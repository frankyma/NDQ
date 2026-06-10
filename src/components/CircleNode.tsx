import { Handle, Position, type NodeProps } from '@xyflow/react'

export const CIRCLE_SIZE = 145

export function CircleNode({ data }: NodeProps) {
  const label = data.label as string
  const background = (data.background as string | undefined) ?? '#fff'
  const border = (data.border as string | undefined) ?? '#555'
  const color = (data.color as string | undefined) ?? '#111'
  return (
    <div
      style={{
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: '50%',
        background,
        border: `2px solid ${border}`,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.15,
        textAlign: 'center',
        padding: 4,
        boxSizing: 'border-box',
        cursor: 'pointer',
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
