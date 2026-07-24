import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { fonts, zenColors } from "../theme";

export function AboutPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflowY: "auto",
        px: 2,
        py: { xs: 9, sm: 12 },
        background:
          "linear-gradient(180deg, #e9eff5 0%, #f1f5f9 50%, #ffffff 100%)",
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Paper
          elevation={0}
          sx={{
            maxWidth: 860,
            mx: "auto",
            p: { xs: 3, sm: 6 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 16px 48px rgba(39, 49, 58, 0.07)",
          }}
        >
          <Stack
            spacing={2}
            sx={{ mb: 4.5, alignItems: "center", textAlign: "center" }}
          >
            <Box
              component="img"
              src="/hs2.jpeg"
              alt="Frank"
              sx={{
                width: 420,
                maxWidth: "100%",
                height: "auto",
                display: "block",
                borderRadius: 1,
                boxShadow: "0 10px 30px rgba(39, 49, 58, 0.14)",
              }}
            />
            <Typography
              component="h1"
              sx={{
                fontFamily: fonts.serif,
                fontSize: { xs: 32, sm: 40 },
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: zenColors.ink,
              }}
            >
              About
            </Typography>
            <Box
              sx={{
                width: 44,
                height: 3,
                borderRadius: 999,
                backgroundColor: zenColors.accent,
              }}
            />
          </Stack>

          <Stack
            spacing={2.5}
            sx={{
              "& p": {
                fontFamily: fonts.sans,
                fontSize: 17,
                lineHeight: 1.85,
                color: zenColors.ink,
              },
            }}
          >
            <Typography>
              Hi, my name is Frank, and I’ve been a spiritual seeker for almost
              15 years. I started back in college when I had some extra time and
              was curious about self-improvement.
            </Typography>

            <Typography>
              I remember a pro poker player and a YouTube dating coach both
              mentioning meditation, and I thought, "If it can help my poker
              game and be less nervous talking to girls, let's give it a shot."
              I'm far from a poker pro, and am still pretty hopeless with women,
              but the meditation has stuck and deepened over time.
            </Typography>

            <Typography>
              During this time, I've done many silent meditation retreats
              ranging from a single day to a week or more. I've even lived at
              meditation centers, the longest being the San Francisco Zen Center
              for six months (I had a day job, but would live at the center and
              meditate/study with the sangha in the morning and evenings).
            </Typography>

            <Typography>
              I've had a range of teachers and practices. The majority Buddhist,
              but as my curiosity expanded, I've also gone into other non-dual
              schools of thought, including Advaita Vedanta and mysticism.
            </Typography>

            <Typography>
              My biggest influences and gratitude to: Steve Hagen and his Dharma
              heir, Steve Matuszek, of the Dharma Field Zen Center in
              Minneapolis, Sam Harris and his Waking Up app, Swami
              Sarvapriyananda of the New York Vedanta Society, and Rupert Spira.
            </Typography>

            <Typography>
              I'm currently trying to incorporate more devotional practice and
              to abide in the presence of God.
            </Typography>

            <Typography>
              This website is a collection of wisdom I've come across. It's far
              from complete; please share any feedback:{" "}
              <Link
                href="mailto:nondualquarks@gmail.com"
                sx={{
                  color: zenColors.accent,
                  textDecorationColor: zenColors.accentSoft,
                  textUnderlineOffset: "2px",
                }}
              >
                nondualquarks@gmail.com
              </Link>
              .
            </Typography>

            <Typography
              sx={{
                fontFamily: `${fonts.serif} !important`,
                fontStyle: "italic",
                fontSize: "20px !important",
                color: `${zenColors.muted} !important`,
                pt: 1,
              }}
            >
              Frank
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
