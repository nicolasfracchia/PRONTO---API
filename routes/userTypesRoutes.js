const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const UserTypesController = require('../controllers/UserTypesController');

// GET
router.get('/', verifyToken([1]), UserTypesController.getAllUserTypes);
router.get('/:utId', verifyToken([1]), UserTypesController.getUserType);

module.exports = router;