import express from "express";

import { validateBody } from "../middlewares/validateBody.js";
import { createNoteSchema, NotesModel } from "../models/notes.js";

const router = express.Router();

// Отримати всі нотатки
router.get("/", async (req, res) => {
  try {
    console.log("GET /notes received");
    const notes = await NotesModel.find({});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in GET /notes:", error);
    res.status(500).json({ message: "Error reading notes" });
  }
});

// Створити нову нотатку
router.post("/", validateBody(createNoteSchema), async (req, res) => {
  try {
    console.log("POST /notes received:", req.body);

    const newNote = await NotesModel.create(req.body);

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in POST /notes:", error);
    res.status(500).json({ message: "Error creating note" });
  }
});

// Оновити нотатку
router.put("/:id", validateBody(createNoteSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await NotesModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in PUT /notes:", error);
    res.status(500).json({ message: "Error updating note" });
  }
});

// Видалити нотатку
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await NotesModel.findByIdAndDelete(id);
    res.status(204).json(deletedNote);
  } catch (error) {
    console.error("Error in DELETE /notes:", error);
    res.status(500).json({ message: "Error deleting note" });
  }
});

export default router;
