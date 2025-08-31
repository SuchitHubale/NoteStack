const express = require('express');
const { 
  createNote, 
  getMyNotes, 
  deleteNote 
} = require('../controllers/note.controller');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

router.post('/notes', authenticate, createNote);
router.get('/notes', authenticate, getMyNotes);
router.get('/notes/me', authenticate, getMyNotes);
router.delete('/notes/:id', authenticate, deleteNote);

module.exports = router;
