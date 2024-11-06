const jwt = require('jsonwebtoken');
const UserController = require('../controllers/UserController');

function verifyToken(requiredRoles) {
    
    if (!Array.isArray(requiredRoles)) {
        return res.status(500).send('Error fetching required permissions');
    }

    return async (req, res, next) => {
        let token = req.header('Authorization')
        
        if(token){
            token = token.replace('Bearer ', '');
        }else{
            return res.status(401).send('Access denied');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            const user = await UserController.getUserById(decoded.userId);

            if(!user || !decoded){
                return res.status(500).send('Error fetching the user');
            }else{
                if(requiredRoles.indexOf(user.UserType.id) >= 0){
                    req.userId = user.id;
                    req.userRole = user.UserType.id;
                    next();
                }else{
                    return res.status(401).send('Access denied');
                }
            }
        } catch (error) {
            res.status(401).send('Invalid token');
        }
    }
};

module.exports = verifyToken;