import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import axiosInstance from "../../axiosConfig/axiosConfig";
import CircularIndeterminate from "../../components/Loading/Loading";
export default function DashboardProducts() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data.products);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      setCurrentProduct(response.data.product);
      setImagePreview(response.data.product.image);
      setEditDialogOpen(true);
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentProduct(null);
    setError("");
    setImageFile(null);
    setImagePreview("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]:
        name === "price" || name === "stockQuantity" || name === "warranty"
          ? Number(value)
          : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpdateProduct = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.keys(currentProduct).forEach((key) => {
        if (key !== "image") {
          formData.append(key, currentProduct[key]);
        }
      });

      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        formData.append("image", currentProduct.image);
      }

      const response = await axiosInstance.put(
        `/products/${currentProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setProducts(
        products.map((product) =>
          product._id === currentProduct._id ? response.data.product : product,
        ),
      );

      handleDialogClose();
    } catch (err) {
      setError("Failed to update product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );
  if (loading) {
    return <CircularIndeterminate />;
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        backgroundColor: theme.colors.background.main,
        borderRadius: 1,
        p: 3,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: theme.colors.text.primary, mb: 3 }}
        >
          Products Management
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            placeholder="Search products..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flexGrow: 1,
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
          <Link to="/dashboard/CreateProduct">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: theme.colors.primary.main,
                color: "#fff",
                "&:hover": { backgroundColor: theme.colors.primary.dark },
              }}
            >
              Add New Product
            </Button>
          </Link>
        </Stack>

        <TableContainer
          component={Paper}
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
                  Product Name
                </TableCell>
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Price
                </TableCell>
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Stock
                </TableCell>
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Rating
                </TableCell>
                <TableCell sx={{ color: theme.colors.text.primary }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{
                    backgroundColor: theme.colors.background.paper,
                    "&:hover": {
                      backgroundColor: theme.colors.background.default,
                    },
                  }}
                >
                  <TableCell sx={{ color: theme.colors.text.primary }}>
                    {product.title}
                  </TableCell>
                  <TableCell sx={{ color: theme.colors.text.primary }}>
                    {product.category?.name || "Uncategorized"}
                  </TableCell>
                  <TableCell sx={{ color: theme.colors.text.primary }}>
                    ${product.price}
                  </TableCell>
                  <TableCell sx={{ color: theme.colors.text.primary }}>
                    {product.stockQuantity}
                  </TableCell>
                  <TableCell sx={{ color: theme.colors.text.primary }}>
                    {product.rating}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(product._id)}
                      sx={{ color: theme.colors.primary.main }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(product._id)}
                      sx={{ color: theme.colors.primary.dark }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit Product Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            backgroundColor: theme.colors.background.paper,
            color: theme.colors.text.primary,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: theme.colors.text.primary,
            borderBottom: `1px solid ${theme.colors.border}`,
          }}
        >
          <Typography variant="h6">Edit Product</Typography>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon sx={{ color: theme.colors.text.primary }} />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{ backgroundColor: theme.colors.background.paper }}
        >
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress sx={{ color: theme.colors.primary.main }} />
            </Box>
          )}

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {currentProduct && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="title"
                  value={currentProduct.title}
                  onChange={handleInputChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme.colors.text.primary,
                      "& fieldset": {
                        borderColor: theme.colors.border,
                      },
                      "&:hover fieldset": {
                        borderColor: theme.colors.primary.main,
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: theme.colors.text.primary,
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.colors.text.secondary,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: "$",
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme.colors.text.primary,
                      "& fieldset": {
                        borderColor: theme.colors.border,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.colors.text.secondary,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  name="stockQuantity"
                  type="number"
                  value={currentProduct.stockQuantity}
                  onChange={handleInputChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme.colors.text.primary,
                      "& fieldset": {
                        borderColor: theme.colors.border,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.colors.text.secondary,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.colors.text.primary }}
                  gutterBottom
                >
                  Product Image
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {imagePreview && (
                    <Box
                      sx={{
                        mb: 2,
                        p: 2,
                        backgroundColor: theme.colors.background.default,
                        borderRadius: 1,
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  )}
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      backgroundColor: theme.colors.primary.main,
                      color: "#fff",
                      "&:hover": { backgroundColor: theme.colors.primary.dark },
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme.colors.text.primary,
                      "& fieldset": {
                        borderColor: theme.colors.border,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.colors.text.secondary,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Warranty (months)"
                  name="warranty"
                  type="number"
                  value={currentProduct.warranty}
                  onChange={handleInputChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme.colors.text.primary,
                      "& fieldset": {
                        borderColor: theme.colors.border,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.colors.text.secondary,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Delivery Information"
                  name="delivery"
                  value={currentProduct.delivery}
                  onChange={handleInputChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: theme.colors.text.primary,
                      "& fieldset": {
                        borderColor: theme.colors.border,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.colors.text.secondary,
                    },
                  }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ backgroundColor: theme.colors.background.paper }}>
          <Button
            onClick={handleDialogClose}
            sx={{ color: theme.colors.text.secondary }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProduct}
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: theme.colors.primary.main,
              color: "#fff",
              "&:hover": { backgroundColor: theme.colors.primary.dark },
            }}
          >
            Update Product
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
