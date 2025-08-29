import express from "express";
import { createNote, getMyNotes, deleteNote } from "../controllers/note.controller";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/notes", authenticate, createNote);
router.get("/notes", authenticate, getMyNotes);
router.get("/notes/me", authenticate, getMyNotes); 
router.delete("/notes/:id", authenticate, deleteNote);

export default router;
