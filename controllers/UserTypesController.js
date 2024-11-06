const { Op, where } = require('sequelize');
const { UserTypes } = require('../models');

const UserTypesController = {
    getUserTypeById: async (ID) => {
        const utId = parseInt(ID);

        if (isNaN(utId)){ return false; }

        try {
            const results = await UserTypes.findByPk(utId);
            return (!results) ? false : results;
        } catch (error) {
            return {error: error};
        }
    },

    // GET
    getAllUserTypes: (req, res) => {
        UserTypes.findAll()
        .then(function(results){
            res.status(200).send(results);
        })
        .catch(function(error){
            res.status(500).send(error);
        })
    },
    getUserType: async (req, res) => {
        const utId = parseInt(req.params.utId);
        
        if (isNaN(utId)){
            res.status(500).send({error: 'The type ID must be a number'});
            return false;
        }
        
        try {
            let ut = await UserTypesController.getUserTypeById(utId);

            if (ut) {
                res.status(200).send(ut);
            }else{
                res.status(404).send({error: 'User type not found'});
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    }
};

module.exports = UserTypesController;