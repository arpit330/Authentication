const express = require('express');
// const { sign } = require('jsonwebtoken');
// app.use(express.json());

const router = express.Router();

const { signup, signin } = require('../controllers/auth');

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;






