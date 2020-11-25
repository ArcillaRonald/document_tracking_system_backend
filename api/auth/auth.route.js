const express = require('express');
const router = express.Router();
const { signIn } = require('./auth.controller');

// parent route api/auth

router.post('/signin', signIn);

module.exports = router;