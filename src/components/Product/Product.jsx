import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Product({ product }) {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);

  return (
    <Grid item xs={12} sm={6} md={4} key={product._id}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s",
          backgroundColor: theme.colors.background.paper,
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: `0 12px 25px ${theme.colors.shadow}`,
          },
        }}
      >
        <CardMedia
          component="img"
          height="280"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "cover" }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.colors.text.primary,
              }}
            >
              {product.title}
            </Typography>
            <Chip
              label={product.category?.name || "Uncategorized"}
              size="small"
              sx={{
                bgcolor: theme.colors.primary.light,
                color: "white",
              }}
            />
          </Box>

          <Typography
            variant="body2"
            color={theme.colors.text.secondary}
            sx={{ mb: 2 }}
          >
            {product.description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating value={4.5} precision={0.5} readOnly size="small" />
            <Typography
              variant="body2"
              sx={{ ml: 1, color: theme.colors.text.secondary }}
            >
              {product.rating} / 5
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.colors.text.primary,
                fontWeight: "bold",
              }}
            >
              ${product.price}
            </Typography>
            <Box>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  bgcolor: theme.colors.primary.main,
                  "&:hover": {
                    bgcolor: theme.colors.primary.dark,
                  },
                }}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                buy
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
