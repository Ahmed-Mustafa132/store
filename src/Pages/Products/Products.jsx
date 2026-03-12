import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import Product from "../../components/Product/Product";
import CircularIndeterminate from "../../components/Loading/Loading";

export default function Products() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Categories
    axiosInstance
      .get("/categories")
      .then((response) => {
        // Handle response based on your category controller structure
        const cats = response.data.categories || response.data;
        if (Array.isArray(cats)) {
          setCategories(cats);
        }
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedCategory) params.category = selectedCategory;
    if (sortOrder) params.sort = sortOrder;

    axiosInstance
      .get("/products", { params })
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, [searchTerm, selectedCategory, sortOrder]);
  if (loading) {
    return <CircularIndeterminate />;
  }
  return (
    <Box sx={{ py: 8, minHeight: "50vh" }}>
      <Container>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: theme.colors.text.primary,
            mb: 6,
          }}
        >
          Our Collection
        </Typography>

        <Paper
          component="form"
          elevation={0}
          sx={{
            p: 2,
            mb: 6,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: "12px",
            backgroundColor: "transparent",
          }}
        >
          <TextField
            fullWidth
            placeholder="Search our collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.colors.text.secondary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: theme.colors.background.paper,
                color: theme.colors.text.primary,
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": {
                  borderColor: theme.colors.primary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.colors.primary.main,
                },
              },
            }}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            <FormControl sx={{ minWidth: 150, width: "100%" }}>
              <InputLabel sx={{ color: theme.colors.text.secondary }}>
                Category
              </InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  color: theme.colors.text.primary,
                  borderRadius: "8px",
                  backgroundColor: theme.colors.background.paper,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.colors.primary.main,
                  },
                  "& .MuiSvgIcon-root": {
                    color: theme.colors.text.secondary,
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150, width: "100%" }}>
              <InputLabel sx={{ color: theme.colors.text.secondary }}>
                Sort By
              </InputLabel>
              <Select
                value={sortOrder}
                label="Sort By"
                onChange={(e) => setSortOrder(e.target.value)}
                sx={{
                  color: theme.colors.text.primary,
                  borderRadius: "8px",
                  backgroundColor: theme.colors.background.paper,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.colors.primary.main,
                  },
                  "& .MuiSvgIcon-root": {
                    color: theme.colors.text.secondary,
                  },
                }}
              >
                <MenuItem value="">Newest</MenuItem>
                <MenuItem value="price_asc">Price: Low to High</MenuItem>
                <MenuItem value="price_desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        <Grid container spacing={4}>
          {!products || products.length === 0 ? (
            <Container>There are no products available</Container>
          ) : (
            <>
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
