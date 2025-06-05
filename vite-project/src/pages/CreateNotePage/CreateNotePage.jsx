import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNoteThunk } from "../../redux/notes/operations";
import NoteForm from "../../components/NoteForm/NoteForm";
import styles from "./CreateNotePage.module.css";

const CreateNotePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (note) => {
    dispatch(addNoteThunk(note)).then(() => {
      navigate("/");
    });
  };

  return (
    <div className={styles.container}>
      <h1>Create Note</h1>
      <NoteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateNotePage;
