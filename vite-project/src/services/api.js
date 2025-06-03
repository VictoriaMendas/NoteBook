import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const fetchNotes = async () => {
  const response = await api.get("/notes");
  return response.data;
};

export const addNote = async (note) => {
  const response = await api.post("/notes", note);
  return response.data;
};

export const editNote = async (id, note) => {
  const response = await api.put(`/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id) => {
  await api.delete(`/notes/${id}`);
};
