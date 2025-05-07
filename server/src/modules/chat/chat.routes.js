const { Router } = require('express');
const ChatController = require('./chat.controller');

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.get('/', chatController.fetchUserChats);
chatRouter.post('/prompt', chatController.createPromptChat);
chatRouter.post('/response', chatController.createResponseChat);

module.exports = chatRouter;
