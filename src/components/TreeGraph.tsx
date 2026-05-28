import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  type Node,
  type Edge,
  type NodeMouseHandler,
  type NodeTypes,
} from '@xyflow/react'
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type Simulation,
  type SimulationLinkDatum,
} from 'd3-force'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import '@xyflow/react/dist/style.css'
import { applyForceLayout } from '../utils/graphLayout'
import { CIRCLE_SIZE, CircleNode } from './CircleNode'

const nodeTypes: NodeTypes = { circle: CircleNode }
const defaultEdgeOptions = { type: 'straight' }
const CENTER_NODE_ID = '1'
const CIRCLE_HALF = CIRCLE_SIZE / 2

type SimNode = {
  id: string
  x: number
  y: number
  fx?: number
  fy?: number
}

type SimLink = SimulationLinkDatum<SimNode>

interface TreeGraphProps {
  nodes: Node[]
  edges: Edge[]
  onNodeClick?: NodeMouseHandler
}

function Graph({ nodes: rawNodes, edges, onNodeClick }: TreeGraphProps) {
  const simulationRef = useRef<Simulation<SimNode, SimLink> | null>(null)
  const simNodesByIdRef = useRef<Map<string, SimNode>>(new Map())
  const initialLayout = useMemo(() => applyForceLayout(rawNodes, edges, CENTER_NODE_ID), [rawNodes, edges])
  const [nodes, setNodes, onNodesChange] = useNodesState(initialLayout)

  useEffect(() => {
    setNodes(initialLayout)
  }, [initialLayout, setNodes])

  useEffect(() => {
    simulationRef.current?.stop()

    const simNodes: SimNode[] = initialLayout.map((node) => ({
      id: node.id,
      x: node.position.x + CIRCLE_HALF,
      y: node.position.y + CIRCLE_HALF,
    }))

    const centerNode = simNodes.find((node) => node.id === CENTER_NODE_ID)
    if (centerNode) {
      centerNode.fx = 0
      centerNode.fy = 0
    }

    simNodesByIdRef.current = new Map(simNodes.map((node) => [node.id, node]))

    const simLinks: SimLink[] = edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
    }))

    const simulation = forceSimulation<SimNode>(simNodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(simLinks)
          .id((node) => node.id)
          .distance(140)
          .strength(0.35),
      )
      .force('charge', forceManyBody().strength(-520))
      .force('collide', forceCollide(CIRCLE_SIZE * 0.85))
      .force('center', forceCenter(0, 0))
      .alpha(1)
      .alphaDecay(0.03)
      .on('tick', () => {
        setNodes((currentNodes) =>
          currentNodes.map((node) => {
            const simNode = simNodesByIdRef.current.get(node.id)
            if (!simNode) return node
            return {
              ...node,
              position: {
                x: simNode.x - CIRCLE_HALF,
                y: simNode.y - CIRCLE_HALF,
              },
            }
          }),
        )
      })

    simulationRef.current = simulation

    return () => {
      simulation.stop()
    }
  }, [edges, initialLayout, setNodes])

  const handleNodeDragStart: NodeMouseHandler = useCallback((_event, node) => {
    if (node.id === CENTER_NODE_ID) return

    const simulation = simulationRef.current
    const simNode = simNodesByIdRef.current.get(node.id)
    if (!simulation || !simNode) return

    simulation.alphaTarget(0.25).restart()
    simNode.fx = node.position.x + CIRCLE_HALF
    simNode.fy = node.position.y + CIRCLE_HALF
  }, [])

  const handleNodeDrag: NodeMouseHandler = useCallback((_event, node) => {
    if (node.id === CENTER_NODE_ID) return

    const simNode = simNodesByIdRef.current.get(node.id)
    if (!simNode) return

    simNode.fx = node.position.x + CIRCLE_HALF
    simNode.fy = node.position.y + CIRCLE_HALF
  }, [])

  const handleNodeDragStop: NodeMouseHandler = useCallback((_event, node) => {
    const simulation = simulationRef.current
    const simNode = simNodesByIdRef.current.get(node.id)
    if (!simulation || !simNode) return

    if (node.id === CENTER_NODE_ID) {
      simNode.fx = 0
      simNode.fy = 0
    } else {
      simNode.fx = undefined
      simNode.fy = undefined
    }

    simulation.alphaTarget(0)
  }, [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      onNodesChange={onNodesChange}
      onNodeClick={onNodeClick}
      onNodeDragStart={handleNodeDragStart}
      onNodeDrag={handleNodeDrag}
      onNodeDragStop={handleNodeDragStop}
      nodesDraggable
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
