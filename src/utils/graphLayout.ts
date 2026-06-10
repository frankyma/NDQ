import type { Edge, Node } from "@xyflow/react";
import { CIRCLE_SIZE } from "../components/CircleNode";

const BASE_RADIUS_STEP = 120;
const HALF = CIRCLE_SIZE / 2;
const NODE_GAP = 12;
const MIN_CENTER_DISTANCE = CIRCLE_SIZE + NODE_GAP;
const RING_SCALE_STEP = 4;
const ANGLE_WEIGHT_BLEND = 0.5;

type Polar = { angle: number; radius: number };

function getRootId(nodes: Node[], edges: Edge[]): string | undefined {
  const labeledRoot = nodes.find(
    (node) => node.data?.label === "Non-Duality",
  )?.id;
  if (labeledRoot) return labeledRoot;

  const hasParent = new Set<string>();
  for (const edge of edges) hasParent.add(edge.target);
  return nodes.find((node) => !hasParent.has(node.id))?.id;
}

function buildChildrenMap(nodes: Node[], edges: Edge[]): Map<string, string[]> {
  const children = new Map<string, string[]>();
  for (const node of nodes) children.set(node.id, []);
  for (const edge of edges) {
    children.get(edge.source)?.push(edge.target);
  }
  return children;
}

function countLeaves(id: string, children: Map<string, string[]>): number {
  const kids = children.get(id) ?? [];
  if (kids.length === 0) return 1;
  return kids.reduce((sum, kid) => sum + countLeaves(kid, children), 0);
}

function computeDepths(
  rootId: string,
  nodes: Node[],
  edges: Edge[],
): Map<string, number> {
  const depths = new Map<string, number>();
  depths.set(rootId, 0);

  let frontier = [rootId];
  while (frontier.length > 0) {
    const next: string[] = [];
    for (const id of frontier) {
      const parentDepth = depths.get(id) ?? 0;
      for (const edge of edges) {
        if (edge.source !== id) continue;
        if (depths.has(edge.target)) continue;
        depths.set(edge.target, parentDepth + 1);
        next.push(edge.target);
      }
    }
    frontier = next;
  }

  for (const node of nodes) {
    if (!depths.has(node.id)) depths.set(node.id, 1);
  }

  return depths;
}

function polarToPosition({ angle, radius }: Polar): { x: number; y: number } {
  return {
    x: radius * Math.cos(angle) - HALF,
    y: radius * Math.sin(angle) - HALF,
  };
}

function centerDistance(a: Polar, b: Polar): number {
  const ax = a.radius * Math.cos(a.angle);
  const ay = a.radius * Math.sin(a.angle);
  const bx = b.radius * Math.cos(b.angle);
  const by = b.radius * Math.sin(b.angle);
  return Math.hypot(ax - bx, ay - by);
}

function countOverlaps(nodeIds: string[], polar: Map<string, Polar>): number {
  let overlaps = 0;
  for (let i = 0; i < nodeIds.length; i++) {
    for (let j = i + 1; j < nodeIds.length; j++) {
      const a = polar.get(nodeIds[i]);
      const b = polar.get(nodeIds[j]);
      if (!a || !b) continue;
      if (centerDistance(a, b) < MIN_CENTER_DISTANCE) overlaps++;
    }
  }
  return overlaps;
}

function computeRadialAngles(
  nodes: Node[],
  edges: Edge[],
  rootId: string,
): Map<string, number> {
  const children = buildChildrenMap(nodes, edges);
  const leafCounts = new Map<string, number>();
  for (const node of nodes) {
    leafCounts.set(node.id, countLeaves(node.id, children));
  }

  const angles = new Map<string, number>();
  const sectors = new Map<string, { start: number; end: number }>();
  const assigned = new Set<string>();

  angles.set(rootId, 0);
  sectors.set(rootId, { start: 0, end: 2 * Math.PI });
  assigned.add(rootId);

  let frontier = [rootId];

  while (frontier.length > 0) {
    const next: string[] = [];
    for (const id of frontier) {
      const kids = (children.get(id) ?? []).filter((kid) => !assigned.has(kid));
      if (kids.length === 0) continue;

      const { start, end } = sectors.get(id)!;
      const sectorWidth = end - start;
      const weights = kids.map(
        (kid) => ANGLE_WEIGHT_BLEND * (leafCounts.get(kid) ?? 1) + (1 - ANGLE_WEIGHT_BLEND),
      );
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      let offset = start;

      kids.forEach((kid, index) => {
        const kidSectorWidth = (weights[index] / totalWeight) * sectorWidth;
        angles.set(kid, offset + kidSectorWidth / 2);
        sectors.set(kid, { start: offset, end: offset + kidSectorWidth });
        assigned.add(kid);
        next.push(kid);
        offset += kidSectorWidth;
      });
    }
    frontier = next;
  }

  const unplaced = nodes.filter((node) => !angles.has(node.id));
  unplaced.forEach((node, index) => {
    angles.set(node.id, (index / Math.max(unplaced.length, 1)) * Math.PI * 2);
  });

  return angles;
}

function assignEvenRingLayout(
  nodeIds: string[],
  angles: Map<string, number>,
  depths: Map<string, number>,
  rootId: string,
  ringStep: number,
): Map<string, Polar> {
  const polar = new Map<string, Polar>();

  for (const id of nodeIds) {
    const depth = depths.get(id) ?? 1;
    const angle = angles.get(id) ?? 0;
    polar.set(id, { angle, radius: depth * ringStep });
  }

  polar.set(rootId, { angle: angles.get(rootId) ?? 0, radius: 0 });
  return polar;
}

// Uses a single, evenly-spaced radius step across every depth so the gap from
// the center to each successive ring is constant. The step grows until no nodes
// overlap, keeping the layout as compact as possible.
function resolveEvenRings(
  nodeIds: string[],
  angles: Map<string, number>,
  depths: Map<string, number>,
  rootId: string,
): Map<string, Polar> {
  let ringStep = BASE_RADIUS_STEP;

  for (let pass = 0; pass < 400; pass++) {
    const polar = assignEvenRingLayout(nodeIds, angles, depths, rootId, ringStep);
    if (countOverlaps(nodeIds, polar) === 0) return polar;
    ringStep += RING_SCALE_STEP;
  }

  return assignEvenRingLayout(nodeIds, angles, depths, rootId, ringStep);
}

export function applyRadialLayout(nodes: Node[], edges: Edge[]): Node[] {
  if (nodes.length === 0) return nodes;

  const rootId = getRootId(nodes, edges);
  if (!rootId) return nodes;

  const nodeIds = nodes.map((node) => node.id);
  const angles = computeRadialAngles(nodes, edges, rootId);
  const depths = computeDepths(rootId, nodes, edges);
  const resolved = resolveEvenRings(nodeIds, angles, depths, rootId);

  return nodes.map((node) => ({
    ...node,
    position: polarToPosition(resolved.get(node.id) ?? { angle: 0, radius: 0 }),
  }));
}
