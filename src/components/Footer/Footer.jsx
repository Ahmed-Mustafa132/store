import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";

export default function Footer() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);

  return (
    <footer>
      <Box
        sx={{
          bgcolor: theme.colors.primary.main,
          backgroundImage: `linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%)`,
          color: "#fff",
          py: 6,
          boxShadow: `0 -4px 20px ${theme.colors.shadow}`,
        }}
      >
        <Container>
          <Grid container spacing={8}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  textShadow: `2px 2px 4px ${theme.colors.shadow}`,
                }}
              >
                store name
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 300 }}>
                Crafting Excellence Since 2010
              </Typography>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Quick Links
                </Typography>
                {["Home", "Products", "About", "Contact"].map((link) => (
                  <Link
                    key={link}
                    to={`/${link.toLowerCase()}`}
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      transition: "0.3s",
                    }}
                    sx={{
                      "&:hover": {
                        pl: 1,
                        opacity: 0.8,
                      },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Contact & Social */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Stay Connected
                </Typography>

                <Box>
                  <Typography>info@Store Name.com</Typography>
                  <Typography>(123) 456-7890</Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    "& .MuiIconButton-root": {
                      bgcolor: theme.colors.overlay,
                      transition: "0.3s",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.2)",
                        transform: "translateY(-3px)",
                      },
                    },
                  }}
                >
                  <IconButton
                    color="inherit"
                    href="https://facebook.com"
                    target="_blank"
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://instagram.com"
                    target="_blank"
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://twitter.com"
                    target="_blank"
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://linkedin.com"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: theme.colors.divider }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ mb: 1 }}>
              © {new Date().getFullYear()} Store Name  . All Rights
              Reserved.
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              All content and designs presented on this website are protected
              under international copyright laws.
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
