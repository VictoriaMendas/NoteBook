// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchNotesThunk, deleteNoteThunk } from "../../redux/notes/operations";
// import {
//   selectNotes,
//   selectIsLoading,
//   selectError,
// } from "../../redux/notes/selectors";
// import NoteList from "../../components/NoteList/NoteList";
// import styles from "./NotesListPage.module.css";

// const NotesListPage = () => {
//   const dispatch = useDispatch();
//   const notes = useSelector(selectNotes) || [];
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);

//   useEffect(() => {
//     if (notes.length === 0) {
//       dispatch(fetchNotesThunk());
//     }
//   }, [dispatch, notes.length]);

//   const handleDelete = (id) => {
//     dispatch(deleteNoteThunk(id))
//       .unwrap()
//       .then(() => {
//         dispatch(fetchNotesThunk());
//       })
//       .catch((error) => {
//         console.error("Error deleting note:", error);
//       });
//   };

//   console.log("Notes in NotesListPage:", notes);

//   return (
//     <div className={styles.container}>
//       <h1>Notes</h1>
//       <Link to="/create" className={styles.createLink}>
//         Create New Note
//       </Link>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}

//       {notes.length === 0 && !isLoading && !error && <p>No notes available.</p>}
//       {!isLoading && !error && notes.length > 0 && (
//         <NoteList notes={notes} onDelete={handleDelete} />
//       )}
//     </div>
//   );
// };

// export default NotesListPage;
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotesThunk } from "../../redux/notes/operations";
import {
  selectNotes,
  selectIsLoading,
  selectError,
} from "../../redux/notes/selectors";
import { deleteNoteThunk } from "../../redux/notes/operations";

const NotesListPage = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchNotesThunk());
  }, [dispatch]);

  // Тимчасовий дебаг
  console.log("Notes in Redux:", notes);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Notes List</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <Link to="/create">
        <button>Create New Note</button>
      </Link>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <Link to={`/edit/${note.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => dispatch(deleteNoteThunk(note.id))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesListPage;
