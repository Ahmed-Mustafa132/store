import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";

export default function Aboutme() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);

  return (
    <Box sx={{ bgcolor: theme.colors.background.default, py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Hero Section */}
          <Grid item xs={12}>
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{ color: theme.colors.text.primary }}
            >
              About Store Name
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: theme.colors.text.secondary, mb: 6 }}
            >
              Crafting Excellence in Every Piece Since 2010
            </Typography>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ bgcolor: theme.colors.background.paper }}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: theme.colors.text.primary }}
                >
                  Our Story
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: theme.colors.text.secondary }}
                >
                  At Store Name, we believe in the timeless beauty of
                  handcrafted wooden furniture. Our journey began with a simple
                  passion for woodworking and has evolved into a commitment to
                  creating exceptional pieces that bring warmth and character to
                  your home.
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: theme.colors.text.secondary }}
                >
                  Each piece we create tells a unique story, combining
                  traditional craftsmanship with contemporary design. Our
                  dedicated team of artisans puts their heart and soul into
                  every creation, ensuring that each item meets our high
                  standards of quality and beauty.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ bgcolor: theme.colors.background.paper }}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: theme.colors.text.primary }}
                >
                  Contact Information
                </Typography>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <LocationOnIcon sx={{ color: theme.colors.primary.main }} />
                    <Typography sx={{ color: theme.colors.text.secondary }}>
                      123 Craft Street, Woodworking District
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <PhoneIcon sx={{ color: theme.colors.primary.main }} />
                    <Typography sx={{ color: theme.colors.text.secondary }}>
                      (555) 123-4567
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <EmailIcon sx={{ color: theme.colors.primary.main }} />
                    <Typography sx={{ color: theme.colors.text.secondary }}>
                      info@woodencraft.com
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <WorkIcon sx={{ color: theme.colors.primary.main }} />
                    <Typography sx={{ color: theme.colors.text.secondary }}>
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Values Section */}
          <Grid item xs={12}>
            <Card
              elevation={3}
              sx={{ mt: 4, bgcolor: theme.colors.background.paper }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  align="center"
                  sx={{ color: theme.colors.text.primary }}
                >
                  Our Values
                </Typography>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {[
                    "Quality",
                    "Innovation",
                    "Sustainability",
                    "Customer Focus",
                  ].map((value) => (
                    <Grid item xs={12} sm={6} md={3} key={value}>
                      <Box textAlign="center">
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            margin: "0 auto",
                            bgcolor: theme.colors.primary.main,
                            mb: 2,
                          }}
                        >
                          {value.charAt(0)}
                        </Avatar>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ color: theme.colors.text.primary }}
                        >
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
