const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const authRouter = require('../modules/auth/auth.routes');
const chatRouter = require('../modules/chat/chat.routes');

const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/chat', authMiddleware, chatRouter);

module.exports = appRouter;
