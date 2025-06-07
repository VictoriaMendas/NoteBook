import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotes, addNote, editNote, deleteNote } from "../../services/api";

export const fetchNotesThunk = createAsyncThunk(
  "notes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const notes = await fetchNotes();
      console.log("fetchNotesThunk fulfilled, new notes:", notes); // Дебаг
      return notes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addNoteThunk = createAsyncThunk(
  "notes/addNote",
  async (note, thunkAPI) => {
    try {
      const newNote = await addNote(note);
      // Після створення нотатки оновлюємо список
      thunkAPI.dispatch(fetchNotesThunk());
      return newNote;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editNoteThunk = createAsyncThunk(
  "notes/editNote",
  async ({ id, note }, thunkAPI) => {
    try {
      const updatedNote = await editNote(id, note);
      // Після редагування оновлюємо список
      thunkAPI.dispatch(fetchNotesThunk());
      return updatedNote;
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
      // Після видалення оновлюємо список
      thunkAPI.dispatch(fetchNotesThunk());
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
