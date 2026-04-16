import type { Node, Edge, NodeMouseHandler } from '@xyflow/react'
import { TreeGraph } from './components/TreeGraph'

const nodes: Node[] = [
  { id: '1', type: 'circle', data: { label: 'Root' }, position: { x: 0, y: 0 } },
  { id: '2', type: 'circle', data: { label: 'Child A' }, position: { x: 0, y: 0 } },
  { id: '3', type: 'circle', data: { label: 'Child B' }, position: { x: 0, y: 0 } },
  { id: '4', type: 'circle', data: { label: 'Child C' }, position: { x: 0, y: 0 } },
  { id: '5', type: 'circle', data: { label: 'Grandchild A1' }, position: { x: 0, y: 0 } },
  { id: '6', type: 'circle', data: { label: 'Grandchild A2' }, position: { x: 0, y: 0 } },
  { id: '7', type: 'circle', data: { label: 'Grandchild B1' }, position: { x: 0, y: 0 } },
]

const edges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e2-6', source: '2', target: '6' },
  { id: 'e3-7', source: '3', target: '7' },
]

const handleNodeClick: NodeMouseHandler = (_event, node) => {
  console.log('Selected node:', node.id, node.data.label)
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <TreeGraph nodes={nodes} edges={edges} onNodeClick={handleNodeClick} />
    </div>
  )
}

export default App
