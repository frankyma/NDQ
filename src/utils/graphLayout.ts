import type { Node, Edge } from '@xyflow/react'
import { CIRCLE_SIZE } from '../components/CircleNode'

const RADIUS_STEP = 160
const HALF = CIRCLE_SIZE / 2

export function applyRadialLayout(nodes: Node[], edges: Edge[]): Node[] {
  if (nodes.length === 0) return nodes

  // Build children map and find root (node with no incoming edges)
  const children = new Map<string, string[]>()
  const hasParent = new Set<string>()
  for (const node of nodes) children.set(node.id, [])
  for (const edge of edges) {
    children.get(edge.source)?.push(edge.target)
    hasParent.add(edge.target)
  }

  const root = nodes.find((n) => !hasParent.has(n.id))
  if (!root) return nodes

  const positions = new Map<string, { x: number; y: number }>()
  // Each node gets an angular sector [start, end] to distribute its children within
  const sectors = new Map<string, { start: number; end: number }>()

  positions.set(root.id, { x: -HALF, y: -HALF })
  sectors.set(root.id, { start: 0, end: 2 * Math.PI })

  let frontier = [root.id]
  let level = 1

  while (frontier.length > 0) {
    const next: string[] = []
    for (const id of frontier) {
      const kids = children.get(id) ?? []
      if (kids.length === 0) continue
      const { start, end } = sectors.get(id)!
      const step = (end - start) / kids.length
      kids.forEach((kid, i) => {
        const angle = start + step * i + step / 2
        const r = level * RADIUS_STEP
        positions.set(kid, { x: r * Math.cos(angle) - HALF, y: r * Math.sin(angle) - HALF })
        sectors.set(kid, { start: start + step * i, end: start + step * (i + 1) })
        next.push(kid)
      })
    }
    frontier = next
    level++
  }

  return nodes.map((node) => ({
    ...node,
    position: positions.get(node.id) ?? { x: 0, y: 0 },
  }))
}
