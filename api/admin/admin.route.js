const express = require('express');
const {
    createAdmin,
    createUser,
    getUsers
} = require('./admin.controller');
const { checkIfAdminExist } = require('../../middleware/verifyCreateAdmin');
const {
    isFieldEmpty,
    isEmailTaken,
    isEmailValid,
    isDepartmentTaken,
    isUsernameTaken,
} = require('../../middleware/verifyCreateUser');
const { verifyToken, isAdmin } = require('../../middleware/verifyToken');

const router = express.Router();

// parent route api/admin
// use isEmailValid middleware for production only

router.get('/', checkIfAdminExist, createAdmin);
router.post(
    '/createuser', 
    [
        verifyToken,
        isAdmin,
        isFieldEmpty,
        isEmailTaken,
        //isEmailValid,
        isDepartmentTaken,
        isUsernameTaken
    ],
    createUser
);
router.get('/users', [verifyToken, isAdmin], getUsers);

module.exports = router;
