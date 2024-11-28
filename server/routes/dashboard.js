const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

/**
 * Dashboard Routes 
*/
router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote);
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote);
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteNote);
router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNote);
router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNoteSubmit);
router.get('/dashboard/search', isLoggedIn, dashboardController.dashboardSearch);
router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit);

router.get('/myid', (req, res) => {
    res.json({
        userId: req.user.id,
        name: req.user.firstName,
        // Print the actual ObjectId for API testing
        objectId: mongoose.Types.ObjectId(req.user.id)
    });
});

module.exports = router;