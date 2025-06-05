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
  const notes = useSelector(selectNotes) || [];
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (notes.length === 0) {
      dispatch(fetchNotesThunk());
    }
  }, [dispatch, notes.length]);

  const handleDelete = (id) => {
    dispatch(deleteNoteThunk(id))
      .unwrap()
      .then(() => {
        dispatch(fetchNotesThunk());
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  console.log("Notes in NotesListPage:", notes);

  return (
    <div className={styles.container}>
      <h1>Notes</h1>
      <Link to="/create" className={styles.createLink}>
        Create New Note
      </Link>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {notes.length === 0 && !isLoading && !error && <p>No notes available.</p>}
      {!isLoading && !error && notes.length > 0 && (
        <NoteList notes={notes} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default NotesListPage;
