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
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { createNote } from "../api/note";

function NewNote() {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const { mutate: publishNote, isPending } = useMutation({
    mutationFn: async () =>
      await createNote({
        title,
        synopsis,
        content,
      }),
    onSuccess: () => {
      toast.success("Note published successfully!");
      navigate("/notes");
    },
    onError: () => {
      toast.error("Failed to publish note");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !synopsis || !content) {
      toast.error("Please fill in all fields before publishing.");
      return;
    }
    publishNote();
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
          Create New Note
        </Typography>
        <Divider sx={{ mb: 5 }} />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            label="Synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            fullWidth
            variant="outlined"
            multiline
            rows={2}
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
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
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

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
            >
              {isPending ? "Saving Note..." : "Publish Note"}
            </Button>
          </Box>
        </Box>
        <ToastContainer position="top-center" />
      </Container>
      <FooterLoggedInUser />
    </>
  );
}

export default NewNote;
