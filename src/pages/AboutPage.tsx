import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";

export function AboutPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflowY: "auto",
        px: 2,
        py: { xs: 9, sm: 12 },
        background:
          "linear-gradient(180deg, #eef2f9 0%, #f7f9fc 45%, #ffffff 100%)",
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Paper
          elevation={0}
          sx={{
            maxWidth: 960,
            mx: "auto",
            p: { xs: 3, sm: 6 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 12px 40px rgba(15, 23, 42, 0.06)",
          }}
        >
          <Stack
            spacing={1.5}
            sx={{ mb: 4, alignItems: "center", textAlign: "center" }}
          >
            <Avatar
              variant="rounded"
              src="/headshot.jpeg"
              alt="Frank"
              sx={{
                width: 420,
                height: 280,
                bgcolor: "#eef2f9",
                color: "#9aa7bd",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
              }}
            >
              <PersonIcon sx={{ fontSize: 120 }} />
            </Avatar>
          </Stack>

          <Stack
            spacing={2.5}
            sx={{
              "& p": { fontSize: 17, lineHeight: 1.8, color: "text.primary" },
            }}
          >
            <Typography>
              Hi, My name is Frank, and I’ve been a Spiritual seeker for almost
              15 years. I started back in college when I had some extra time and
              was curious about self-improvement.
            </Typography>

            <Typography>
              I remember a pro poker player and a YouTube dating coach both
              mentioning meditation, and I thought, "If it can help my poker
              game and be less nervous talking to girls, let's give it a shot."
              It's stuck with me since.
            </Typography>

            <Typography>
              During this time, I've Done many silent meditation retreats as
              short as a day to week+. I've even lived at meditation centers,
              the longest being the San Francisco Zen Center for six months
              (During this time, I had a day job, but I would live at the center
              and meditate in the morning and evenings).
            </Typography>

            <Typography>
              I've had a range of teachers and practices. The majority Buddhist,
              but as my curiosity expanded, I've also gone into Advaita Vedanta
              and general non-dualism.
            </Typography>

            <Typography>
              My biggest influences and gratitude to: Steve Hagen and his Dharma
              heir, Steve Matuszek, of the Dharma Field Zen Center in
              Minneapolis, Sam Harris and his Waking Up app, Swami
              Sarvapriyananda of the New York Vedanta Society, and Rupert Spira.
            </Typography>

            <Typography>
              I'm currently trying to incorporate more devotional practice and
              feeling the presence of God.
            </Typography>

            <Typography
              sx={{ fontStyle: "italic", color: "text.secondary", pt: 1 }}
            >
              Frank
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
