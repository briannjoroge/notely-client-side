import axiosWithAuth from "./client";
import { type Note } from "../pages/MyNotes";

export const createNote = async (noteData: {
  title: string;
  synopsis: string;
  content: string;
}) => {
  const response = await axiosWithAuth.post("/notes", noteData);
  return response.data;
};

export const fetchUserNotes = async (): Promise<Note[]> => {
  const response = await axiosWithAuth.get("/user/notes");
  return response.data.notes;
};

export const fetchSingleNote = async (id: string): Promise<Note> => {
  const response = await axiosWithAuth.get(`/notes/${id}`);
  return response.data.note;
};

export const updateNote = async (
  noteId: string,
  updatedData: Partial<Note>,
) => {
  const res = await axiosWithAuth.put(`/notes/${noteId}`, updatedData);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await axiosWithAuth.delete(`/notes/${noteId}`);
  return res.data;
};

export const fetchDeletedNotes = async (): Promise<Note[]> => {
  const response = await axiosWithAuth.get("/notes/deleted");
  return response.data.notes;
};

export const restoreNote = async (noteId: string) => {
  const response = await axiosWithAuth.put(`/notes/restore/${noteId}`);
  return response.data;
};
