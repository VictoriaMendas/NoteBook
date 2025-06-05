import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editNoteThunk, fetchNotesThunk } from "../../redux/notes/operations";
import { selectNotes } from "../../redux/notes/selectors";
import NoteForm from "../../components/NoteForm/NoteForm";
import styles from "./EditNotePage.module.css";

const EditNotePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector(selectNotes);

  useEffect(() => {
    if (notes.length === 0) {
      dispatch(fetchNotesThunk());
    }
  }, [dispatch, notes.length]);

  const note = notes.find((note) => note.id === id);

  const handleSubmit = (updatedNote) => {
    dispatch(editNoteThunk({ id, note: updatedNote })).then(() => {
      navigate("/");
    });
  };

  if (!note) {
    return <p>Note not found</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Edit Note</h1>
      <NoteForm initialValues={note} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditNotePage;
