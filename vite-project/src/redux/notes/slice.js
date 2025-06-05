import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotesThunk,
  addNoteThunk,
  editNoteThunk,
  deleteNoteThunk,
} from "./operations";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload; // Змінюємо з "items" на "notes"
        console.log("fetchNotesThunk fulfilled, new notes:", state.notes);
      })
      .addCase(fetchNotesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("fetchNotesThunk rejected, error:", action.payload);
      })
      // addNoteThunk
      .addCase(addNoteThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNoteThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes.push(action.payload); // Змінюємо з "items" на "notes"
      })
      .addCase(addNoteThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // editNoteThunk
      .addCase(editNoteThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editNoteThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(editNoteThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // deleteNoteThunk
      .addCase(deleteNoteThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })
      .addCase(deleteNoteThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default notesSlice.reducer;
