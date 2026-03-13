import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate, useLocation } from "react-router-dom";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import CartDrawer from "../Card/Card";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const { isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const baseNavItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];
  const userData = JSON.parse(localStorage.getItem("userData"));

  const navItems =
    userData?.role === "admin"
      ? [...baseNavItems, { name: "Dashboard", path: "/dashboard" }]
      : userData?.role === "user"
        ? [...baseNavItems, { name: "Orders", path: "/order" }]
        : baseNavItems;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const userSection = (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <IconButton onClick={() => toggleTheme()} sx={{ color: "#fff" }} id="mod">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <CartDrawer />
      {isLoggedIn ? (
        <>
          <IconButton
            sx={{ color: "#fff" }}
            onClick={() => navigate("/profile")}
          >
            <PersonIcon />
          </IconButton>
          <Button
            sx={{
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            sx={{
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", bgcolor: theme.colors.primary.main }}
    >
      <Typography variant="h6" sx={{ my: 2, color: "#fff" }}>
        store Name
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            sx={{
              justifyContent: "center",
              borderBottom:
                location.pathname === item.path
                  ? `3px solid ${"#fff"}`
                  : "3px solid transparent",
            }}
            onClick={() => navigate(item.path)}
          >
            <ListItemText
              primary={item.name}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: theme.colors.text.secondary,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.colors.primary.main,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMobile && (
            <IconButton
              sx={{ color: "#fff" }}
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: isMobile ? 0 : 1,
              color: "#fff",
              fontWeight: 700,
              letterSpacing: ".5px",
            }}
          >
            store Name
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  sx={{
                    color: "#fff",
                    fontSize: "1rem",
                    textTransform: "none",
                    borderBottom:
                      location.pathname === item.path
                        ? `3px solid ${"#fff"}`
                        : "3px solid transparent",
                    borderRadius: 0,
                    paddingBottom: "4px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          {userSection}
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              bgcolor: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
};

export default Navbar;
