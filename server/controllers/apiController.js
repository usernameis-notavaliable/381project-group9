const Note = require("../models/Notes");
const mongoose = require("mongoose");

/**
 * GET /api/notes
 * Get all notes with pagination
 */
exports.getNotes = async (req, res) => {
    try {
        let perPage = 12;
        let page = req.query.page || 1;

        const notes = await Note.aggregate([
            { $sort: { updatedAt: -1 } },
            { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
            {
                $project: {
                    title: { $substr: ["$title", 0, 30] },
                    body: { $substr: ["$body", 0, 100] },
                }
            }
        ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Note.count();

        res.json({
            notes,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * GET /api/notes/:id
 * Get specific note
 */
exports.getNote = async (req, res) => {
    try {
        const note = await Note.findById({ _id: req.params.id })
            .where({ user: req.user.id })
            .lean();

        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * POST /api/notes
 * Create new note
 */
exports.createNote = async (req, res) => {
    try {
        const note = await Note.create({
            user: req.user.id,
            title: req.body.title,
            body: req.body.body
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * PUT /api/notes/:id
 * Update note
 */
exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            {
                title: req.body.title,
                body: req.body.body,
                updatedAt: Date.now()
            },
            { new: true }
        );
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * DELETE /api/notes/:id
 * Delete note
 */
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.deleteOne({
            _id: req.params.id,
            user: req.user.id
        });
        if (note.deletedCount > 0) {
            res.json({ message: "Note deleted successfully" });
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * POST /api/notes/search
 * Search notes
 */
exports.searchNotes = async (req, res) => {
    try {
        const searchTerm = req.query.q || req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const searchResults = await Note.find({
            user: req.user.id,
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
                { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
            ],
        });

        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};