import { useEffect, useMemo, useState } from "react";
import "./Notes.css";

const initialNotes = [
  {
    id: 1,
    title: "Dashboard Design",
    text: "Complete the dashboard design and verify all pages with the Figma reference.",
    category: "Work",
    color: "#fff4cc",
    pinned: true,
    date: "Jul 15",
  },
  {
    id: 2,
    title: "Project Meeting",
    text: "Discuss frontend progress, pending pages and responsive design changes.",
    category: "Meeting",
    color: "#dff7e8",
    pinned: false,
    date: "Jul 14",
  },
  {
    id: 3,
    title: "Daily Tasks",
    text: "Complete Calendar, Mail, Task, Notes and Contacts pages.",
    category: "Personal",
    color: "#e8f4ff",
    pinned: true,
    date: "Jul 13",
  },
  {
    id: 4,
    title: "Design Ideas",
    text: "Use simple cards, clean spacing and FLOWER dashboard green colors.",
    category: "Ideas",
    color: "#f6e8ff",
    pinned: false,
    date: "Jul 12",
  },
];

const colors = [
  "#fff4cc",
  "#dff7e8",
  "#e8f4ff",
  "#f6e8ff",
  "#ffe8e8",
  "#ffffff",
];

function Notes() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("flower-notes");

    return savedNotes ? JSON.parse(savedNotes) : initialNotes;
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState("grid");
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [form, setForm] = useState({
    title: "",
    text: "",
    category: "Work",
    color: "#fff4cc",
  });

  useEffect(() => {
    localStorage.setItem("flower-notes", JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
          note.title.toLowerCase().includes(searchValue) ||
          note.text.toLowerCase().includes(searchValue);

        const matchesCategory =
          category === "All" || note.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [notes, search, category]);

  const openAddModal = () => {
    setEditingNote(null);

    setForm({
      title: "",
      text: "",
      category: "Work",
      color: "#fff4cc",
    });

    setShowModal(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);

    setForm({
      title: note.title,
      text: note.text,
      category: note.category,
      color: note.color,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNote(null);
  };

  const saveNote = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.text.trim()) {
      alert("Please enter note title and description.");
      return;
    }

    if (editingNote) {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                ...form,
              }
            : note
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        ...form,
        pinned: false,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      };

      setNotes((currentNotes) => [newNote, ...currentNotes]);
    }

    closeModal();
  };

  const deleteNote = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (confirmDelete) {
      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== id)
      );
    }
  };

  const togglePin = (id) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
            }
          : note
      )
    );
  };

  return (
    <div className="notes-page">
      <div className="notes-header">
        <div>
          <h1>Notes</h1>
          <p>Manage your personal and project notes</p>
        </div>

        <button className="add-note-btn" onClick={openAddModal}>
          + Add Note
        </button>
      </div>

      <div className="notes-toolbar">
        <div className="notes-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="notes-categories">
          {["All", "Work", "Meeting", "Personal", "Ideas"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="notes-view-buttons">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            ▦
          </button>

          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            ☰
          </button>
        </div>
      </div>

      {filteredNotes.length > 0 ? (
        <div className={`notes-container ${view}`}>
          {filteredNotes.map((note) => (
            <div
              className="note-card"
              key={note.id}
              style={{ background: note.color }}
            >
              <div className="note-card-top">
                <span className="note-category">{note.category}</span>

                <button
                  className={`pin-btn ${note.pinned ? "pinned" : ""}`}
                  onClick={() => togglePin(note.id)}
                  title="Pin note"
                >
                  {note.pinned ? "📌" : "⌖"}
                </button>
              </div>

              <h3>{note.title}</h3>

              <p>{note.text}</p>

              <div className="note-footer">
                <span>{note.date}</span>

                <div className="note-actions">
                  <button onClick={() => openEditModal(note)}>✎</button>

                  <button
                    className="delete-note-btn"
                    onClick={() => deleteNote(note.id)}
                  >
                    ♲
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-notes">
          <div>📝</div>
          <h3>No notes found</h3>
          <p>Create a new note or change your search.</p>

          <button onClick={openAddModal}>+ Add Note</button>
        </div>
      )}

      {showModal && (
        <div className="notes-modal-overlay" onMouseDown={closeModal}>
          <div
            className="notes-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="notes-modal-header">
              <h2>{editingNote ? "Edit Note" : "Add New Note"}</h2>

              <button onClick={closeModal}>×</button>
            </div>

            <form onSubmit={saveNote}>
              <label>Title</label>

              <input
                type="text"
                placeholder="Enter note title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              <label>Description</label>

              <textarea
                placeholder="Type something..."
                value={form.text}
                onChange={(e) =>
                  setForm({
                    ...form,
                    text: e.target.value,
                  })
                }
              />

              <label>Category</label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
              >
                <option>Work</option>
                <option>Meeting</option>
                <option>Personal</option>
                <option>Ideas</option>
              </select>

              <label>Color</label>

              <div className="note-color-list">
                {colors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    className={`note-color ${
                      form.color === color ? "selected" : ""
                    }`}
                    style={{ background: color }}
                    onClick={() =>
                      setForm({
                        ...form,
                        color,
                      })
                    }
                  >
                    {form.color === color && "✓"}
                  </button>
                ))}
              </div>

              <div className="notes-modal-actions">
                <button
                  type="button"
                  className="cancel-note-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="save-note-btn">
                  {editingNote ? "Save Changes" : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;