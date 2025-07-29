import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavbarLoggedInUser from "../components/NavbarLoggedInUser";
import FooterLoggedInUser from "../components/FooterLoggedInUser";
import useAuthStore from "../store/authStore";
import { fetchUserIdentities, updateUserProfile } from "../api/user";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Close } from "@mui/icons-material";

declare global {
  interface Window {
    cloudinary: {
      openUploadWidget: (
        options: object,
        callback: (
          error: unknown,
          result: { event: string; info?: { secure_url: string } },
        ) => void,
      ) => void;
    };
  }
}

function UpdateProfile() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [error, setError] = useState("");
  const [existingUsers, setExistingUsers] = useState<
    { username: string; email: string }[]
  >([]);

  const initials = (
    (firstName?.charAt(0) || "") + (lastName?.charAt(0) || "")
  ).toUpperCase();

  const autoSaveAvatar = async (newAvatar: string) => {
    try {
      const updatedUser = await updateUserProfile({
        firstName,
        lastName,
        username,
        email,
        avatar: newAvatar,
      });
      setUser(updatedUser); // update Zustand
      setAvatar(newAvatar); // reflect immediately
      toast.success("Avatar updated successfully!");
    } catch {
      toast.error("Failed to update avatar.");
    }
  };

  const handleUpload = () => {
    if (!window.cloudinary) {
      toast.error("Cloudinary widget failed to load.");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: "dt47m5eoa",
        uploadPreset: "q2epy34o",
        sources: ["local", "url", "camera"],
        multiple: false,
        folder: "notely-avatars",
        resourceType: "image",
        cropping: true,
        croppingAspectRatio: 1,
      },
      (
        error: unknown,
        result: { event: string; info?: { secure_url: string } },
      ) => {
        if (!error && result.event === "success" && result.info?.secure_url) {
          autoSaveAvatar(result.info.secure_url);
        }
      },
    );
  };

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !email) {
      setError("All fields are required!");
      return;
    }

    const isUsernameTaken = existingUsers.some(
      (user) =>
        user.username === username && user.username !== currentUser?.username,
    );
    const isEmailTaken = existingUsers.some(
      (user) => user.email === email && user.email !== currentUser?.email,
    );

    if (isUsernameTaken || isEmailTaken) {
      const message = isUsernameTaken
        ? "Username is already taken."
        : "Email address is already in use.";
      setError(message);
      return;
    }

    try {
      const updatedUser = await updateUserProfile({
        firstName,
        lastName,
        username,
        email,
        avatar,
      });

      setUser(updatedUser);
      toast.success("Profile updated successfully!");
      navigate("/user");
    } catch {
      setError("Update failed! Something went wrong.");
    }
  };

  return (
    <>
      <NavbarLoggedInUser />
      <Toolbar sx={{ display: { xs: "flex", sm: "none" } }} />

      <Box
        sx={{
          background: "linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%)",
          height: 200,
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Avatar
          src={avatar || currentUser?.avatar || undefined}
          sx={{
            width: 120,
            height: 120,
            ml: 3,
            border: "4px solid white",
            boxShadow: 3,
            fontSize: 36,
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: currentUser?.avatar ? "transparent" : "#3A1C71",
            position: "absolute",
            bottom: -64,
          }}
        >
          {!avatar && initials}
        </Avatar>

        <Tooltip title="Upload profile picture" arrow>
          <IconButton
            onClick={handleUpload}
            sx={{
              position: "absolute",
              bottom: -72,
              left: "110px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              p: 0.5,
              boxShadow: 2,
              zIndex: 2,
            }}
          >
            <CameraAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Remove profile picture" arrow>
          <IconButton
            onClick={() => {
              autoSaveAvatar("");
            }}
            sx={{
              position: "absolute",
              bottom: -48,
              left: "130px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              p: 0.5,
              boxShadow: 2,
              zIndex: 2,
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Container maxWidth="sm" sx={{ pt: 10 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Edit Profile
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleUpdate}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setError("");
            }}
            required
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setError("");
            }}
            required
          />
          <TextField
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
          />

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => navigate("/user")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="primary"
            >
              Save Changes
            </Button>
          </Box>
        </Box>
        <ToastContainer position="top-center" />
      </Container>
      <FooterLoggedInUser />
    </>
  );
}

export default UpdateProfile;
