import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://66cdad9a8ca9aa6c8ccb3c7d.mockapi.io";

export const fetchNotes = createAsyncThunk(
  "notes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/notes");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const addNote = createAsyncThunk(
  "Notes/addNote",
  async (newNote, thunkAPI) => {
    try {
      const response = await axios.post("/notes", newNote);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId, thunkAPI) => {
    try {
      const response = await axios.delete(`/notes/${noteId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);