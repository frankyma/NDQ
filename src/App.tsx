import { useState } from 'react'
import type { Node, Edge, NodeMouseHandler } from '@xyflow/react'
import { TreeGraph } from './components/TreeGraph'
import { NodePanel } from './components/NodePanel'

const nodes: Node[] = [
  { id: '1', type: 'circle', data: { label: 'Non-Duality' }, position: { x: 0, y: 0 } },
  { id: '2', type: 'circle', data: { label: 'Eastern Philosophy' }, position: { x: 0, y: 0 } },
  { id: '3', type: 'circle', data: { label: 'Abrahamic Religion' }, position: { x: 0, y: 0 } },
  { id: '4', type: 'circle', data: { label: 'Science' }, position: { x: 0, y: 0 } },
  { id: '5', type: 'circle', data: { label: 'Buddhism' }, position: { x: 0, y: 0 } },
  { id: '6', type: 'circle', data: { label: 'Advaita Vedanta' }, position: { x: 0, y: 0 } },
  { id: '7', type: 'circle', data: { label: 'Christian Mysticism' }, position: { x: 0, y: 0 } },
  { id: '8', type: 'circle', data: { label: 'Sufism' }, position: { x: 0, y: 0 } },
  { id: '9', type: 'circle', data: { label: 'Biology' }, position: { x: 0, y: 0 } },
  { id: '10', type: 'circle', data: { label: 'Physics' }, position: { x: 0, y: 0 } },
  { id: '11', type: 'circle', data: { label: 'Philosophy' }, position: { x: 0, y: 0 } },
  { id: '12', type: 'circle', data: { label: 'Theravada' }, position: { x: 0, y: 0 } },
  { id: '13', type: 'circle', data: { label: 'Mahayana' }, position: { x: 0, y: 0 } },
  { id: '14', type: 'circle', data: { label: 'Vajrayana' }, position: { x: 0, y: 0 } },
  { id: '15', type: 'circle', data: { label: 'Form (Rupa)' }, position: { x: 0, y: 0 } },
  { id: '16', type: 'circle', data: { label: 'Feeling (Vedana)' }, position: { x: 0, y: 0 } },
  { id: '17', type: 'circle', data: { label: 'Perception (Sanna)' }, position: { x: 0, y: 0 } },
  { id: '18', type: 'circle', data: { label: 'Mental Formations (Samskara)' }, position: { x: 0, y: 0 } },
  { id: '19', type: 'circle', data: { label: 'Consciousness (Vijnana)' }, position: { x: 0, y: 0 } },
]

const edges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e2-6', source: '2', target: '6' },
  { id: 'e3-7', source: '3', target: '7' },
  { id: 'e3-8', source: '3', target: '8' },
  { id: 'e4-9', source: '4', target: '9' },
  { id: 'e4-10', source: '4', target: '10' },
  { id: 'e4-11', source: '4', target: '11' },
  { id: 'e5-12', source: '5', target: '12' },
  { id: 'e5-13', source: '5', target: '13' },
  { id: 'e5-14', source: '5', target: '14' },
  { id: 'e12-15', source: '12', target: '15' },
  { id: 'e12-16', source: '12', target: '16' },
  { id: 'e12-17', source: '12', target: '17' },
  { id: 'e12-18', source: '12', target: '18' },
  { id: 'e12-19', source: '12', target: '19' },
]

function App() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const handleNodeClick: NodeMouseHandler = (_event, node) => {
    setSelectedNode(node)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <TreeGraph nodes={nodes} edges={edges} onNodeClick={handleNodeClick} />
      <NodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  )
}

export default App
