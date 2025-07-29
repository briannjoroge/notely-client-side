import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "90vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/landing.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: { xs: 2, md: 8 },
          py: 4,
          color: "white",
        }}
      >
        <Box sx={{ maxWidth: 500 }}>
          <Typography variant="h3" gutterBottom>
            Notely
          </Typography>
          <Typography variant="h6" gutterBottom>
            - Your Personalized Note's App.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Collect your thoughts with Notely. Note taking made simple. Keep
            your notes in an organized easy and safe way.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2 }}
            sx={{ width: "100%" }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/register"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/login"
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default LandingPage;
