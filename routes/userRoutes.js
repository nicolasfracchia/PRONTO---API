const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const UserController = require('../controllers/UserController');


// GET
router.get('/', verifyToken([1]), UserController.getAllUsers);
router.get('/:userId', verifyToken([1, 2, 3]), UserController.getUser);

// POST
router.post('/', verifyToken([1, 2]), UserController.newUser);
router.post('/customer', UserController.newCustomer);
router.post('/login', UserController.login);

// PUT
router.put('/:userId', verifyToken([1, 2]), UserController.updateUser);

// PATCH
router.patch('/', verifyToken([1, 2, 3]), UserController.updateUserProfile);

// DELETE
router.delete('/:userId', verifyToken([1, 3]), UserController.deleteUser);

module.exports = router;