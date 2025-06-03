import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotes, addNote, editNote, deleteNote } from "../../services/api";

export const fetchNotesThunk = createAsyncThunk(
  "notes/fetchNotes",
  async (_, thunkAPI) => {
    try {
      const response = await fetchNotes();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addNoteThunk = createAsyncThunk(
  "notes/addNote",
  async (note, thunkAPI) => {
    try {
      const response = await addNote(note);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editNoteThunk = createAsyncThunk(
  "notes/editNote",
  async ({ id, note }, thunkAPI) => {
    try {
      const response = await editNote(id, note);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteNoteThunk = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    try {
      await deleteNote(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
