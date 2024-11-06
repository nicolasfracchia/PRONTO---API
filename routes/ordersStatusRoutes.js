const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const OrdersStatusController = require('../controllers/OrdersStatusController');

// GET
router.get('/', OrdersStatusController.getAllOrdersStatus);
router.get('/:osId', OrdersStatusController.getOrdersStatus);

// POST
router.post('/', verifyToken([1]), OrdersStatusController.newOrdersStatus);

// PUT
router.put('/:osId', verifyToken([1]), OrdersStatusController.updateOrdersStatus);

// DELETE
router.delete('/:osId', verifyToken([1]), OrdersStatusController.deleteOrdersStatus);

module.exports = router;