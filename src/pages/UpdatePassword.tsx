import { useState } from "react";
import NavbarLoggedInUser from "../components/NavbarLoggedInUser";
import FooterLoggedInUser from "../components/FooterLoggedInUser";
import { toast, ToastContainer } from "react-toastify";
import {
  Box,
  Button,
  Container,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import TogglePasswordVisibility from "../components/TogglePasswordVisibility";
import { checkCurrentPassword, updatePassword } from "../api/user";

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isNewPasswordMatch, setIsNewPasswordMatch] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState("");

  function validatePassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasUpperCase && hasLowerCase && hasNumber && isLongEnough;
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password cannot be the same as current password.");
      return;
    }

    if (!isNewPasswordValid) {
      toast.error("New Password must meet all requirements!");
      return;
    }

    try {
      const validCurrent = await checkCurrentPassword(currentPassword);
      if (!validCurrent) {
        toast.error("Your current password is incorrect.");
        setCurrentPassword("");
        return;
      }

      await updatePassword({ currentPassword, newPassword });
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch {
      toast.error("Something went wrong while updating password.");
    }
  };

  function handleConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const confirmPassword = e.target.value;
    setConfirmNewPassword(confirmPassword);

    if (confirmPassword !== newPassword) {
      setPasswordMismatchError("Passwords do not match");
      setIsNewPasswordMatch(false);
    } else {
      setPasswordMismatchError("");
      setIsNewPasswordMatch(true);
    }
  }

  return (
    <>
      <NavbarLoggedInUser />
      <Toolbar sx={{ display: { xs: "flex", sm: "none" } }} />
      <Container maxWidth="md" sx={{ mt: { xs: 15, sm: 10, md: 10 } }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Update Password
        </Typography>
        <Divider sx={{ mb: 5 }} />

        <Box
          component="form"
          onSubmit={handlePasswordUpdate}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TogglePasswordVisibility
            label="Current Password"
            password={currentPassword}
            handlePassword={(e) => setCurrentPassword(e.target.value)}
          />
          <TogglePasswordVisibility
            label="New Password"
            password={newPassword}
            handlePassword={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newPassword = e.target.value;
              setNewPassword(newPassword);
              setIsNewPasswordMatch(newPassword == confirmNewPassword);
              setIsNewPasswordValid(validatePassword(newPassword));
            }}
            showStrength
          />

          {!isNewPasswordValid && newPassword.length > 0 && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              Password must be at least 8 characters long, and include
              uppercase, lowercase, and a number.
            </Typography>
          )}

          <TogglePasswordVisibility
            label="Confirm New Password"
            password={confirmNewPassword}
            handlePassword={handleConfirmPassword}
          />

          {passwordMismatchError && !isNewPasswordMatch && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {passwordMismatchError}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Update Password
            </Button>
          </Box>
        </Box>

        <ToastContainer position="top-center" />
      </Container>
      <FooterLoggedInUser />
    </>
  );
}

export default UpdatePassword;
