const { Op, where } = require('sequelize');
const { Users, UserTypes } = require('../models');
const UserTypesController = require('./UserTypesController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {
    // FUNCTIONS
    searchData: {
        attributes: ['id','name','lastName','address','email'],
        include: [{
            model: UserTypes,
            attributes: ['id','type']
        }]
    },
    getUserById: async (ID) => {
        const userId = parseInt(ID);

        if (isNaN(userId)){ return false; }

        try {
            const results = await Users.findByPk(userId, UserController.searchData);
            return (!results) ? false : results;
        } catch (error) {
            return {error: error};
        }
    },
    searchByFilters: async (filters) => {
        let where = {}
        
        if(filters.type){ where.usertypesId = parseInt(filters.type)}
        if(filters.name){ where.name = filters.name; }
        if(filters.lastName){ where.lastName = filters.lastName; }
        if(filters.email){ where.email = filters.email; }
        if(filters.address){ where.address = filters.address; }

        let searchData = {...UserController.searchData};
        searchData.where = where;

        try {
            const results = await Users.findAll(searchData);
            return (!results) ? false : results;
        } catch (error) {
            return {error: error};
        }
    },
    hashPassword: async (password) => {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    },

    // GET
    getAllUsers: async (req, res) => {

        let filters = {}
        
        if(req.query.type){ filters.usertypesId = parseInt(req.query.type)}
        if(req.query.name){ filters.name = { [Op.like]: `%${req.query.name}%` }}
        if(req.query.lastName){ filters.lastName = { [Op.like]: `%${req.query.lastName}%` }}
        if(req.query.email){ filters.email = { [Op.like]: `%${req.query.email}%` }}
        if(req.query.address){ filters.address = { [Op.like]: `%${req.query.address}%` }}

        try {
            let users = await UserController.searchByFilters(filters);

            if (users) {
                res.status(200).send(users);
            }else{
                res.status(404).send({error: 'User not found'});
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getUser: async (req, res) => {
        const userId = parseInt(req.params.userId);
        
        if (isNaN(userId)){
            res.status(500).send({error: 'The user ID must be a number'});
            return false;
        }
        
        try {
            let user = await UserController.getUserById(userId);

            if (user) {
                res.status(200).send(user);
            }else{
                res.status(404).send({error: 'User not found'});
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    },
    
    // POST
    newUser: async (req, res) => {
        const { password, type, name, lastName, email, address } = req.body;
        
        if(!password || !type || !name || !lastName || !email || !address){
            res.status(500).send('Wrong body params');
            return false;
        }

        try{
            const userExists = await UserController.searchByFilters({email: email});
            const userTypeExists = await UserTypesController.getUserTypeById(parseInt(type));
            const hashedPassword = await UserController.hashPassword(password);

            if(!userTypeExists){
                res.status(500).send({error: "The defined user type does not exist."});
                return false;
            }

            if(userExists && userExists.length > 0){
                res.status(500).send({error: "An user with that email already exists."})
            }else{
                Users.create({'password':hashedPassword, 'usertypesId': type, 'name': name, 'lastName': lastName, 'email': email, 'address': address})
                .then(function(results){
                    res.status(200).send(results);
                })
                .catch(function(error){
                    res.status(500).send(error);
                })
            }

        } catch (error){
            res.status(500).send({error:error})
        }
    },
    newCustomer: async (req, res) => {

        const { password, name, lastName, email, address } = req.body;

        if(!password || !name || !lastName || !email || !address){
            res.status(500).send('Wrong body params');
            return false;
        }

        try{
            const userExists = await UserController.searchByFilters({email: email});
            const hashedPassword = await UserController.hashPassword(password);

            if(userExists && userExists.length > 0){
                res.status(500).send("An user with that email already exists.")
            }else{
                Users.create({'password':hashedPassword, 'usertypesId': 3, 'name': name, 'lastName': lastName, 'email': email, 'address': address})
                .then(function(customer){
                    const token = jwt.sign({ userId: customer.id }, process.env.JWT_PRIVATE_KEY, {expiresIn: '1h'});
                    const userData = {
                        name: customer.name,
                        lastName: customer.lastName,
                        address: customer.address,
                        email: customer.email,
                        role: customer.usertypesId,
                        token: token
                    }

                    res.status(200).send(userData);

                })
                .catch(function(error){
                    res.status(500).send(error);
                })
            }

        } catch (error){
            res.status(500).send(error)
        }
    },
    login: async (req, res) => {
        const {email, password} = req.body;

        Users.findOne({where: {email}}).then((user) => {
            if(!user){
                res.status(404).send('The email is not registered.');
                return;
            }

            bcrypt.compare(password, user.password, (err, match) => {
                if (!match) {
                    return res.status(401).send('Wrong password');
                }

                const token = jwt.sign({ userId: user.id }, process.env.JWT_PRIVATE_KEY, {expiresIn: '1h'});
                const userData = {
                    name: user.name,
                    lastName: user.lastName,
                    address: user.address,
                    email: user.email,
                    role: user.usertypesId,
                    token: token
                }

                res.status(200).send(userData);
            });        
        });
    },

    // PUT
    updateUser: async (req, res) => {
        try {
            const user = await UserController.getUserById(parseInt(req.params.userId));
            if(!user){
                res.status(404).send("The requested user does not exist");
            }else{
                user.name = req.body.name || user.name;
                user.lastName = req.body.lastName || user.lastName;
                user.address = req.body.address || user.address;
                if(req.body.type){
                    const type = parseInt(req.body.type);
                    const userTypeExists = await UserTypesController.getUserTypeById(type);

                    if(userTypeExists){
                        user.usertypesId = type || user.usertypesId;
                    }
                }
                if(req.body.email){
                    try { 
                        const userExists = await UserController.searchByFilters({email: req.body.email});
                        if(!userExists || userExists.length === 0){
                            user.email = req.body.email;
                        }
                    }catch(error){
                        res.status(500).send({error:error});
                    }
                } 
                
                user.save()
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

    // PATCH
    updateUserProfile: async (req, res) => {
        try {
            const user = await UserController.getUserById(parseInt(req.userId));
            if(!user){
                res.status(404).send("The requested user does not exist");
            }else{
                if(req.body.name){user.name = req.body.name;}
                if(req.body.lastName){user.lastName = req.body.lastName;}
                if(req.body.address){user.address = req.body.address;}
                if(req.body.email){
                    try { 
                        const userExists = await UserController.searchByFilters({email: req.body.email});
                        if(!userExists || userExists.length === 0){
                            user.email = req.body.email;
                        }
                    }catch(error){
                        res.status(500).send({error:error});
                    }
                }                
                user.save()
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
    deleteUser: async (req, res) => {
        const user = await UserController.getUserById(req.params.userId);
        
        if(!user){
            res.status(500).send("The user does not exist");
        }else{
            user.destroy()
            .then(function(results){
                res.status(200).send(results);
            })
            .catch(function(error){
                res.status(500).send({error:error});
            })
        }
    }

};

module.exports = UserController;