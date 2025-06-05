let mockNotes = [
  {
    id: "1",
    title: "Test Note 1",
    content: "This is a test note 1.",
    createdAt: "2025-06-04T14:00:00Z",
    updatedAt: "2025-06-04T14:00:00Z",
  },
  {
    id: "2",
    title: "Test Note 2",
    content: "This is a test note 2.",
    createdAt: "2025-06-04T15:00:00Z",
    updatedAt: "2025-06-04T15:00:00Z",
  },
];

export const fetchNotes = async () => {
  return [...mockNotes];
};

export const addNote = async (note) => {
  const newNote = {
    ...note,
    id: String(Math.random()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockNotes = [...mockNotes, newNote];
  return newNote;
};

export const editNote = async (id, note) => {
  const index = mockNotes.findIndex((n) => n.id === id);
  if (index === -1) throw new Error("Note not found");
  const updatedNote = {
    ...mockNotes[index],
    ...note,
    updatedAt: new Date().toISOString(),
  };
  mockNotes = [
    ...mockNotes.slice(0, index),
    updatedNote,
    ...mockNotes.slice(index + 1),
  ];
  return updatedNote;
};

export const deleteNote = async (id) => {
  const index = mockNotes.findIndex((n) => n.id === id);
  if (index === -1) throw new Error("Note not found");
  mockNotes = mockNotes.filter((n) => n.id !== id); // Оновлюємо mockNotes через фільтрацію
};
