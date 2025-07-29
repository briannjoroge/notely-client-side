import { useQuery } from "@tanstack/react-query";
import { fetchUserNotes } from "../api/note";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NavbarLoggedInUser from "../components/NavbarLoggedInUser";
import FooterLoggedInUser from "../components/FooterLoggedInUser";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { TimerRounded } from "@mui/icons-material";

export interface Note {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatar?: string;
  };
}

function MyNotes() {
  const currentUser = useAuthStore((state) => state.user);

  const {
    data: userNotes = [],
    isLoading,
    isError,
  } = useQuery<Note[]>({
    queryKey: ["userNotes"],
    queryFn: fetchUserNotes,
  });

  return (
    <>
      <NavbarLoggedInUser />
      <Toolbar sx={{ display: { xs: "flex", sm: "none" } }} />
      <Container maxWidth="lg" sx={{ mt: { xs: 15, sm: 10, md: 10 } }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          My Note's
        </Typography>
        <Divider sx={{ mb: 5 }} />

        <Grid container spacing={4}>
          {isLoading ? (
            <Typography textAlign="center" sx={{ mt: 5 }}>
              Loading your note's...
            </Typography>
          ) : isError ? (
            <Typography textAlign="center" color="error" sx={{ mt: 5 }}>
              Failed to load your note's
            </Typography>
          ) : userNotes.length === 0 ? (
            <Typography textAlign="center" sx={{ mt: 5 }}>
              You haven't published any note's yet
            </Typography>
          ) : (
            userNotes.map((note: Note) => (
              <Grid key={note.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
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

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" textTransform="capitalize" noWrap>
                      {note.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      fontStyle="italic"
                      color="text.secondary"
                      noWrap={false}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        mb: 0.5,
                      }}
                    >
                      {note.synopsis}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <Box>
                        <Typography variant="caption">
                          {note.author.firstName}. {""}
                          {note.author.lastName.charAt(0).toUpperCase()}
                        </Typography>

                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                          mt={0.5}
                        >
                          <Tooltip title="Your most recent profile edit">
                            <CalendarTodayIcon fontSize="small" />
                          </Tooltip>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block" }}
                          >
                            Published on{" "}
                            {new Date(note.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>

                        {note.createdAt !== note.updatedAt && (
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            mt={0.5}
                          >
                            <Tooltip title="Your most recent note edit">
                              <TimerRounded fontSize="small" color="action" />
                            </Tooltip>
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary" }}
                            >
                              Last updated —{" "}
                              {new Date(note.updatedAt).toLocaleString(
                                "en-US",
                                {
                                  dateStyle: "long",
                                  timeStyle: "short",
                                },
                              )}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    <Button
                      component={Link}
                      to={`/notes/${note.id}`}
                      variant="outlined"
                      size="small"
                      sx={{ mt: 2, textTransform: "none" }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <FooterLoggedInUser />
    </>
  );
}

export default MyNotes;
