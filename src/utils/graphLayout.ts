import type { Edge, Node } from '@xyflow/react'
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
} from 'd3-force'
import { CIRCLE_SIZE } from '../components/CircleNode'

const BASE_RADIUS_STEP = 220
const HALF = CIRCLE_SIZE / 2
const NODE_GAP = 24
const COLLIDE_RADIUS = HALF + NODE_GAP / 2
const RELAX_ITERATIONS = 240

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

function getRootId(nodes: Node[], edges: Edge[]): string | undefined {
  const labeledRoot = nodes.find((node) => node.data?.label === 'Non-Duality')?.id
  if (labeledRoot) return labeledRoot

  const hasParent = new Set<string>()
  for (const edge of edges) hasParent.add(edge.target)
  return nodes.find((node) => !hasParent.has(node.id))?.id
}

function buildChildrenMap(nodes: Node[], edges: Edge[]): Map<string, string[]> {
  const children = new Map<string, string[]>()
  for (const node of nodes) children.set(node.id, [])
  for (const edge of edges) {
    children.get(edge.source)?.push(edge.target)
  }
  return children
}

function countLeaves(id: string, children: Map<string, string[]>): number {
  const kids = children.get(id) ?? []
  if (kids.length === 0) return 1
  return kids.reduce((sum, kid) => sum + countLeaves(kid, children), 0)
}

function minRadiusForSector(sectorWidth: number): number {
  if (sectorWidth <= 0) return BASE_RADIUS_STEP
  const minAngle = sectorWidth * 0.85
  const sinHalf = Math.sin(minAngle / 2)
  if (sinHalf <= 0) return BASE_RADIUS_STEP
  return (CIRCLE_SIZE + NODE_GAP) / (2 * sinHalf)
}

function computeRadialPositions(
  nodes: Node[],
  edges: Edge[],
  rootId: string,
): Map<string, { x: number; y: number }> {
  const children = buildChildrenMap(nodes, edges)
  const leafCounts = new Map<string, number>()
  for (const node of nodes) {
    leafCounts.set(node.id, countLeaves(node.id, children))
  }

  const positions = new Map<string, { x: number; y: number }>()
  const sectors = new Map<string, { start: number; end: number }>()
  const assigned = new Set<string>()

  positions.set(rootId, { x: -HALF, y: -HALF })
  sectors.set(rootId, { start: 0, end: 2 * Math.PI })
  assigned.add(rootId)

  let frontier = [rootId]
  let level = 1

  while (frontier.length > 0) {
    const next: string[] = []
    for (const id of frontier) {
      const kids = (children.get(id) ?? []).filter((kid) => !assigned.has(kid))
      if (kids.length === 0) continue

      const { start, end } = sectors.get(id)!
      const sectorWidth = end - start
      const totalLeaves = kids.reduce((sum, kid) => sum + (leafCounts.get(kid) ?? 1), 0)
      let offset = start

      for (const kid of kids) {
        const kidLeaves = leafCounts.get(kid) ?? 1
        const kidSectorWidth = (kidLeaves / totalLeaves) * sectorWidth
        const angle = offset + kidSectorWidth / 2
        const r = Math.max(level * BASE_RADIUS_STEP, minRadiusForSector(kidSectorWidth))

        positions.set(kid, {
          x: r * Math.cos(angle) - HALF,
          y: r * Math.sin(angle) - HALF,
        })
        sectors.set(kid, { start: offset, end: offset + kidSectorWidth })
        assigned.add(kid)
        next.push(kid)
        offset += kidSectorWidth
      }
    }
    frontier = next
    level++
  }

  const unplaced = nodes.filter((node) => !positions.has(node.id))
  unplaced.forEach((node, index) => {
    const angle = (index / Math.max(unplaced.length, 1)) * Math.PI * 2
    const r = level * BASE_RADIUS_STEP
    positions.set(node.id, {
      x: r * Math.cos(angle) - HALF,
      y: r * Math.sin(angle) - HALF,
    })
  })

  return positions
}

function relaxOverlaps(
  nodes: Node[],
  edges: Edge[],
  positions: Map<string, { x: number; y: number }>,
  rootId: string,
): Map<string, { x: number; y: number }> {
  const simNodes: SimNode[] = nodes.map((node) => {
    const position = positions.get(node.id) ?? { x: 0, y: 0 }
    return {
      id: node.id,
      x: position.x + HALF,
      y: position.y + HALF,
    }
  })

  const root = simNodes.find((node) => node.id === rootId)
  if (root) {
    root.fx = 0
    root.fy = 0
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
        .distance(BASE_RADIUS_STEP * 0.85)
        .strength(0.08),
    )
    .force('charge', forceManyBody().strength(-180))
    .force('collide', forceCollide(COLLIDE_RADIUS).strength(1).iterations(3))
    .stop()

  for (let i = 0; i < RELAX_ITERATIONS; i++) {
    simulation.tick()
  }

  return new Map(
    simNodes.map((node) => [node.id, { x: node.x - HALF, y: node.y - HALF }]),
  )
}

export function applyRadialLayout(nodes: Node[], edges: Edge[]): Node[] {
  if (nodes.length === 0) return nodes

  const rootId = getRootId(nodes, edges)
  if (!rootId) return nodes

  const radialPositions = computeRadialPositions(nodes, edges, rootId)
  const relaxedPositions = relaxOverlaps(nodes, edges, radialPositions, rootId)

  return nodes.map((node) => ({
    ...node,
    position: relaxedPositions.get(node.id) ?? { x: 0, y: 0 },
  }))
}
