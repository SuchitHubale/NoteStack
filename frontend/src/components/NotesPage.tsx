import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast, Toaster } from "react-hot-toast";
import {
  Trash2,
  Plus,
  Edit3,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.svg";
interface Note {
  _id: string;
  title: string;
  content: string;
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState(new Set());
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data.notes);
        setUser(res.data.user);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load notes");
      }
    };
    fetchData();
  }, []);

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const res = await API.post(
        "/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([res.data.note, ...notes]);
      setTitle("");
      setContent("");
      setShowForm(false);
      toast.success("Note created");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create note");
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!id || id === "undefined" || id === "null") {
      console.error("Invalid note ID provided:", id);
      toast.error("Cannot delete note: Invalid ID");
      return;
    }

    try {
      await API.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== id)); // Changed from note._id to note.id
      toast.success("Note deleted successfully");
    } catch (err: any) {
      console.error("Delete API error:", err);
      toast.error(err.response?.data?.message || "Failed to delete note");
    }
  };
  const toggleNoteExpansion = (noteId: string) => {
    setExpandedNotes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(noteId)) {
        newSet.delete(noteId);
      } else {
        newSet.add(noteId);
      }
      return newSet;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Mobile and Desktop Container */}
      <div className="max-w-md mx-auto lg:max-w-7xl lg:px-8">
        {/* Mobile Layout */}
        <div className="lg:hidden bg-white min-h-screen">
          {/* Mobile Header */}
          <div className="flex justify-between items-center py-3 border-b border-gray-200 mb-4 px-4">
            <div className="flex items-center gap-3">
              <img src={icon} alt="logo" className="w-6 h-6" />
              <h1 className="text-lg font-medium">Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-blue-600 hover:underline font-semibold underline"
            >
              Sign Out
            </button>
          </div>

          <div className="px-4">
            {/* Mobile Welcome Card */}
            {user && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200 shadow-sm">
                <p className="text-lg text-gray-800 font-bold">
                  Welcome, {user.name}!
                </p>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
              </div>
            )}

            {/* Mobile Create Note Button/Form */}
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mb-4 font-medium transition-colors"
              >
                Create Note
              </button>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mb-3 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleAddNote}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                  >
                    Save Note
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setTitle("");
                      setContent("");
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Notes List */}
            <div>
              <h3 className="font-medium mb-3">Notes</h3>
              {notes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">
                    <Edit3 className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-400">No notes yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notes.map((note, idx) => (
                    <div
                      key={note._id || idx}
                      className="bg-white border border-[#D9D9D9] rounded-lg p-3 shadow-2xl"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {note.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {expandedNotes.has(note._id)
                              ? note.content
                              : `${note.content.substring(0, 100)}${
                                  note.content.length > 100 ? "..." : ""
                                }`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                          {note.content.length > 100 && (
                            <button
                              onClick={() => toggleNoteExpansion(note._id)}
                              className="text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              {expandedNotes.has(note._id) ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          )}
                          <button
                            onClick={() =>
                              note._id && handleDeleteNote(note._id)
                            }
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block py-8">
          {/* Desktop Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="flex justify-between items-center px-8 py-6">
              <div className="flex items-center gap-4">
                <img src={icon} alt="logo" className="w-8 h-8" />
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div>
              <button
                onClick={handleLogout}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Desktop Welcome Section */}
          {user && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 mb-8 text-white shadow-lg">
              <h2 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h2>
              <p className="text-blue-100 text-lg">{user.email}</p>
              <div className="mt-6">
                <p className="text-blue-100">
                  You have {notes.length}{" "}
                  {notes.length === 1 ? "note" : "notes"} saved
                </p>
              </div>
            </div>
          )}

          {/* Desktop Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Create Note Section */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Plus size={20} />
                  Create New Note
                </h3>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Write your note content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddNote}
                      disabled={!title.trim() || !content.trim()}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Save Note
                    </button>
                    <button
                      onClick={() => {
                        setTitle("");
                        setContent("");
                      }}
                      className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Grid Section */}
            <div className="xl:col-span-2">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your Notes
                </h3>
                <p className="text-gray-600">
                  Click on any note title to view its content
                </p>
              </div>

              {notes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Edit3 className="w-16 h-16 mx-auto" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    No notes yet
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Create your first note to get started with organizing your
                    thoughts.
                  </p>
                  <button
                    onClick={() =>
                      document
                        .querySelector(
                          'input[placeholder="Enter note title..."]'
                        )
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Create Your First Note
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                      {/* Note Header - Always Visible */}
                      <div className="flex justify-between items-center p-4">
                        <button
                          onClick={() => toggleNoteExpansion(note.id)}
                          className="flex-1 text-left group"
                          title="Click to view content"
                        >
                          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                            {note.title}
                            <span className="text-gray-400 group-hover:text-blue-500 text-sm">
                              {expandedNotes.has(note.id) ? "▲" : "▼"}
                            </span>
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {note.content.length} characters • Click to{" "}
                            {expandedNotes.has(note.id) ? "hide" : "view"}
                          </p>
                        </button>

                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2 ml-2"
                          title="Delete note"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Note Content - Shown/Hidden on Click */}
                      {expandedNotes.has(note.id) && (
                        <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
                          <div className="pt-3">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                              {note.content}
                            </p>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-400">
                              Created:{" "}
                              {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
