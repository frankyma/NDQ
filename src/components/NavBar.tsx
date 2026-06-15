import { NavLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const links = [
  { to: "/", label: "Canvas" },
  { to: "/about", label: "About" },
];

export function NavBar() {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 10,
        borderRadius: 2,
        p: 0.5,
        display: "flex",
        gap: 0.5,
      }}
    >
      {links.map(({ to, label }) => (
        <Button
          key={to}
          component={NavLink}
          to={to}
          end
          disableElevation
          sx={{
            borderRadius: 1.5,
            px: 2.5,
            py: 0.75,
            fontSize: 15,
            fontWeight: 600,
            textTransform: "none",
            color: "text.secondary",
            "&.active": {
              bgcolor: "rgba(37, 99, 235, 0.12)",
              color: "#2563eb",
            },
            "&.active:hover": {
              bgcolor: "rgba(37, 99, 235, 0.18)",
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Paper>
  );
}
