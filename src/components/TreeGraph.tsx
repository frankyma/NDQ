import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  type Node,
  type Edge,
  type NodeMouseHandler,
  type NodeTypes,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { applyRadialLayout } from '../utils/graphLayout'
import { CircleNode } from './CircleNode'

const nodeTypes: NodeTypes = { circle: CircleNode }
const defaultEdgeOptions = { type: 'straight' }

interface TreeGraphProps {
  nodes: Node[]
  edges: Edge[]
  onNodeClick?: NodeMouseHandler
}

function Graph({ nodes: rawNodes, edges, onNodeClick }: TreeGraphProps) {
  const nodes = applyRadialLayout(rawNodes, edges)

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      onNodeClick={onNodeClick}
      fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  )
}

export function TreeGraph(props: TreeGraphProps) {
  return (
    <ReactFlowProvider>
      <Graph {...props} />
    </ReactFlowProvider>
  )
}
