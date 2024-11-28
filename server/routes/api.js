const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { isLoggedIn } = require('../middleware/checkAuth'); // Your existing auth middleware

// API Routes
router.get('/notes', isLoggedIn, apiController.getNotes);
router.get('/notes/:id', isLoggedIn, apiController.getNote);
router.post('/notes', isLoggedIn, apiController.createNote);
router.put('/notes/:id', isLoggedIn, apiController.updateNote);
router.delete('/notes/:id', isLoggedIn, apiController.deleteNote);
router.post('/notes/search', isLoggedIn, apiController.searchNotes);

module.exports = router;