const { Op, where } = require('sequelize');
const { Orders, OrdersProducts, OrdersStatus, Users, ProductPrices, Products, Sections, Categories } = require('../models');
const productsControler = require('./ProductsController');

const OrdersController = {
    searchData: {
        attributes: ['id', 'createdAt', 'updatedAt', 'forDate', 'forTime', 'total', 'points'],
        include: [
            {
                model: OrdersStatus,
                attributes: ['id', 'name']
            }, {
                model: Users,
                attributes: ['id', 'name', 'lastName', 'email', 'address']
            },{
                model: OrdersProducts,
                attributes: ['unitPrice', 'quantity'],
                include: [
                    {
                        model: ProductPrices,
                        attributes: ['concept', 'price'],
                        include: [
                            {
                                model: Products,
                                attributes: ['name'],
                                include: [
                                    {
                                        model: Categories,
                                        attributes: ['name']
                                    }
                                ]
                            },{
                                model: Sections,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            }
        ],
        order: [
            ['forDate', 'DESC'],
            ['forTime', 'DESC'],
        ]
    },
    getAllFullOrders: async (where = {}) => {
        let searchData = { ...OrdersController.searchData };
        searchData.where = where;
        try {
            const results = await Orders.findAll(searchData);
            return (!results) ? false : results;
        } catch (error) {
            return { error: error };
        }
    },
    getFullOrderById: async (ID) => {
        const orderId = parseInt(ID);

        if (isNaN(orderId)) { return false; }

        try {
            const order = await Orders.findByPk(orderId, OrdersController.searchData);
            return (!order) ? false : order;
        } catch (error) {
            return { error: error };
        }
    },
    getOrderProductsDetail: async (products) => {
        let orderTotal = 0;
        let orderProducts = [];

        for (const pp of products) {
            const productPrice = await productsControler.getProductPriceById(pp.productPriceId);
            if (productPrice) {
                orderTotal += productPrice.price * pp.quantity;
                orderProducts.push({
                    productPricesId: productPrice.id,
                    quantity: pp.quantity,
                    unitPrice: productPrice.price
                });
            }
        }

        return { "total": orderTotal, "products": orderProducts };
    },
    createOrder: async (userId, forDate, forTime, total, points) => {
        const newOrder = await Orders.create({
            'userId': userId,
            'ordersstatusesId': 1,
            'forDate': forDate,
            'forTime': forTime,
            'total': total,
            'points': points
        });

        return newOrder.dataValues.id;
    },
    addProductsToOrder: async (orderId, products) => {
        const productsWithOrderId = products.map(product => {
            return {
                ...product,
                orderId: orderId
            };
        });
        console.log('PRODUCTS BULK WITH ORDER ID: ', productsWithOrderId);
        const addProducts = await OrdersProducts.bulkCreate(productsWithOrderId);
        return addProducts;
    },
    

    // GET
    getOrdersByType: async (req, res) => {
        const userRole = req.userRole;
        const userId = req.userId;
        const type = (req.params.type) ? req.params.type : 'all';
        
        let where = (userRole === 3) ? {userId: userId} : {};
        
        if(!userRole || !userId){
            res.status(500).send('Access denied');
        }

        switch(type){
            case 'pending':
                where.ordersstatusesId = {[Op.in]: [1, 2, 3, 4]};
                break;
            default:
                where.ordersstatusesId = {[Op.in]: [1, 2, 3, 4, 5, 6]};
                break;
        }

        try {
            const orders = await OrdersController.getAllFullOrders(where);
            res.status(200).send(orders);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    

    // POST
    newOrder: async (req, res) => {
        const userRole = req.userRole;
        const userId = req.userId;
        const { forDate, forTime, points, productPrices } = req.body;

        if (!forDate || !forTime || !productPrices) {
            res.status(500).send('Wrong body params');
            return false;
        }

        // Get order total and products with current price
        const productsDetails = await OrdersController.getOrderProductsDetail(productPrices);
        // Create the order and return its ID
        const orderId = await OrdersController.createOrder(userId, forDate, forTime, productsDetails.total, points);
        // Creates the ordersProducts records and returns boolean
        const addProducts = await OrdersController.addProductsToOrder(orderId, productsDetails.products);
        // Get full order to return
        const fullOrder = await OrdersController.getFullOrderById(orderId);

        res.status(200).send(fullOrder);
    },

    // PATCH
    updateStatus: async (req, res) => {
        try {
            const orderStatusId = parseInt(req.body.idStatus);
            
            if(!orderStatusId){res.status(404).send("Wrong body params.");}
            
            const order = await Orders.findByPk(req.params.orderId);
            if(!order){
                res.status(404).send("The requested order does not exist");
            }else{
                order.ordersstatusesId = orderStatusId;
                order.save()
                .then(async function(results){
                    if(results){
                        const fullOrderUpdated = await OrdersController.getFullOrderById(results.id)
                        res.status(200).send(fullOrderUpdated);
                    }else{
                        res.status(500).send('Error retrieving the updated order.');
                    }
                })
                .catch(function(error){
                    res.status(500).send({error:error});
                })
            }
        } catch(error){
            res.status(500).send({error: error});
        }
    }
    
};

module.exports = OrdersController;