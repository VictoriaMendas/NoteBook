import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNoteThunk } from "../../redux/notes/operations";

const CreateNotePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }
    console.log("Submitting note:", { title, content }); // Дебаг
    dispatch(addNoteThunk({ title, content }))
      .unwrap()
      .then((newNote) => {
        console.log("Note created successfully:", newNote); // Дебаг
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to create note:", error);
        alert(`Failed to create note: ${error}`);
      });
  };

  return (
    <div>
      <h1>Create Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateNotePage;
