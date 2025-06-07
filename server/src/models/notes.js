import { Schema, model } from "mongoose";
import Joi from "joi";
const notesSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      required: [true, "Set title for note"],
    },
    content: {
      type: String,
      required: [true, "Set content for note"],
    },
  },
  {
    versionKey: "1",
    timestamps: true,
  }
);
export const NotesModel = model("note", notesSchema);

export const createNoteSchema = Joi.object({
  title: Joi.string().min(2).max(50),
  content: Joi.string().min(2).max(500),
});
