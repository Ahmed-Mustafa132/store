import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const CartDrawer = () => {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { isLoggedIn } = useAuth();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        sx={{ color: "#fff" }}
        aria-label="shopping"
      >
        <Badge badgeContent={cartItems.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 350,
            bgcolor: theme.colors.background.paper,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: theme.colors.primary.main }}
          >
            Shopping Cart
          </Typography>

          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                sx={{ mb: 2, borderBottom: `1px solid ${theme.colors.shadow}` }}
              >
                <Avatar src={item.image} sx={{ mr: 2 }} />
                <ListItemText
                  primary={item.title}
                  secondary={`$${item.price}`}
                  sx={{
                    "& .MuiTypography-root": {
                      color: theme.colors.text.primary,
                    },
                  }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => removeFromCart(item.id)}
                    sx={{ color: "error.main" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 2, p: 2, bgcolor: theme.colors.background.default }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Total: ${totalPrice.toFixed(2)}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: theme.colors.primary.main,
                "&:hover": {
                  bgcolor: theme.colors.primary.dark,
                },
              }}
              onClick={() => {
                setIsOpen(false);
                if (isLoggedIn) {
                  navigate("/checkout");
                } else {
                  navigate("/login");
                }
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default CartDrawer;
