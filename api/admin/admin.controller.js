const { hashSync, genSaltSync } = require('bcrypt')
const {
    createAdminQuery,
    createUserQuery,
    getUsersQuery,
} = require('./admin.service');

module.exports = {
    createAdmin: (req, res) => {
        const admin = {
            name: 'admin',
            email: 'joshuarellosa0@gmail.com',
            username: 'admin',
            password: 'admin',
            isAdmin: true,
        }

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(admin.password, salt);

        admin.password = hashedPassword;

        createAdminQuery(admin, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 'false',
                    message: 'server error'
                });
            }

            return res.status(200).json({
                success: true,
                result
            });
        })
    },
    createUser: (req, res) => {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            department_id: req.body.department_id,
            username: req.body.username,
            password: req.body.password,
        }

        const {username, password} = newUser;

        if(username.length < 6 || password.length < 6)  {
            return res.status(400).json({
                success: false,
                message: 'username and password must be 6 characters or greater'
            });
        }

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        newUser.password = hashedPassword;

        createUserQuery(newUser, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'server error'
                });
            }

            return res.status(200).json({
                success: true,
                result
            });
        });
    },
    getUsers: (req, res) => {
        getUsersQuery((err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'server error'
                });
            }

            return res.status(200).json({
                success: true,
                result
            });
        });
    }
}   