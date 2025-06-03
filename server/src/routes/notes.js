import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const notesFilePath = path.join(__dirname, "../../data/notes.json");

const router = Router();

// Допоміжна функція для читання нотаток із файлу
const readNotes = async () => {
  try {
    const data = await fs.readFile(notesFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Допоміжна функція для запису нотаток у файл
const writeNotes = async (notes) => {
  await fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2));
};

// GET /notes — повертає список нотаток
router.get("/", async (req, res) => {
  const notes = await readNotes();
  res.status(200).json(notes);
});

// POST /notes — створює нову нотатку
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const notes = await readNotes();
  const newNote = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notes.push(newNote);
  await writeNotes(notes);
  res.status(201).json(newNote);
});

// PUT /notes/:id — редагує нотатку
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const notes = await readNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    content,
    updatedAt: new Date().toISOString(),
  };
  await writeNotes(notes);
  res.status(200).json(notes[noteIndex]);
});

// DELETE /notes/:id — видаляє нотатку
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const notes = await readNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes.splice(noteIndex, 1);
  await writeNotes(notes);
  res.status(204).send();
});

export default router;
