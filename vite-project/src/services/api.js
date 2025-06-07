import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export const fetchNotes = async () => {
  console.log("Fetching notes...");
  const response = await api.get("/notes");
  console.log(response.data);
  return response.data;
};

export const addNote = async (note) => {
  console.log("Adding note:", note);
  const response = await api.post("/notes", note);
  console.log("Add note response:", response.data); // Дебаг
  return response.data;
};

export const editNote = async (id, note) => {
  console.log(`Editing note with id ${id}:`, note);
  const response = await api.put(`/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id) => {
  console.log(`Deleting note with id ${id}`);
  await api.delete(`/notes/${id}`);
};
