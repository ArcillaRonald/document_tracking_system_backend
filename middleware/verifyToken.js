const { verify } = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const db = require('../database/connection');

module.exports = {
    verifyToken: (req, res, next) => {
        const accessToken = req.headers['x-access-token'];

        if(!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'no token provided'
            });
        }

        verify(accessToken, authConfig.AUTH_SECRET_KEY, (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    success: false,
                    message: 'unauthorized'
                });
            }
            req.user_id = decoded.id;
            next();
        });
    },
    isAdmin: (req, res, next) => {
        const user_id = req.user_id;
        const sql = 'select * from users where user_id = ?';

        db.query(sql, user_id, (err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'server error'
                });
            }

            if(!result[0].isAdmin) {
                return res.status(403).json({
                    success: false,
                    message: 'admin role is required'
                });
            }
            
            next();
        }); 
    }   
}