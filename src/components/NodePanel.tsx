import type { Node } from "@xyflow/react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import { NODE_CONTENT } from "../content";
import { fonts, zenColors } from "../theme";

const DRAWER_WIDTH = 480;

interface NodePanelProps {
  node: Node | null;
  onClose: () => void;
}

export function NodePanel({ node, onClose }: NodePanelProps) {
  const label = (node?.data.label as string) ?? "";

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={node !== null}
      slotProps={{
        paper: {
          sx: {
            width: DRAWER_WIDTH,
            maxWidth: "100vw",
            px: 5,
            py: 4.5,
            border: "none",
            backgroundColor: zenColors.surface,
            boxShadow: "-16px 0 48px rgba(39, 49, 58, 0.10)",
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        size="small"
        aria-label="Close panel"
        sx={{
          position: "absolute",
          top: 18,
          right: 18,
          color: zenColors.muted,
          "&:hover": {
            color: zenColors.ink,
            backgroundColor: "rgba(39, 49, 58, 0.05)",
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <Box sx={{ mb: 3.5 }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: fonts.serif,
            fontSize: 34,
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            color: zenColors.ink,
            pr: 4,
          }}
        >
          {label}
        </Typography>
        <Box
          sx={{
            mt: 1.75,
            width: 44,
            height: 3,
            borderRadius: 999,
            backgroundColor: zenColors.accent,
          }}
        />
      </Box>

      <Box
        sx={{
          color: zenColors.ink,
          fontFamily: fonts.sans,
          fontSize: 16,
          lineHeight: 1.78,
          "& p": { mb: 2 },
          "& em": {
            fontFamily: fonts.serif,
            fontStyle: "italic",
            fontSize: 18.5,
            lineHeight: 1.5,
            color: zenColors.ink,
          },
          "& strong": { fontWeight: 600 },
          "& a": {
            color: zenColors.accent,
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            textDecorationThickness: "1px",
          },
          "& h1, & h2, & h3, & h4": {
            fontFamily: fonts.serif,
            fontWeight: 500,
            color: zenColors.ink,
            mt: 3,
            mb: 1,
          },
          "& ul, & ol": { pl: 3, mb: 2 },
          "& li": { mb: 0.75 },
          "& blockquote": {
            m: 0,
            mb: 2,
            pl: 2,
            borderLeft: `3px solid ${zenColors.accentSoft}`,
            color: zenColors.muted,
            fontStyle: "italic",
          },
          "& hr": {
            border: "none",
            borderTop: `1px solid ${zenColors.divider}`,
            my: 3,
          },
        }}
      >
        <ReactMarkdown>{NODE_CONTENT[node?.id ?? ""] ?? ""}</ReactMarkdown>
      </Box>
    </Drawer>
  );
}
