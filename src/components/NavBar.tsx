import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { zenColors } from "../theme";

const links = [
  { to: "/", label: "Canvas" },
  { to: "/about", label: "About" },
];

export function NavBar() {
  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 20,
        left: 20,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 1,
        pl: 1.25,
        pr: 0.75,
        py: 0.75,
        borderRadius: 999,
        backgroundColor: "rgba(255, 253, 250, 0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid",
        borderColor: zenColors.divider,
        boxShadow: "0 6px 24px rgba(39, 49, 58, 0.08)",
      }}
    >
      <Box
        component="img"
        src="/Enso.svg"
        alt="Non Dual Quarks"
        sx={{ width: 26, height: 26, opacity: 0.85, flexShrink: 0 }}
      />
      <Box
        sx={{ width: "1px", height: 22, backgroundColor: zenColors.divider }}
      />
      <Box sx={{ display: "flex", gap: 0.25 }}>
        {links.map(({ to, label }) => (
          <Button
            key={to}
            component={NavLink}
            to={to}
            end
            disableElevation
            sx={{
              borderRadius: 999,
              px: 2.25,
              py: 0.6,
              minWidth: 0,
              fontSize: 14.5,
              fontWeight: 500,
              letterSpacing: 0.2,
              color: zenColors.muted,
              transition: "color 0.2s ease, background-color 0.2s ease",
              "&:hover": { backgroundColor: "rgba(39, 49, 58, 0.04)" },
              "&.active": {
                color: zenColors.accent,
                backgroundColor: `rgba(${zenColors.accentRgb}, 0.12)`,
              },
              "&.active:hover": {
                backgroundColor: `rgba(${zenColors.accentRgb}, 0.18)`,
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
