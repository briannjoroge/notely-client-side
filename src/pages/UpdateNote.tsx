import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import NavbarLoggedInUser from "../components/NavbarLoggedInUser";
import FooterLoggedInUser from "../components/FooterLoggedInUser";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { fetchSingleNote, updateNote } from "../api/note";

function UpdateNote() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchSingleNote(noteId!),
    enabled: !!noteId,
  });

  const [title, setTitle] = useState(note?.title);
  const [synopsis, setSynopsis] = useState(note?.synopsis);
  const [content, setContent] = useState(note?.content);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setSynopsis(note.synopsis);
      setContent(note.content);
    }
  }, [note]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !synopsis || !content) {
      toast.error("Please fill in all fields before pressing Update!");
      return;
    }

    try {
      await updateNote(noteId!, { title, synopsis, content });
      toast.success("Note updated successfully!");
      navigate(`/notes/${noteId}`);
    } catch {
      toast.error("Failed to update note.");
    }
  };

  return (
    <>
      <NavbarLoggedInUser />
      <Toolbar sx={{ display: { xs: "flex", sm: "none" } }} />
      <Container maxWidth="md" sx={{ mt: { xs: 15, sm: 10, md: 10 } }}>
        {isLoading ? (
          <Typography textAlign="center">Loading your note's...</Typography>
        ) : isError || !note ? (
          <Typography textAlign="center" color="error">
            Failed to load your note's.
          </Typography>
        ) : (
          <>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Edit Note
            </Typography>
            <Divider sx={{ mb: 5 }} />

            <Box
              component="form"
              onSubmit={handleUpdate}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={note?.title}
                fullWidth
                variant="outlined"
                required
              />
              <TextField
                label="Synopsis"
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                defaultValue={note?.synopsis}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                required
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 4,
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  <TextField
                    label="Content (in Markdown)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    defaultValue={note?.content}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={10}
                    required
                  />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    width: { xs: "100%", md: "auto" },
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    padding: 2,
                    backgroundColor: "#f9f9f9",
                    maxHeight: 260,
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Content Preview
                  </Typography>
                  {content ? (
                    <ReactMarkdown>{content}</ReactMarkdown>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Nothing to preview yet.
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "center",
                  gap: 7,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/notes/${noteId}`)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update Note
                </Button>
              </Box>
            </Box>
          </>
        )}

        <ToastContainer position="top-center" />
      </Container>
      <FooterLoggedInUser />
    </>
  );
}

export default UpdateNote;
