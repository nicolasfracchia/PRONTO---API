const { Op, where } = require('sequelize');
const { Categories } = require('../models');

const CategoryController = {
    getCategoryById: async (ID) => {
        const categoryId = parseInt(ID);

        if (isNaN(categoryId)){ return false; }

        try {
            const results = await Categories.findByPk(categoryId);
            return (!results) ? false : results;
        } catch (error) {
            return {error: error};
        }
    },

    // GET
    getAllCategories: (req, res) => {
        Categories.findAll()
        .then(function(results){
            res.status(200).send(results);
        })
        .catch(function(error){
            res.status(500).send(error);
        })
    },
    getCategory: async (req, res) => {
        const categoryId = parseInt(req.params.categoryId);
        
        if (isNaN(categoryId)){
            res.status(500).send({error: 'The category ID must be a number'});
            return false;
        }
        
        try {
            let category = await CategoryController.getCategoryById(categoryId);

            if (category) {
                res.status(200).send(category);
            }else{
                res.status(404).send({error: 'Category not found'});
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    },
    
    // POST
    newCategory: (req, res) => {
        const { name } = req.body;
        
        if(!name){
            res.status(500).send('Wrong body params');
            return false;
        }

        Categories.create({'name': name})
        .then(function(results){
            res.status(200).send(results);
        })
        .catch(function(error){
            res.status(500).send(error);
        })
    },

    // PUT
    updateCategory: async (req, res) => {
        try {
            const category = await CategoryController.getCategoryById(parseInt(req.params.categoryId));
            if(!category){
                res.status(404).send("The requested category does not exist");
            }else{
                category.name = req.body.name || category.name;                
                category.save()
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
    deleteCategory: async (req, res) => {
        const category = await CategoryController.getCategoryById(req.params.categoryId);
        
        if(!category){
            res.status(500).send("The category does not exist");
        }else{
            category.destroy()
            .then(function(results){
                res.status(200).send(results);
            })
            .catch(function(error){
                res.status(500).send({error:error});
            })
        }
    }
};

module.exports = CategoryController;