import NoteItem from "../NoteItem/NoteItem";
import styles from "./NoteList.module.css";

const NoteList = ({ notes, onDelete }) => {
  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default NoteList;
