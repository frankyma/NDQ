import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  useNodesState,
  type Node,
  type Edge,
  type NodeMouseHandler,
  type NodeTypes,
} from "@xyflow/react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type Simulation,
  type SimulationLinkDatum,
} from "d3-force";
import { useCallback, useEffect, useMemo, useRef } from "react";
import "@xyflow/react/dist/style.css";
import { applyRadialLayout } from "../utils/graphLayout";
import { CIRCLE_SIZE, CircleNode } from "./CircleNode";

const nodeTypes: NodeTypes = { circle: CircleNode };
const defaultEdgeOptions = { type: "straight" };
const CIRCLE_HALF = CIRCLE_SIZE / 2;

type SimNode = {
  id: string;
  x: number;
  y: number;
  fx?: number;
  fy?: number;
};

type SimLink = SimulationLinkDatum<SimNode>;

interface TreeGraphProps {
  nodes: Node[];
  edges: Edge[];
  onNodeClick?: NodeMouseHandler;
}

function getNonDualityNodeId(nodes: Node[]): string | undefined {
  return nodes.find((node) => node.data?.label === "Non-Duality")?.id;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace("#", "");
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => `${c}${c}`)
          .join("")
      : normalized;
  const value = Number.parseInt(full, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) => Math.round(v).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lightenHex(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount,
  );
}

function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getColoredNodes(rawNodes: Node[], edges: Edge[]): Node[] {
  const branchPalette = ["#dc2626", "#2563eb", "#eab308"];
  const branchColorByLabel: Record<string, string> = {
    "Eastern Philosophy": "#f97316",
    Science: "#16a34a",
  };
  const centerStyle = {
    background: "#fca5a5",
    border: "#ef4444",
    color: "#111827",
  };

  const children = new Map<string, string[]>();
  const nodeById = new Map(rawNodes.map((node) => [node.id, node]));
  for (const node of rawNodes) children.set(node.id, []);
  for (const edge of edges) {
    children.get(edge.source)?.push(edge.target);
  }

  const rootId = getNonDualityNodeId(rawNodes);
  const branchRoots = rootId ? (children.get(rootId) ?? []) : [];
  const nodeStyle = new Map<
    string,
    { background: string; border: string; color: string }
  >();
  if (rootId) {
    nodeStyle.set(rootId, centerStyle);
  }

  branchRoots.forEach((rootId, branchIndex) => {
    const rootNode = nodeById.get(rootId);
    const rootLabel = (rootNode?.data?.label as string | undefined) ?? "";
    const baseColor =
      branchColorByLabel[rootLabel] ??
      branchPalette[branchIndex % branchPalette.length];
    const queue: Array<{ id: string; depth: number }> = [
      { id: rootId, depth: 0 },
    ];

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;
      const { id, depth } = current;

      if (nodeStyle.has(id)) continue;

      const lightenAmount = Math.min(0.82, 0.38 + depth * 0.14);
      const softened = lightenHex(baseColor, lightenAmount);
      nodeStyle.set(id, {
        background: softened,
        border: withAlpha(baseColor, 0.5),
        color: "#111827",
      });

      const kids = children.get(id) ?? [];
      for (const kid of kids) {
        queue.push({ id: kid, depth: depth + 1 });
      }
    }
  });

  return rawNodes.map((node) => {
    const style = nodeStyle.get(node.id);
    if (!style) return node;
    return {
      ...node,
      data: {
        ...node.data,
        ...style,
      },
    };
  });
}

function Graph({ nodes: rawNodes, edges, onNodeClick }: TreeGraphProps) {
  const simulationRef = useRef<Simulation<SimNode, SimLink> | null>(null);
  const simNodesByIdRef = useRef<Map<string, SimNode>>(new Map());
  const styledNodes = useMemo(
    () => getColoredNodes(rawNodes, edges),
    [rawNodes, edges],
  );
  const initialLayout = useMemo(
    () => applyRadialLayout(styledNodes, edges),
    [styledNodes, edges],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initialLayout);

  useEffect(() => {
    setNodes(initialLayout);
  }, [initialLayout, setNodes]);

  useEffect(() => {
    simulationRef.current?.stop();

    const simNodes: SimNode[] = initialLayout.map((node) => ({
      id: node.id,
      x: node.position.x + CIRCLE_HALF,
      y: node.position.y + CIRCLE_HALF,
    }));

    simNodesByIdRef.current = new Map(simNodes.map((node) => [node.id, node]));

    const simLinks: SimLink[] = edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
    }));

    const simulation = forceSimulation<SimNode>(simNodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(simLinks)
          .id((node) => node.id)
          .distance(140)
          .strength(0.35),
      )
      .force("charge", forceManyBody().strength(-520))
      .force("collide", forceCollide(CIRCLE_SIZE * 0.85))
      .force("center", forceCenter(0, 0))
      .alpha(0)
      .alphaDecay(0.03)
      .on("tick", () => {
        setNodes((currentNodes) =>
          currentNodes.map((node) => {
            const simNode = simNodesByIdRef.current.get(node.id);
            if (!simNode) return node;
            return {
              ...node,
              position: {
                x: simNode.x - CIRCLE_HALF,
                y: simNode.y - CIRCLE_HALF,
              },
            };
          }),
        );
      });

    simulationRef.current = simulation;

    return () => {
      simulation.stop();
    };
  }, [edges, initialLayout, setNodes]);

  const handleNodeDragStart: NodeMouseHandler = useCallback((_event, node) => {
    const simulation = simulationRef.current;
    const simNode = simNodesByIdRef.current.get(node.id);
    if (!simulation || !simNode) return;

    simulation.alphaTarget(0.25).restart();
    simNode.fx = node.position.x + CIRCLE_HALF;
    simNode.fy = node.position.y + CIRCLE_HALF;
  }, []);

  const handleNodeDrag: NodeMouseHandler = useCallback((_event, node) => {
    const simNode = simNodesByIdRef.current.get(node.id);
    if (!simNode) return;

    simNode.fx = node.position.x + CIRCLE_HALF;
    simNode.fy = node.position.y + CIRCLE_HALF;
  }, []);

  const handleNodeDragStop: NodeMouseHandler = useCallback((_event, node) => {
    const simulation = simulationRef.current;
    const simNode = simNodesByIdRef.current.get(node.id);
    if (!simulation || !simNode) return;

    simNode.fx = undefined;
    simNode.fy = undefined;

    simulation.alphaTarget(0);
  }, []);

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
      minZoom={0.2}
      fitView
      fitViewOptions={{ padding: 0.15 }}
    >
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

export function TreeGraph(props: TreeGraphProps) {
  return (
    <ReactFlowProvider>
      <Graph {...props} />
    </ReactFlowProvider>
  );
}
