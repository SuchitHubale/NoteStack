"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("../controllers/note.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/notes", auth_1.authenticate, note_controller_1.createNote);
router.get("/notes", auth_1.authenticate, note_controller_1.getMyNotes);
router.get("/notes/me", auth_1.authenticate, note_controller_1.getMyNotes);
router.delete("/notes/:id", auth_1.authenticate, note_controller_1.deleteNote);
exports.default = router;
