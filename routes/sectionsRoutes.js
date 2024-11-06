const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const SectionsController = require('../controllers/SectionsController');

// GET
router.get('/', SectionsController.getAllSections);
router.get('/:sectionId', SectionsController.getSection);

// POST
router.post('/', verifyToken([1]), SectionsController.newSection);

// PUT
router.put('/:sectionId', verifyToken([1]), SectionsController.updateSection);

// DELETE
router.delete('/:sectionId', verifyToken([1]), SectionsController.deleteSection);

module.exports = router;