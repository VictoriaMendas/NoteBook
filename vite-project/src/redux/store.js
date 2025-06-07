import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./notes/slice";




export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },

});


