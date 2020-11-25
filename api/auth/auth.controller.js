const { sign } = require('jsonwebtoken');
const { compareSync } = require('bcrypt');
const { signInQuery } = require('./auth.service');
const authConfig = require('../../config/auth.config');

module.exports = {
    signIn: (req, res) => {
        const credentials = {
            username: req.body.username,
            password: req.body.password
        }

        signInQuery(credentials.username, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'server error'
                })
            }

            if(!result) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid username or password'
                });
            }

            const isPasswordCorrect = compareSync(credentials.password, result.password);

            if(!isPasswordCorrect) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid username or password'
                });
            }

            const {user_id} = result;

            const accessToken = sign({id:user_id}, authConfig.AUTH_SECRET_KEY, {
                expiresIn: '24h'
            });

            result.password = undefined;

            return res.status(200).json({
                success: true,
                user: result,
                accessToken,
            }); 
        });
    }
}