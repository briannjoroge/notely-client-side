import { Facebook, Instagram, X } from "@mui/icons-material";
import { Box, Container, Link, Typography } from "@mui/material";
function FooterLoggedInUser() {
  return (
    <>
      <Container maxWidth="md" sx={{ mb: 5 }}>
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <Typography variant="h5" gutterBottom>
            Follow us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Link
              href="https://github.com/briannjoroge"
              target="_blank"
              color="hsla(210, 79%, 46%, 0.9)"
            >
              <Facebook fontSize="large" />
            </Link>
            <Link
              href="https://github.com/briannjoroge"
              target="_blank"
              color="hsla(210, 79%, 46%, 0.9)"
            >
              <Instagram fontSize="large" />
            </Link>
            <Link
              href="https://github.com/briannjoroge"
              target="_blank"
              color="hsla(210, 79%, 46%, 0.9)"
            >
              <X fontSize="large" />
            </Link>
          </Box>
        </Box>

        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Notely. All rights reserved.
        </Typography>
      </Container>
    </>
  );
}

export default FooterLoggedInUser;
