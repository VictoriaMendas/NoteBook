import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
