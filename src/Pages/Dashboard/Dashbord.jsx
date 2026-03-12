import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  Add as AddIcon,
  People as PeopleIcon,
  ShoppingCart as OrdersIcon,
  Inventory as ProductsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import axiosInstance from "../../axiosConfig/axiosConfig";
import CircularIndeterminate from "../../components/Loading/Loading";

export default function Dashboard() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/orders/dashboard")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:");
        navigate("/");
      });
  }, []);

  const dashboardItems = [
    {
      title: "Products",
      icon: <ProductsIcon sx={{ fontSize: 50 }} />,
      description: "Mange Your Storage  of store Name products",
      action: () => navigate("/dashboard/products"),
      color: theme.colors.primary.main,
      stats: `${data.products} product`,
    },
    {
      title: "Orders",
      icon: <OrdersIcon sx={{ fontSize: 50 }} />,
      description: " fallow and mange your Orders    ",
      action: () => navigate("/dashboard/orders"),
      color: theme.colors.primary.dark,
      stats: `${data.orders} orders`,
    },
    {
      title: "Users",
      icon: <PeopleIcon sx={{ fontSize: 50 }} />,
      description: "  mange your Users account",
      action: () => navigate("/dashboard/users"),
      color: theme.colors.primary.light,
      stats: `${data.users} users`,
    },
  ];
  if (loading) {
    return <CircularIndeterminate />;
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, direction: "rtl" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          backgroundColor: theme.colors.background.paper,
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: theme.colors.text.primary }}
        >
          DashBoard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/dashboard/CreateProduct")}
          sx={{
            backgroundColor: theme.colors.primary.main,
            "&:hover": {
              backgroundColor: theme.colors.primary.dark,
            },
          }}
        >
          Add New Product
        </Button>
      </Box>

      <Grid container spacing={4}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                backgroundColor: theme.colors.background.paper,
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 8px 24px ${theme.colors.shadow}`,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box
                  sx={{
                    color: item.color,
                    mb: 2,
                    p: 2,
                    borderRadius: "50%",
                    backgroundColor: theme.colors.background.default,
                    width: "fit-content",
                    margin: "0 auto",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    color: theme.colors.text.primary,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    mb: 2,
                    color: theme.colors.text.secondary,
                  }}
                >
                  {item.description}
                </Typography>
                <Typography variant="h6" sx={{ color: item.color }}>
                  {item.stats}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={item.action}
                  sx={{
                    backgroundColor: item.color,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: item.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  view {item.title}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
