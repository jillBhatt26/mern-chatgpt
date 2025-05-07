const { Router } = require('express');
const authRouter = require('../modules/auth/auth.routes');

const appRouter = Router();

appRouter.use('/auth', authRouter);

module.exports = appRouter;
