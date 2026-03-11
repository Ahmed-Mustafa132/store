import { getTheme } from "../../../Theme/Theme";
import { useNavigate } from "react-router-dom";
import Image from "../../../assets/Images/Image.jpg";
import { useThemeContext } from "../../../Context/ThemeContext";

import {
  Container,
  Box,
  Typography,
  Grid,
  CardMedia,
  Button,
} from "@mui/material";
export default function About() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);

  const navigate = useNavigate();
  return (
    <section className="section3">
      <Container>
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 6,
              color: theme.colors.text.primary,
            }}
          >
            About US
          </Typography>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="450"
                image={Image}
                alt="Woodworking"
                sx={{
                  borderRadius: 2,
                  boxShadow: `0 4px 20px ${theme.colors.shadow}`,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: theme.colors.text.primary }}
              >
                Crafting Excellence
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: "1.1rem",
                  mb: 3,
                  color: theme.colors.text.secondary,
                }}
              >
                At Store Name, we transform raw wood into masterpieces. Our
                passion for woodworking drives us to create furniture that
                combines traditional craftsmanship with modern design.
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: theme.colors.primary.main,
                  "&:hover": {
                    bgcolor: theme.colors.primary.dark,
                  },
                }}
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
