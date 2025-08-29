import { Request, Response } from "express";
import { Note } from "../models/note.model";
import { User } from "../models/user.model";

// POST /notes → Create a note for the authenticated user
export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = (req as any).user?.id;

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const note = new Note({ user: userId, title, content });
    const saved = await note.save();
    res.status(201).json({ note: saved });
  } catch (err) {
    res.status(500).json({ message: "Failed to create note", error: err });
  }
};

// GET /notes → Get all notes of authenticated user
export const getMyNotes = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  try {
    const user = await User.findById(userId).select("name email");
    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ user, notes }); // ✔️ This must include `user`
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes", error: err });
  }
};

// DELETE /notes/:id → Delete a note by ID for the authenticated user

export const deleteNote = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const noteId = req.params.id;

  try {
    const deleted = await Note.findOneAndDelete({ _id: noteId, user: userId });

    if (!deleted) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Failed to delete note", error: err });
  }
};