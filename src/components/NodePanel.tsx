import type { Node } from '@xyflow/react'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import { NODE_CONTENT } from '../data/nodeContent'

const DRAWER_WIDTH = 380

interface NodePanelProps {
  node: Node | null
  onClose: () => void
}

export function NodePanel({ node, onClose }: NodePanelProps) {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={node !== null}
      slotProps={{ paper: { sx: { width: DRAWER_WIDTH, p: 3 } } }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">{(node?.data.label as string) ?? ''}</Typography>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </Box>
      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
        {NODE_CONTENT[node?.id ?? ''] ?? ''}
      </Typography>
    </Drawer>
  )
}
