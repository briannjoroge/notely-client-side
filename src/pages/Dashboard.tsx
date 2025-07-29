import { Link } from "react-router-dom";
import NavbarLoggedInUser from "../components/NavbarLoggedInUser";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import FooterLoggedInUser from "../components/FooterLoggedInUser";
import useAuthStore from "../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUserNotes } from "../api/note";

function Dashboard() {
  const currentUser = useAuthStore((state) => state.user);
  const firstName = currentUser?.firstName
    ? currentUser.firstName.charAt(0).toUpperCase() +
      currentUser.firstName.slice(1)
    : "There 👋";

  const {
    data: userNotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userNotes"],
    queryFn: fetchUserNotes,
  });

  const topNotes = userNotes?.slice(0, 4);

  return (
    <>
      <NavbarLoggedInUser />
      <Toolbar sx={{ display: { xs: "flex", sm: "none" } }} />
      <Container maxWidth="md" sx={{ mt: { xs: 15, sm: 10, md: 10 } }}>
        <Box
          sx={{
            backgroundColor: "hsla(207, 54%, 81%, 0.80)",
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Hello, {firstName}!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Welcome back to Notely. Collect your thoughts today in an organized
            way.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/new-note"
            sx={{ mt: 2 }}
          >
            Write new note
          </Button>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Recent Note's
          </Typography>

          {isLoading ? (
            <Typography>Loading your note's...</Typography>
          ) : isError ? (
            <Typography color="error">Failed to load your note's.</Typography>
          ) : topNotes?.length === 0 ? (
            <Typography color="text.secondary">
              You haven't posted any note/idea with Notely yet. Let's get your
              creativity rolling!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {topNotes?.map((note) => (
                <Grid size={{ xs: 12, sm: 6 }} key={note.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <Tooltip title="Go to your profile">
                      <IconButton component={Link} to="/user" sx={{ p: 0 }}>
                        <Avatar
                          src={currentUser?.avatar || undefined}
                          alt="User Avatar"
                          sx={{
                            width: 48,
                            height: 48,
                            mr: 2,
                            border: "4px solid white",
                            boxShadow: 3,
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#fff",
                            backgroundColor: currentUser?.avatar
                              ? "transparent"
                              : "#3A1C71",
                          }}
                        >
                          {!currentUser?.avatar &&
                            (
                              (currentUser?.firstName?.charAt(0) || "") +
                              (currentUser?.lastName?.charAt(0) || "")
                            ).toUpperCase()}
                        </Avatar>
                      </IconButton>
                    </Tooltip>

                    <Box sx={{ flexGrow: 1 }}>
                      {" "}
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        textTransform="capitalize"
                        noWrap
                      >
                        {note.title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontStyle="italic"
                        color="text.secondary"
                        noWrap={false}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          mb: 0.5,
                        }}
                      >
                        {note.synopsis}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Published on,{" "}
                        {new Date(note.createdAt).toLocaleDateString()}
                      </Typography>
                      <Button
                        component={Link}
                        to={`/notes/${note.id}`}
                        variant="outlined"
                        size="small"
                        sx={{
                          mt: 1,
                          display: "block",
                          textTransform: "none",
                          textAlign: "center",
                        }}
                      >
                        Read More
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {(topNotes?.length ?? 0) > 3 && (
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/notes"
              >
                View All Notes
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      <FooterLoggedInUser />
    </>
  );
}

export default Dashboard;
