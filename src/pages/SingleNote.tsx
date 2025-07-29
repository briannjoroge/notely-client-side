import { useQuery } from "@tanstack/react-query";
import { deleteNote, fetchSingleNote } from "../api/note";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import NavbarLoggedInUser from "../components/NavbarLoggedInUser";
import FooterLoggedInUser from "../components/FooterLoggedInUser";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../store/authStore";
import { TimerRounded, CalendarToday } from "@mui/icons-material";

function SingleNote() {
  const { noteId } = useParams();
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchSingleNote(noteId!),
    enabled: !!noteId, // only run if ID is available
  });

  const isAuthor = currentUser?.id === note?.author?.id;

  const handleDelete = async () => {
    if (!note?.id) {
      toast.error("Note ID is missing.");
      return;
    }

    try {
      await deleteNote(note.id);
      toast.success("Note successfully deleted!");
      navigate("/notes");
    } catch {
      toast.error("Failed to delete note.");
    }
  };

  return (
    <>
      <NavbarLoggedInUser />
      <Toolbar sx={{ display: { xs: "flex", sm: "none" } }} />
      <Container maxWidth="md" sx={{ mt: { xs: 15, sm: 10, md: 10 } }}>
        {isLoading ? (
          <Typography textAlign="center">Loading note's...</Typography>
        ) : isError || !note ? (
          <Typography textAlign="center" color="error">
            Failed to load note's
          </Typography>
        ) : (
          <>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: 2,
                mb: 4,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Tooltip title="Go to your profile">
                  <IconButton component={Link} to="/user" sx={{ p: 0, mr: 2 }}>
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
                <Box>
                  <Typography variant="body1">
                    {note.author.firstName}. {""}
                    {note.author.lastName.charAt(0).toUpperCase()}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <Tooltip title="Your most recent profile edit">
                      <CalendarToday fontSize="small" />
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
                    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                      <Tooltip title="Your most recent note edit">
                        <TimerRounded fontSize="small" color="action" />
                      </Tooltip>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        Last updated —{" "}
                        {new Date(note.updatedAt).toLocaleString("en-US", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                gutterBottom
                textTransform="uppercase"
                sx={{ mb: 2 }}
              >
                {note?.title}
              </Typography>

              <Typography
                variant="h6"
                fontStyle="italic"
                color="text.secondary"
                gutterBottom
                sx={{
                  mb: 4,
                  p: 2,
                  backgroundColor: "hsla(0, 0%, 89%, 1.00)",
                  borderRadius: 2,
                }}
              >
                {note?.synopsis}
              </Typography>

              <Box sx={{ mt: 4, width: "100%", lineHeight: 1.7 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    p: 2,
                    backgroundColor: "hsla(0, 30%, 89%, 1.00)",
                    borderRadius: 2,
                  }}
                >
                  <ReactMarkdown>{note?.content}</ReactMarkdown>
                </Typography>
              </Box>

              {!isLoading && isAuthor && note?.id && (
                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    component={Link}
                    to={`/notes/${note.id}/update`}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="medium"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Box>
              )}
            </Paper>
          </>
        )}

        <ToastContainer position="top-center" />
      </Container>
      <FooterLoggedInUser />
    </>
  );
}

export default SingleNote;
