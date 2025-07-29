import {
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import NavbarLoggedInUser from "../components/NavbarLoggedInUser";
import FooterLoggedInUser from "../components/FooterLoggedInUser";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { TimerRounded } from "@mui/icons-material";

function UserProfile() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);

  const displayName = currentUser?.firstName || "Notely User";
  const username = currentUser?.username || "anonymous";
  const joined = currentUser?.dateJoined
    ? new Date(currentUser.dateJoined).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  const lastUpdate = currentUser?.lastProfileUpdate
    ? new Date(currentUser.lastProfileUpdate).toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      })
    : "—";

  const initials = (
    (currentUser?.firstName?.charAt(0) || "") +
    (currentUser?.lastName?.charAt(0) || "")
  ).toUpperCase();

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
          src={currentUser?.avatar || undefined}
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
          {!currentUser?.avatar && initials}
        </Avatar>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Box sx={{ textAlign: "left", ml: 2 }}>
          <Typography variant="h5" fontWeight="bold" textTransform="capitalize">
            {displayName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            @{username}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Joined {joined}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <Tooltip title="Your most recent profile edit">
                <TimerRounded fontSize="small" color="action" />
              </Tooltip>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Last updated — {lastUpdate}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{
            mt: 3,
            ml: 2,
            textTransform: "none",
            backgroundColor: "#1976d2",
          }}
          onClick={() => navigate("/update-profile")}
        >
          Edit Profile
        </Button>
      </Container>

      <FooterLoggedInUser />
    </>
  );
}

export default UserProfile;
