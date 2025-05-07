const { Router } = require('express');
const authMiddleware = require('../../middleware/auth');
const AuthControllers = require('./auth.controller');

const router = Router();

const authControllers = new AuthControllers();

router.get('/', authMiddleware, authControllers.active);

router.post('/signup', authControllers.signup);

router.post('/login', authControllers.login);

router.post('/logout', authControllers.logout);

module.exports = router;
