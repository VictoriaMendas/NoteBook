import { createSlice } from "@reduxjs/toolkit";
import { fetchNotes, addNote, deleteNote } from "./operations.js";
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const notesSlice = createSlice({
  name: "Notes",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, handlePending)
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, handleRejected)
      .addCase(addNote.pending, handlePending)
      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [action.payload, ...state.items];
      })
      .addCase(addNote.rejected, handleRejected)
      .addCase(deleteNote.pending, handlePending)
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.items.findIndex((item) => {
          return item.id === action.payload.id;
        });
        state.items.splice(index, 1);
      })
      .addCase(deleteNote.rejected, handleRejected);
  },
});

export default notesSlice.reducer;
