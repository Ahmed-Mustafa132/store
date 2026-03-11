import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axiosInstance from "../../axiosConfig/axiosConfig";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    imageFile: null,
    stockQuantity: "",
    warranty: "",
    delivery: "",
  });

  const [categories, setCategories] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Fetch categories from backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // إضافة الصورة كملف
    formDataToSend.append("image", formData.imageFile);

    // إضافة باقي البيانات
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stockQuantity", formData.stockQuantity);
    formDataToSend.append("warranty", formData.warranty);
    formDataToSend.append("delivery", formData.delivery);

    try {
      const response = await axiosInstance.post("/products", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        alert("Product created successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          category: "",
          image: "",
          imageFile: null,
          stockQuantity: "",
          warranty: "",
          delivery: "",
        });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Error creating product";
      alert("Failed to create product: " + errorMessage);
    }
  };

  // Handle creating a new category
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const response = await axiosInstance.post("/categories", {
        name: newCategoryName,
      });
      // Add the new category to the list and select it
      setCategories([...categories, response.data.category]);
      setOpenCategoryDialog(false);
      setNewCategoryName("");
      alert("Category created successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating category");
    }
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Create New Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Product title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{
                  startAdornment: "$",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                <TextField
                  fullWidth
                  required
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  variant="outlined"
                >
                  {categories.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  variant="outlined"
                  sx={{ height: "56px", minWidth: "100px" }}
                  onClick={() => setOpenCategoryDialog(true)}
                >
                  Add New
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="number"
                label="Stock Quantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Warranty"
                name="warranty"
                value={formData.warranty}
                onChange={handleInputChange}
                variant="outlined"
                placeholder="Warranty period"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Delivery Information"
                name="delivery"
                value={formData.delivery}
                onChange={handleInputChange}
                variant="outlined"
                placeholder="Estimated delivery time"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormData({
                    ...formData,
                    imageFile: file,
                    image: URL.createObjectURL(file),
                  });
                }}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Upload Product Image
                </Button>
              </label>
              {formData.image && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src={formData.image}
                    alt="Product preview"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                Create Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>

      {/* Dialog for creating new category */}
      <Dialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateCategory} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateProduct;
