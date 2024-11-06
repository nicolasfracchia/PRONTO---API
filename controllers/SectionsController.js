const { Op, where } = require('sequelize');
const { Sections } = require('../models');

const SectionsController = {
    getSectionById: async (ID) => {
        const sectionId = parseInt(ID);

        if (isNaN(sectionId)){ return false; }

        try {
            const results = await Sections.findByPk(sectionId);
            return (!results) ? false : results;
        } catch (error) {
            return {error: error};
        }
    },

    // GET
    getAllSections: (req, res) => {
        Sections.findAll()
        .then(function(results){
            res.status(200).send(results);
        })
        .catch(function(error){
            res.status(500).send(error);
        })
    },
    getSection: async (req, res) => {
        const sectionId = parseInt(req.params.sectionId);
        
        if (isNaN(sectionId)){
            res.status(500).send({error: 'The section ID must be a number'});
            return false;
        }
        
        try {
            let section = await SectionsController.getSectionById(sectionId);

            if (section) {
                res.status(200).send(section);
            }else{
                res.status(404).send({error: 'Section not found'});
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    },
    
    // POST
    newSection: (req, res) => {
        const { name, web } = req.body;
        
        if(!name || !web){
            res.status(500).send('Wrong body params');
            return false;
        }

        Sections.create({'name': name, 'web': web})
        .then(function(results){
            res.status(200).send(results);
        })
        .catch(function(error){
            res.status(500).send(error);
        })
    },

    // PUT
    updateSection: async (req, res) => {
        try {
            const section = await SectionsController.getSectionById(parseInt(req.params.sectionId));
            if(!section){
                res.status(404).send("The requested section does not exist");
            }else{
                section.name = req.body.name || section.name;
                section.web = req.body.web || section.web;
                section.save()
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
    deleteSection: async (req, res) => {
        const section = await SectionsController.getSectionById(req.params.sectionId);
        
        if(!section){
            res.status(500).send("The section does not exist");
        }else{
            section.destroy()
            .then(function(results){
                res.status(200).send(results);
            })
            .catch(function(error){
                res.status(500).send({error:error});
            })
        }
    }
};

module.exports = SectionsController;