// import { createSlice } from "@reduxjs/toolkit";
// import { fetchNotes, addNote, deleteNote } from "./operations.js";
// const handlePending = (state) => {
//   state.loading = true;
//   state.error = null;
// };

// const handleRejected = (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// };

// const notesSlice = createSlice({
//   name: "Notes",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNotes.pending, handlePending)
//       .addCase(fetchNotes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchNotes.rejected, handleRejected)
//       .addCase(addNote.pending, handlePending)
//       .addCase(addNote.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = [action.payload, ...state.items];
//       })
//       .addCase(addNote.rejected, handleRejected)
//       .addCase(deleteNote.pending, handlePending)
//       .addCase(deleteNote.fulfilled, (state, action) => {
//         state.loading = false;

//         const index = state.items.findIndex((item) => {
//           return item.id === action.payload.id;
//         });
//         state.items.splice(index, 1);
//       })
//       .addCase(deleteNote.rejected, handleRejected);
//   },
// });

// export default notesSlice.reducer;
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
    // fetchNotesThunk
    builder
      .addCase(fetchNotesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // addNoteThunk
      .addCase(addNoteThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNoteThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes.push(action.payload);
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
