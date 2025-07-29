import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="h2">
          Notely
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">
            About Us
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/register"
            sx={{
              color: "white",
              backgroundColor: "#4db6ac",
              "&:hover": {
                backgroundColor: "#38A093",
                transform: "scale(1.05)",
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
