import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Divider,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useAuth } from "../../Context/AuthContext";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";

export default function Login() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axiosInstance.post("/users/login", {
          email,
          password,
        });
        login(response.data.token, response.data.user);
        navigate("/");
        window.location.reload();
      } else {
        const response = await axiosInstance.post("/users/register", {
          name,
          email,
          password,
        });
        setIsLogin(true);
        setError("Registration successful! Please login.");
      }
    } catch (err) {
      setError(isLogin ? "Invalid email or password" : "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.colors.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: "1400px",
          width: "100%",
          height: { xs: "auto", md: "90vh" },
          alignItems: "stretch",
          flexDirection: { xs: "column", md: "row" },
          position: "relative",
          zIndex: 1,
          gap: 0,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Info Panel - Left for Login, Right for Register */}
        <Box
          sx={{
            flex: 1,
            background: theme.colors.background.caffe,
            padding: { xs: "40px 30px", md: "60px 50px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            order: isLogin ? 1 : 2,
            boxShadow: isLogin
              ? "10px 0 30px rgba(0, 0, 0, 0.2)"
              : "-10px 0 30px rgba(0, 0, 0, 0.2)",
            minHeight: { xs: "300px", md: "auto" },
            animation: "slideInInfo 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            "@keyframes slideInInfo": {
              from: {
                opacity: 0,
                transform: isLogin ? "translateX(-80px)" : "translateX(80px)",
              },
              to: {
                opacity: 1,
                transform: "translateX(0)",
              },
            },
          }}
        >
          {/* Info Text */}
          <Box>
            <Typography
              component="h2"
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.colors.text.primary,
                mb: 2,
              }}
            >
              {isLogin ? "Welcome Back" : "Join Our Community"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.colors.text.secondary,
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              {isLogin
                ? "Sign in to access your account and continue shopping beautiful Store Names with us."
                : "Create an account to explore our amazing collection and enjoy exclusive offers!"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {isLogin ? (
                <>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.text.secondary }}
                  >
                    ✓ Access your orders
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.text.secondary }}
                  >
                    ✓ Quick checkout
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.text.secondary }}
                  >
                    ✓ Saved preferences
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.text.secondary }}
                  >
                    ✓ Exclusive deals
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.text.secondary }}
                  >
                    ✓ Track orders
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.colors.text.secondary }}
                  >
                    ✓ Personalized recommendations
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>

        {/* Form Panel - Right for Login, Left for Register */}
        <Box
          sx={{
            flex: 1,
            background: theme.colors.background.paper,
            padding: { xs: "40px 30px", md: "60px 50px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            order: isLogin ? 2 : 1,
            animation: "slideInForm 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            "@keyframes slideInForm": {
              from: {
                opacity: 0,
                transform: isLogin ? "translateX(80px)" : "translateX(-80px)",
              },
              to: {
                opacity: 1,
                transform: "translateX(0)",
              },
            },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontWeight: 700,
                color: theme.colors.text.primary,
                mb: 1,
              }}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.colors.text.secondary,
              }}
            >
              {isLogin
                ? "Enter your details to access your account"
                : "Fill in the information below"}
            </Typography>
          </Box>

          {/* Alert */}
          {error && (
            <Alert
              severity={error.includes("successful") ? "success" : "error"}
              sx={{
                mb: 3,
                borderRadius: "12px",
                "& .MuiAlert-icon": {
                  fontSize: "24px",
                },
              }}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Name Field - Register Only */}
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover fieldset": {
                      borderColor: theme.colors.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.colors.primary.main,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    fontSize: "16px",
                    padding: "16px 16px",
                  },
                }}
                variant="outlined"
              />
            )}

            {/* Email Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover fieldset": {
                    borderColor: theme.colors.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.colors.primary.main,
                    borderWidth: "2px",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: "16px",
                  padding: "16px 16px",
                },
              }}
              variant="outlined"
            />

            {/* Password Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: theme.colors.primary.main }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover fieldset": {
                    borderColor: theme.colors.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.colors.primary.main,
                    borderWidth: "2px",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: "16px",
                  padding: "16px 16px",
                },
              }}
              variant="outlined"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 3,
                padding: "14px 0",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%)`,
                boxShadow: `0 8px 24px ${theme.colors.primary.main}40`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 32px ${theme.colors.primary.main}60`,
                },
                "&:active": {
                  transform: "translateY(0px)",
                },
              }}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            {/* Divider */}
            <Divider
              sx={{
                my: 2,
                color: theme.colors.text.secondary,
                fontSize: "14px",
                "&::before, &::after": {
                  borderColor: theme.colors.text.secondary,
                  opacity: 0.3,
                },
              }}
            >
              or
            </Divider>

            {/* Toggle Link */}
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(!isLogin);
                  setError("");
                }}
                sx={{
                  color: theme.colors.primary.main,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.colors.primary.dark,
                    textDecoration: "underline",
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
