import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Container,
  Select,
  MenuItem,
  Stack,
  TextField,
  FormControl,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import {
  MonetizationOn,
  ShoppingCart,
  CheckCircle,
  Pending,
  Edit,
  Search as SearchIcon,
  Visibility,
} from "@mui/icons-material";
import CircularIndeterminate from "../../components/Loading/Loading";

import axiosInstance from "../../axiosConfig/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../Context/ThemeContext";
import { getTheme } from "../../Theme/Theme";

const OrdersDashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [editDialog, setEditDialog] = useState({ open: false, order: null });
  const [productsDialog, setProductsDialog] = useState({
    open: false,
    order: null,
  });
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/");
    } else {
      fetchOrders();
    }
  }, []);

  const fetchOrders = () => {
    axiosInstance.get("/orders").then((response) => {
      setOrders(response.data.data.orders || []);
      setTotalRevenue(response.data.data.totalRevenue || 0);
      setLoading(false);
    });
  };

  const handleEditStatus = (order) => {
    setEditDialog({ open: true, order });
    setNewStatus(order.status);
  };

  const handleViewProducts = (order) => {
    setProductsDialog({ open: true, order });
  };

  const handleStatusUpdate = async () => {
    try {
      await axiosInstance.put(`/orders/${editDialog.order._id}/status`, {
        status: newStatus,
      });

      // Update local state
      setOrders(
        orders.map((order) =>
          order._id === editDialog.order._id
            ? { ...order, status: newStatus }
            : order,
        ),
      );

      setEditDialog({ open: false, order: null });
      setNewStatus("");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "info";
      default:
        return "default";
    }
  };

  const calculateProductTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const filteredOrders = orders.filter(
    (order) =>
      (order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || order.status === statusFilter),
  );

  const StatCard = ({ title, value, icon }) => (
    <Card
      elevation={3}
      sx={{
        backgroundColor: theme.colors.background.paper,
        color: theme.colors.text.primary,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color={theme.colors.text.secondary} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ color: theme.colors.text.primary }}>
              {value}
            </Typography>
          </Box>
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
  if (loading) {
    return <CircularIndeterminate />;
  }
  return (
    <Container maxWidth="xl">
      <Box
        py={4}
        sx={{
          backgroundColor: theme.colors.background.default,
          color: theme.colors.text.primary,
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: theme.colors.text.primary }}
        >
          Orders Dashboard
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            placeholder="Search by Customer or Order ID..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: theme.colors.text.primary,
                backgroundColor: theme.colors.background.paper,
                "& fieldset": {
                  borderColor: theme.colors.border,
                },
                "&:hover fieldset": {
                  borderColor: theme.colors.primary.main,
                },
              },
              "& .MuiOutlinedInput-input::placeholder": {
                color: theme.colors.text.secondary,
                opacity: 0.7,
              },
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{ mr: 1, color: theme.colors.text.secondary }}
                />
              ),
            }}
          />
          <FormControl sx={{ minWidth: 150 }} size="small">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: theme.colors.background.paper,
                color: theme.colors.text.primary,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.colors.border,
                },
                "& .MuiSvgIcon-root": {
                  color: theme.colors.text.primary,
                },
              }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Orders"
              value={orders.length}
              icon={
                <ShoppingCart sx={{ fontSize: 40, color: "primary.main" }} />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Revenue"
              value={"$" + totalRevenue || 0}
              icon={
                <MonetizationOn sx={{ fontSize: 40, color: "success.main" }} />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Orders"
              value={
                orders.filter((order) => order.status === "pending").length
              }
              icon={<Pending sx={{ fontSize: 40, color: "warning.main" }} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Completed Orders"
              value={
                orders.filter((order) => order.status === "completed").length
              }
              icon={
                <CheckCircle sx={{ fontSize: 40, color: "success.main" }} />
              }
            />
          </Grid>
        </Grid>

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            backgroundColor: theme.colors.background.paper,
            color: theme.colors.text.primary,
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{ backgroundColor: theme.colors.background.default }}
              >
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Customer
                </TableCell>
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Products Count
                </TableCell>
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Amount
                </TableCell>
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell sx={{ color: theme.colors.text.primary }}>
                    {order._id}
                  </TableCell>
                  <TableCell sx={{ color: theme.colors.text.primary }}>
                    {order.userName}
                  </TableCell>
                  <TableCell sx={{ color: theme.colors.text.primary }}>
                    {order.productsCount} items
                  </TableCell>
                  <TableCell sx={{ color: theme.colors.text.primary }}>
                    ${order.totalPrice}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleViewProducts(order)}
                      color="info"
                      size="small"
                      title="View Products"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEditStatus(order)}
                      color="primary"
                      size="small"
                      title="Edit Status"
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* View Products Dialog */}
        <Dialog
          open={productsDialog.open}
          onClose={() => setProductsDialog({ open: false, order: null })}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: theme.colors.background.paper,
              color: theme.colors.text.primary,
            },
          }}
        >
          <DialogTitle sx={{ color: theme.colors.text.primary }}>
            Order Products - {productsDialog.order?._id}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.colors.text.secondary }}
              >
                Customer: {productsDialog.order?.userName}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.colors.text.secondary }}
              >
                address :{productsDialog.order?.address}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.colors.text.secondary }}
              >
                city: {productsDialog.order?.city}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.colors.text.secondary }}
              >
                postalCode: {productsDialog.order?.postalCode}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.colors.text.secondary }}
              >
                phone: {productsDialog.order?.phone}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.colors.text.secondary }}
              >
                Order Total: ${productsDialog.order?.totalPrice}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.colors.text.secondary }}
              >
                Status:
                <Chip
                  label={productsDialog.order?.status}
                  color={getStatusColor(productsDialog.order?.status)}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {productsDialog.order?.products &&
            productsDialog.order.products.length > 0 ? (
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ backgroundColor: theme.colors.background.default }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: theme.colors.text.primary }}>
                        Product Name
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: theme.colors.text.primary }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: theme.colors.text.primary }}
                      >
                        Unit Price
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: theme.colors.text.primary }}
                      >
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productsDialog.order.products.map((product, index) => (
                      <TableRow key={product.id || index}>
                        <TableCell sx={{ color: theme.colors.text.primary }}>
                          <Typography
                            variant="body2"
                            fontWeight="medium"
                            sx={{ color: theme.colors.text.primary }}
                          >
                            {product.productTitle}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={product.quantity}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: theme.colors.text.primary }}
                        >
                          ${product.price}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: theme.colors.text.primary }}
                        >
                          <Typography fontWeight="medium">
                            $
                            {calculateProductTotal(
                              product.price,
                              product.quantity,
                            )}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography
                color="textSecondary"
                align="center"
                sx={{ color: theme.colors.text.secondary }}
              >
                No products found for this order
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setProductsDialog({ open: false, order: null })}
              sx={{ color: theme.colors.primary.main }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Status Dialog */}
        <Dialog
          open={editDialog.open}
          onClose={() => setEditDialog({ open: false, order: null })}
          PaperProps={{
            sx: {
              backgroundColor: theme.colors.background.paper,
              color: theme.colors.text.primary,
            },
          }}
        >
          <DialogTitle sx={{ color: theme.colors.text.primary }}>
            Edit Order Status
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{ color: theme.colors.text.secondary }}
              >
                Order ID: {editDialog.order?._id}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.colors.text.secondary }}
              >
                Customer: {editDialog.order?.userName}
              </Typography>
            </Box>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Typography
                variant="body2"
                sx={{ mb: 1, color: theme.colors.text.primary }}
              >
                Select New Status:
              </Typography>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                sx={{
                  color: theme.colors.text.primary,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.colors.text.secondary,
                  },
                }}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setEditDialog({ open: false, order: null })}
              sx={{ color: theme.colors.text.secondary }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusUpdate}
              variant="contained"
              sx={{
                backgroundColor: theme.colors.primary.main,
                "&:hover": { backgroundColor: theme.colors.primary.dark },
              }}
            >
              Update Status
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default OrdersDashboard;
