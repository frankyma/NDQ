import { useState } from "react";
import type { Node, Edge, NodeMouseHandler } from "@xyflow/react";
import { TreeGraph } from "../components/TreeGraph";
import { NodePanel } from "../components/NodePanel";

const nodes: Node[] = [
  {
    id: "1",
    type: "circle",
    data: { label: "Non-Duality" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "circle",
    data: { label: "Eastern Philosophy" },
    position: { x: 0, y: 0 },
  },
  {
    id: "3",
    type: "circle",
    data: { label: "Religion" },
    position: { x: 0, y: 0 },
  },
  {
    id: "4",
    type: "circle",
    data: { label: "Science" },
    position: { x: 0, y: 0 },
  },
  {
    id: "5",
    type: "circle",
    data: { label: "Buddhism" },
    position: { x: 0, y: 0 },
  },
  {
    id: "6",
    type: "circle",
    data: { label: "Vedanta" },
    position: { x: 0, y: 0 },
  },
  {
    id: "7",
    type: "circle",
    data: { label: "Christian Mysticism" },
    position: { x: 0, y: 0 },
  },
  {
    id: "8",
    type: "circle",
    data: { label: "Sufism" },
    position: { x: 0, y: 0 },
  },
  {
    id: "9",
    type: "circle",
    data: { label: "Biology" },
    position: { x: 0, y: 0 },
  },
  {
    id: "10",
    type: "circle",
    data: { label: "Physics" },
    position: { x: 0, y: 0 },
  },
  {
    id: "11",
    type: "circle",
    data: { label: "Philosophy" },
    position: { x: 0, y: 0 },
  },
  {
    id: "12",
    type: "circle",
    data: { label: "Theravada" },
    position: { x: 0, y: 0 },
  },
  {
    id: "13",
    type: "circle",
    data: { label: "Mahayana" },
    position: { x: 0, y: 0 },
  },
  {
    id: "14",
    type: "circle",
    data: { label: "Vajrayana" },
    position: { x: 0, y: 0 },
  },
  {
    id: "15",
    type: "circle",
    data: { label: "Form" },
    position: { x: 0, y: 0 },
  },
  {
    id: "16",
    type: "circle",
    data: { label: "Feeling" },
    position: { x: 0, y: 0 },
  },
  {
    id: "17",
    type: "circle",
    data: { label: "Perception" },
    position: { x: 0, y: 0 },
  },
  {
    id: "18",
    type: "circle",
    data: { label: "Mental Formations" },
    position: { x: 0, y: 0 },
  },
  {
    id: "19",
    type: "circle",
    data: { label: "Consciousness" },
    position: { x: 0, y: 0 },
  },
  {
    id: "20",
    type: "circle",
    data: { label: "Madhyamaka" },
    position: { x: 0, y: 0 },
  },
  {
    id: "21",
    type: "circle",
    data: { label: "Yogacara" },
    position: { x: 0, y: 0 },
  },
  {
    id: "24",
    type: "circle",
    data: { label: "Dzogchen" },
    position: { x: 0, y: 0 },
  },
  {
    id: "25",
    type: "circle",
    data: { label: "Meister Eckhart" },
    position: { x: 0, y: 0 },
  },
  {
    id: "26",
    type: "circle",
    data: { label: "Richard Rohr" },
    position: { x: 0, y: 0 },
  },
  {
    id: "27",
    type: "circle",
    data: { label: "Presence of God" },
    position: { x: 0, y: 0 },
  },
  {
    id: "28",
    type: "circle",
    data: { label: "Advaita Vedanta" },
    position: { x: 0, y: 0 },
  },
  {
    id: "29",
    type: "circle",
    data: { label: "Four Yogas" },
    position: { x: 0, y: 0 },
  },
  {
    id: "30",
    type: "circle",
    data: { label: "Jñāna Yoga" },
    position: { x: 0, y: 0 },
  },
  {
    id: "31",
    type: "circle",
    data: { label: "Karma Yoga" },
    position: { x: 0, y: 0 },
  },
  {
    id: "32",
    type: "circle",
    data: { label: "Bhakti Yoga" },
    position: { x: 0, y: 0 },
  },
  {
    id: "33",
    type: "circle",
    data: { label: "Rāja Yoga" },
    position: { x: 0, y: 0 },
  },
  {
    id: "34",
    type: "circle",
    data: { label: "Ocean and Waves" },
    position: { x: 0, y: 0 },
  },
  {
    id: "35",
    type: "circle",
    data: { label: "Ornaments and Gold" },
    position: { x: 0, y: 0 },
  },
  {
    id: "36",
    type: "circle",
    data: { label: "Dream" },
    position: { x: 0, y: 0 },
  },
  {
    id: "37",
    type: "circle",
    data: { label: "Self vs not-self" },
    position: { x: 0, y: 0 },
  },
  {
    id: "38",
    type: "circle",
    data: { label: "Illusion of Solid Matter" },
    position: { x: 0, y: 0 },
  },
  {
    id: "39",
    type: "circle",
    data: { label: "Illusion of Time and Distance" },
    position: { x: 0, y: 0 },
  },
  {
    id: "40",
    type: "circle",
    data: { label: "Bell's Theorem" },
    position: { x: 0, y: 0 },
  },
  {
    id: "42",
    type: "circle",
    data: { label: "Hard Problem of Consciousness" },
    position: { x: 0, y: 0 },
  },
  {
    id: "43",
    type: "circle",
    data: { label: "Is Science Truth?" },
    position: { x: 0, y: 0 },
  },
  {
    id: "44",
    type: "circle",
    data: { label: "Free Will" },
    position: { x: 0, y: 0 },
  },
  {
    id: "45",
    type: "circle",
    data: { label: "Adjacent Philosophies" },
    position: { x: 0, y: 0 },
  },
  {
    id: "46",
    type: "circle",
    data: { label: "Panpsychism" },
    position: { x: 0, y: 0 },
  },
  {
    id: "47",
    type: "circle",
    data: { label: "Solipsism" },
    position: { x: 0, y: 0 },
  },
];

const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e1-4", source: "1", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e2-6", source: "2", target: "6" },
  { id: "e3-7", source: "3", target: "7" },
  { id: "e3-8", source: "3", target: "8" },
  { id: "e4-9", source: "4", target: "9" },
  { id: "e4-10", source: "4", target: "10" },
  { id: "e4-11", source: "4", target: "11" },
  { id: "e5-12", source: "5", target: "12" },
  { id: "e5-13", source: "5", target: "13" },
  { id: "e5-14", source: "5", target: "14" },
  { id: "e12-15", source: "12", target: "15" },
  { id: "e12-16", source: "12", target: "16" },
  { id: "e12-17", source: "12", target: "17" },
  { id: "e12-18", source: "12", target: "18" },
  { id: "e12-19", source: "12", target: "19" },
  { id: "e13-20", source: "13", target: "20" },
  { id: "e13-21", source: "13", target: "21" },
  { id: "e14-24", source: "14", target: "24" },
  { id: "e7-25", source: "7", target: "25" },
  { id: "e7-26", source: "7", target: "26" },
  { id: "e3-27", source: "3", target: "27" },
  { id: "e6-28", source: "6", target: "28" },
  { id: "e6-29", source: "6", target: "29" },
  { id: "e29-30", source: "29", target: "30" },
  { id: "e29-31", source: "29", target: "31" },
  { id: "e29-32", source: "29", target: "32" },
  { id: "e29-33", source: "29", target: "33" },
  { id: "e28-34", source: "28", target: "34" },
  { id: "e28-35", source: "28", target: "35" },
  { id: "e28-36", source: "28", target: "36" },
  { id: "e5-37", source: "5", target: "37" },
  { id: "e6-37", source: "6", target: "37" },
  { id: "e10-38", source: "10", target: "38" },
  { id: "e10-39", source: "10", target: "39" },
  { id: "e10-40", source: "10", target: "40" },
  { id: "e11-42", source: "11", target: "42" },
  { id: "e11-43", source: "11", target: "43" },
  { id: "e11-44", source: "11", target: "44" },
  { id: "e11-45", source: "11", target: "45" },
  { id: "e45-46", source: "45", target: "46" },
  { id: "e45-47", source: "45", target: "47" },
];

export function CanvasPage() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeClick: NodeMouseHandler = (_event, node) => {
    setSelectedNode(node);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <TreeGraph nodes={nodes} edges={edges} onNodeClick={handleNodeClick} />
      <NodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
}
