import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TogglePasswordVisibility from "../components/TogglePasswordVisibility";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";

function Login() {
  const [loginCredentials, setLoginCredentials] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showCheckboxWarning, setShowCheckboxWarning] = useState(false);

  const navigate = useNavigate();
  const loginToStore = useAuthStore((state) => state.login);

  const { mutate: login, isPending } = useMutation({
    mutationFn: async () => await loginUser({ loginCredentials, password }),
    onSuccess: (data) => {
      toast.success("Login successful!");

      loginToStore(data.user, data.token);

      setTimeout(() => {
        navigate("/dashboard");
      }, 0);
    },
    onError: () => {
      setLoginError("Invalid credentials");
      toast.error("Login failed");
    },
  });

  return (
    <>
      <Navbar />
      <Container
        maxWidth="md"
        sx={{
          minHeight: "80vh",
          position: "relative",
        }}
      >
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom>
              Welcome Back,
            </Typography>

            {showCheckboxWarning && (
              <Typography color="error" sx={{ mb: 1 }}>
                Please check "Remember me"
              </Typography>
            )}

            {loginError && (
              <Typography color="error" variant="h5" sx={{ mb: 2 }}>
                {loginError}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Email or Username"
              margin="normal"
              variant="outlined"
              required
              value={loginCredentials}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginCredentials(e.target.value);
                setLoginError("");
              }}
            />
            <TogglePasswordVisibility
              required
              password={password}
              handlePassword={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setLoginError("");
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(e.target.checked);

                    if (e.target.checked) {
                      setShowCheckboxWarning(false);
                    }
                  }}
                />
              }
              label="Remember me"
              sx={{ mt: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                if (!rememberMe) {
                  setShowCheckboxWarning(true);
                  return;
                }

                login();
              }}
              disabled={isPending}
              sx={{ mt: 2 }}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
            <Typography marginTop={3}>
              Don't have an account yet?{" "}
              <Button variant="text" component={Link} to="/register">
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Container>
      <ToastContainer position="top-center" />
      <Footer />
    </>
  );
}

export default Login;
