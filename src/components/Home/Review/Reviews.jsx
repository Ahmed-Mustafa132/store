import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { getTheme } from "../../../Theme/Theme";
import { useThemeContext } from "../../../Context/ThemeContext";

export default function Reviews() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const reviews = [
              {
                name: "John Smith",
                rating: 5,
                comment:
                  "Exceptional quality furniture. The attention to detail is remarkable.",
                position: "Interior Designer",
                image: "https://randomuser.me/api/portraits/men/1.jpg",
              },
              {
                name: "Sarah Johnson",
                rating: 5,
                comment:
                  "Beautiful craftsmanship. My custom table exceeded expectations.",
                position: "Home Owner",
                image: "https://randomuser.me/api/portraits/women/1.jpg",
              },
              {
                name: "Mike Wilson",
                rating: 5,
                comment:
                  "Professional service and outstanding results. Highly recommended!",
                position: "Business Owner",
                image: "https://randomuser.me/api/portraits/men/2.jpg",
              },
            ]
  return (
    <section className="section4">
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
            Client Reviews
          </Typography>

          <Grid container spacing={4}>
            {reviews.map((review, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    p: 3,
                    boxShadow: `0 4px 20px ${theme.colors.shadow}`,
                    bgcolor: theme.colors.background.paper,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar src={review.image} sx={{ mr: 2 }} alt="aveter"/>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ color: theme.colors.text.primary }}
                      >
                        {review.name}
                      </Typography>
                      <Typography sx={{ color: theme.colors.text.secondary }}>
                        {review.position}
                      </Typography>
                    </Box>
                  </Box>

                  <Rating value={review.rating} readOnly sx={{ mb: 2 }} />

                  <Typography sx={{ color: theme.colors.text.secondary }}>
                    &#34;
                    {review.comment}
                    &#34;
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
