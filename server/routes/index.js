const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

/**
 * App Routes 
*/
router.get('/', mainController.homepage);
router.get('/about', mainController.about);

router.get('/myid', (req, res) => {
    if (req.user) {
        res.json({
            userId: req.user.id,
            name: req.user.firstName
        });
    } else {
        res.json({ message: 'Not logged in' });
    }
});

router.get('/session', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            cookie: req.headers.cookie,
            sessionID: req.sessionID,
            user: {
                id: req.user.id,
                name: req.user.firstName
            }
        });
    } else {
        res.json({ message: 'Not logged in' });
    }
});

module.exports = router;