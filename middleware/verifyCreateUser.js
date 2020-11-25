const db = require('../database/connection');
const kickboxConfig = require('../config/kickbox.config');
const kickbox = require('kickbox').client(kickboxConfig.KICKBOX_API_KEY).kickbox();

module.exports = {
    isFieldEmpty: (req, res, next ) => {
        const body = req.body;

        if(
            (!body.name || !body.email || !body.department_id || !body.username || !body.password)
            ||
            (body.name == ' ' || body.email == ' ' || body.department_id == ' ' || body.username == ' ' || body.password == ' ')
        ) {
            return res.status(400).json({
                success: false,
                message: 'all fields are required'
            })
        } 
        
        next();
    },
    isEmailTaken: (req, res, next) => {
        const email = req.body.email;
        const sql = 'select * from users where email = ?';

        db.query(sql, email, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'server error'
                });
            }

            if(result[0]) {
                return res.status(409).json({
                    success: false,
                    message: 'an account with this email already exist'
                });
            }
            next();
        });
    },
    isEmailValid: (req, res, next) => {
        const email = req.body.email;
        kickbox.verify(email, (err, response) => {
            if(response.body.result === 'undeliverable') {
                return res.status(400).json({
                    success:false,
                    message: 'Provide a valid and existing email'
                });
            }
            next();
        });
    },
    isDepartmentTaken: (req, res, next) => {
        const department_id = req.body.department_id;
        const sql = 'select * from users where department_id = ?';

        db.query(sql, department_id, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'server error'
                });
            }

            if(result[0]) {
                return res.status(409).json({
                    success: false,
                    message: 'an account for this department already exist'
                });
            }
            next();
        });
    },
    isUsernameTaken: (req, res, next) => {
        const username = req.body.username;
        const sql = 'select * from users where username = ?';

        db.query(sql, username, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'server error'
                });
            }

            if(result[0]) {
                return res.status(409).json({
                    success: false, 
                    message: 'an account with this username already exist'
                });
            }
            next();
        });
    }
}