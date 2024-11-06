const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const OrdersController = require('../controllers/OrdersController');

// GET
router.get('/type/:type', verifyToken([1,2,3]), OrdersController.getOrdersByType);

// POST
router.post('/', verifyToken([1,2,3]), OrdersController.newOrder);

// PATCH
router.patch('/:orderId', verifyToken([1,2,3]), OrdersController.updateStatus);

module.exports = router;