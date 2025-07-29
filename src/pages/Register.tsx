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
import TogglePasswordVisibility from "../components/TogglePasswordVisibility";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchUserIdentities } from "../api/user";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [existingUsers, setExistingUsers] = useState<
    { username: string; email: string }[]
  >([]);
  const [showCheckboxWarning, setShowCheckboxWarning] = useState(false);
  const navigate = useNavigate();

  function handleConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);

    if (confirmPassword !== password) {
      setPasswordMismatchError("Passwords do not match");
      setIsMatch(false);
    } else {
      setPasswordMismatchError("");
      setIsMatch(true);
    }
  }

  function validatePassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasUpperCase && hasLowerCase && hasNumber && isLongEnough;
  }

  useEffect(() => {
    const fetchIdentifiers = async () => {
      try {
        const users = await fetchUserIdentities();
        setExistingUsers(users);
      } catch {
        toast.error("Failed to fetch existing users");
      }
    };

    fetchIdentifiers();
  }, []);

  function handleValidateAndRegister({
    rememberMe,
    isPasswordValid,
    isMatch,
    existingUsers,
    userName,
    email,
    register,
    setShowCheckboxWarning,
  }: {
    rememberMe: boolean;
    isPasswordValid: boolean;
    isMatch: boolean;
    existingUsers: { username: string; email: string }[];
    userName: string;
    email: string;
    register: () => void;
    setShowCheckboxWarning: (value: boolean) => void;
  }) {
    if (!rememberMe) {
      setShowCheckboxWarning(true);
      return;
    }

    if (!isPasswordValid || !isMatch) {
      return;
    }

    const isUsernameTaken = existingUsers.some(
      (user) => user.username === userName,
    );
    const isEmailTaken = existingUsers.some((user) => user.email === email);

    if (isUsernameTaken || isEmailTaken) {
      toast.error(
        isUsernameTaken
          ? "Username is already taken."
          : "Email address is already in use.",
      );
      return;
    }

    register();
  }

  const { mutate: register, isPending } = useMutation({
    mutationFn: async () =>
      await registerUser({
        firstName,
        lastName,
        username: userName,
        email,
        password,
      }),
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });

  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
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
            <Typography
              variant="h4"
              fontWeight={600}
              textAlign="center"
              gutterBottom
            >
              Register Account
            </Typography>

            {showCheckboxWarning && (
              <Typography color="error" sx={{ mb: 1 }}>
                Please Agree to our Terms and Conditions
              </Typography>
            )}

            <TextField
              fullWidth
              label="Firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />
            <TogglePasswordVisibility
              password={password}
              handlePassword={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newPassword = e.target.value;
                setPassword(newPassword);
                setIsMatch(newPassword === confirmPassword);
                setIsPasswordValid(validatePassword(newPassword));
              }}
              showStrength
            />

            {!isPasswordValid && password.length > 0 && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                Password must be at least 8 characters long, and include
                uppercase, lowercase, and a number.
              </Typography>
            )}

            <TogglePasswordVisibility
              password={confirmPassword}
              handlePassword={handleConfirmPassword}
              label="Confirm Password"
            />
            {passwordMismatchError && !isMatch && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {passwordMismatchError}
              </Typography>
            )}
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
              label="By signing up, you Agree to our Terms and Conditionss."
              sx={{ mt: 1 }}
            />
            <Button
              type="submit"
              onClick={() =>
                handleValidateAndRegister({
                  rememberMe,
                  isPasswordValid,
                  isMatch,
                  existingUsers,
                  userName,
                  email,
                  register,
                  setShowCheckboxWarning,
                })
              }
              fullWidth
              variant="contained"
              color="primary"
              disabled={!isMatch || isPending}
              sx={{
                mt: 2,
                "&.Mui-disabled": {
                  opacity: 0.7,
                  cursor: "not-allowed",
                  color: "white",
                  backgroundColor: "primary.main",
                  pointerEvents: "all !important",
                },
              }}
            >
              {isPending ? "Registering..." : "Get Started"}
            </Button>
          </Box>
        </Grid>

        <ToastContainer position="top-center" />
      </Container>
      <Footer />
    </>
  );
}

export default Register;
