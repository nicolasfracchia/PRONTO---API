const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const CategoryController = require('../controllers/CategoryController');

// GET
router.get('/', CategoryController.getAllCategories);
router.get('/:categoryId', CategoryController.getCategory);

// POST
router.post('/', verifyToken([1]), CategoryController.newCategory);

// PUT
router.put('/:categoryId', verifyToken([1]), CategoryController.updateCategory);

// DELETE
router.delete('/:categoryId', verifyToken([1]), CategoryController.deleteCategory);

module.exports = router;