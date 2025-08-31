const Note = require('../models/note.model');
const User = require('../models/user.model');

// Create a new note
async function createNote(req, res) {
  const { title, content } = req.body;
  const userId = req.user?.id;

  // Validate input
  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ 
      success: false,
      message: 'Title and content are required' 
    });
  }

  try {
    const note = new Note({ 
      user: userId, 
      title, 
      content 
    });
    
    const savedNote = await note.save();
    
    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      note: savedNote
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create note',
      error: error.message
    });
  }
}

// Get all notes for the authenticated user
async function getMyNotes(req, res) {
  const userId = req.user?.id;
  
  try {
    const user = await User.findById(userId).select('name email');
    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      user,
      notes,
      count: notes.length
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notes',
      error: error.message
    });
  }
}

// Delete a note by ID
async function deleteNote(req, res) {
  const userId = req.user?.id;
  const noteId = req.params.id;

  if (!noteId || noteId === "undefined") {
    return res.status(400).json({
      success: false,
      message: "Note ID is missing or invalid"
    });
  }

  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      user: userId
    });

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: 'Note not found or unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete note',
      error: error.message
    });
  }
}



module.exports = {
  createNote,
  getMyNotes,
  deleteNote
};
