"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.getMyNotes = exports.createNote = void 0;
const note_model_1 = require("../models/note.model");
const user_model_1 = require("../models/user.model");
// POST /notes → Create a note for the authenticated user
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!(title === null || title === void 0 ? void 0 : title.trim()) || !(content === null || content === void 0 ? void 0 : content.trim())) {
        return res.status(400).json({ message: "Title and content are required" });
    }
    try {
        const note = new note_model_1.Note({ user: userId, title, content });
        const saved = yield note.save();
        res.status(201).json({ note: saved });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create note", error: err });
    }
});
exports.createNote = createNote;
// GET /notes → Get all notes of authenticated user
const getMyNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const user = yield user_model_1.User.findById(userId).select("name email");
        const notes = yield note_model_1.Note.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ user, notes }); // ✔️ This must include `user`
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch notes", error: err });
    }
});
exports.getMyNotes = getMyNotes;
// DELETE /notes/:id → Delete a note by ID for the authenticated user
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const noteId = req.params.id;
    try {
        const deleted = yield note_model_1.Note.findOneAndDelete({ _id: noteId, user: userId });
        if (!deleted) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }
        res.status(200).json({ message: "Note deleted" });
    }
    catch (err) {
        console.error("Delete Error:", err);
        res.status(500).json({ message: "Failed to delete note", error: err });
    }
});
exports.deleteNote = deleteNote;
