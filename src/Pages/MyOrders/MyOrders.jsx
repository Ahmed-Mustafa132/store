import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useAuth } from "../../Context/AuthContext";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import CircularIndeterminate from "../../components/Loading/Loading";

const MyOrders = () => {
  const { userData } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(`/orders/user/${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    if (userData?._id) fetchOrders();
  }, [userData]);

  if (loading) return <CircularIndeterminate />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      {orders.length === 0 ? (
        <Alert severity="info">No orders found.</Alert>
      ) : (
        <List>
          {orders.map((order) => (
            <Paper key={order._id} sx={{ mb: 2, p: 2 }}>
              <Typography variant="h6">Order #{order._id}</Typography>
              <Typography>Status: {order.status}</Typography>
              <Typography>Total: {order.totalPrice} EGP</Typography>
              <Divider sx={{ my: 1 }} />
              <List>
                {order.products.map((prod, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={prod.productTitle || prod.title}
                      secondary={`Quantity: ${prod.quantity} | Price: ${prod.price} EGP`}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="body2" color="text.secondary">
                Date: {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MyOrders;
