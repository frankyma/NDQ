import type { Edge, Node } from '@xyflow/react'
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
} from 'd3-force'
import { CIRCLE_SIZE } from '../components/CircleNode'

const HALF = CIRCLE_SIZE / 2
const INITIAL_RADIUS = 220
const ITERATIONS = 320

type SimNode = {
  id: string
  x: number
  y: number
  fx?: number
  fy?: number
}

type SimLink = {
  source: string
  target: string
}

export function applyForceLayout(
  nodes: Node[],
  edges: Edge[],
  fixedCenterNodeId = '1',
): Node[] {
  if (nodes.length === 0) return nodes

  const simNodes: SimNode[] = nodes.map((node, index) => {
    const angle = (index / nodes.length) * Math.PI * 2
    return {
      id: node.id,
      x: INITIAL_RADIUS * Math.cos(angle),
      y: INITIAL_RADIUS * Math.sin(angle),
    }
  })

  const centerNode = simNodes.find((node) => node.id === fixedCenterNodeId)
  if (centerNode) {
    centerNode.fx = 0
    centerNode.fy = 0
  }

  const simLinks: SimLink[] = edges.map((edge) => ({
    source: edge.source,
    target: edge.target,
  }))

  const simulation = forceSimulation(simNodes)
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
    .stop()

  for (let i = 0; i < ITERATIONS; i++) {
    simulation.tick()
  }

  const positions = new Map(
    simNodes.map((node) => [node.id, { x: node.x - HALF, y: node.y - HALF }]),
  )

  return nodes.map((node) => ({
    ...node,
    position: positions.get(node.id) ?? { x: 0, y: 0 },
  }))
}
