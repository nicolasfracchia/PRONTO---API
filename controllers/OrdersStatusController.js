const { Op, where } = require('sequelize');
const { OrdersStatus } = require('../models');

const OrdersStatusController = {
    getOrdersStatusById: async (ID) => {
        const osId = parseInt(ID);

        if (isNaN(osId)){ return false; }

        try {
            const results = await OrdersStatus.findByPk(osId);
            return (!results) ? false : results;
        } catch (error) {
            return {error: error};
        }
    },

    // GET
    getAllOrdersStatus: (req, res) => {
        OrdersStatus.findAll()
        .then(function(results){
            res.status(200).send(results);
        })
        .catch(function(error){
            res.status(500).send(error);
        })
    },
    getOrdersStatus: async (req, res) => {
        const osId = parseInt(req.params.osId);
        
        if (isNaN(osId)){
            res.status(500).send({error: 'The status ID must be a number'});
            return false;
        }
        
        try {
            let os = await OrdersStatusController.getOrdersStatusById(osId);

            if (os) {
                res.status(200).send(os);
            }else{
                res.status(404).send({error: 'Order status not found'});
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    },
    
    // POST
    newOrdersStatus: (req, res) => {
        const { name } = req.body;
        
        if(!name){
            res.status(500).send('Wrong body params');
            return false;
        }

        OrdersStatus.create({'name': name})
        .then(function(results){
            res.status(200).send(results);
        })
        .catch(function(error){
            res.status(500).send(error);
        })
    },

    // PUT
    updateOrdersStatus: async (req, res) => {
        try {
            const os = await OrdersStatusController.getOrdersStatusById(parseInt(req.params.osId));
            if(!os){
                res.status(404).send("The requested status does not exist");
            }else{
                os.name = req.body.name || os.name;
                os.save()
                .then(function(results){
                    res.status(200).send(results);
                })
                .catch(function(error){
                    res.status(500).send({error:error});
                })
            }
        } catch(error){
            res.status(500).send({error: error});
        }
    },

    // DELETE
    deleteOrdersStatus: async (req, res) => {
        const os = await OrdersStatusController.getOrdersStatusById(req.params.osId);
        
        if(!os){
            res.status(500).send("The status does not exist");
        }else{
            os.destroy()
            .then(function(results){
                res.status(200).send(results);
            })
            .catch(function(error){
                res.status(500).send({error:error});
            })
        }
    }
};

module.exports = OrdersStatusController;