import NavbarLoggedInUser from "../components/NavbarLoggedInUser";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import FooterLoggedInUser from "../components/FooterLoggedInUser";
import { useQuery } from "@tanstack/react-query";
import { fetchDeletedNotes, restoreNote } from "../api/note";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import ReactMarkdown from "react-markdown";
import { CalendarToday, TimerRounded } from "@mui/icons-material";
import { useState } from "react";

function DeletedNotes() {
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>(
    {},
  );

  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);

  const {
    data: deletedNotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deletedNotes"],
    queryFn: fetchDeletedNotes,
  });

  const handleRestore = async (noteId: string) => {
    try {
      await restoreNote(noteId);
      toast.success("Note restored!");
      navigate("/notes");
    } catch {
      toast.error("Failed to restore note.");
    }
  };

  const toggleExpand = (noteId: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

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
          Deleted Note's
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography color="error" fontStyle="italic" mb={2} gutterBottom>
          Contents in this trash bin will be archived for deletion in 30 days!
        </Typography>

        {isLoading ? (
          <Typography textAlign="center">
            Loading your deleted note's...
          </Typography>
        ) : isError ? (
          <Typography textAlign="center" color="error">
            Failed to load your deleted note's.
          </Typography>
        ) : deletedNotes?.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            You have no deleted note's.
          </Typography>
        ) : (
          deletedNotes?.map((note) => {
            const deletedOn = note.deletedAt
              ? new Date(note.deletedAt).toLocaleString("en-US", {
                  dateStyle: "long",
                  timeStyle: "short",
                })
              : "—";

            return (
              <Card key={note.id} sx={{ mb: 4, opacity: 0.8 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Tooltip title="Go to your profile">
                    <IconButton
                      component={Link}
                      to="/user"
                      sx={{ p: 0, mr: 2 }}
                    >
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

                    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                      <Tooltip title="Date deleted">
                        <TimerRounded fontSize="small" color="action" />
                      </Tooltip>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        Deleted on - {deletedOn}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {note.synopsis}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: expandedNotes[note.id] ? "none" : 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                    </Typography>

                    <Button
                      size="small"
                      onClick={() => toggleExpand(note.id)}
                      sx={{ mt: 1, textTransform: "none" }}
                    >
                      {expandedNotes[note.id] ? "Show less" : "Read more"}
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      justifyContent: "space-between",
                      mx: 4,
                      gap: 2,
                    }}
                  >
                    <Chip
                      label="Deleted!"
                      color="error"
                      variant="outlined"
                      sx={{ mt: 2 }}
                    />
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      sx={{ mt: 2 }}
                      onClick={() => handleRestore(note.id)}
                    >
                      Restore
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            );
          })
        )}

        <ToastContainer position="top-center" />
      </Container>
      <FooterLoggedInUser />
    </>
  );
}

export default DeletedNotes;
