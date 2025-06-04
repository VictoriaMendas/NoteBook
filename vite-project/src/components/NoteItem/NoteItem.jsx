import { Link } from "react-router-dom";
import styles from "./NoteItem.module.css";

const NoteItem = ({ note, onDelete }) => {
  return (
    <li className={styles.item}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
      <p>Updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
      <div className={styles.actions}>
        <Link to={`/edit/${note.id}`} className={styles.editBtn}>
          Edit
        </Link>
        <button onClick={() => onDelete(note.id)} className={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default NoteItem;
