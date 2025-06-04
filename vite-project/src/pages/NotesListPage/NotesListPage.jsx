import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotesThunk, deleteNoteThunk } from "../../redux/notes/operations";
import {
  selectNotes,
  selectIsLoading,
  selectError,
} from "../../redux/notes/selectors";
import NoteList from "../../components/NoteList/NoteList";
import styles from "./NotesListPage.module.css";

const NotesListPage = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes) || []; // Додаємо || [] для захисту від undefined
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchNotesThunk());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNoteThunk(id));
  };

  // Дебаг: виводимо нотатки в консоль
  console.log("Notes in NotesListPage:", notes);

  return (
    <div className={styles.container}>
      <h1>Notes</h1>
      <Link to="/create" className={styles.createLink}>
        Create New Note
      </Link>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Дебаг: виводимо нотатки прямо в JSX */}
      <div>
        <h2>Debug: Notes from Redux</h2>
        <pre>{JSON.stringify(notes, null, 2)}</pre>
      </div>
      {!isLoading && !error && (
        <NoteList notes={notes} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default NotesListPage;
