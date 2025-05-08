const CustomError = require('../../common/CustomError');
const ChatModel = require('./chat.model');
const ChatService = require('./chat.service');
const OpenAIService = require('./openai.service');

class ChatController {
    openAiService = new OpenAIService();
    chatService = new ChatService();

    createPromptChat = async (req, res, next) => {
        try {
            if (!req.session || !req.session.userID)
                throw new CustomError('Unauthenticated request!', 401);

            const chat = await this.chatService.create({
                text: req.body.text,
                type: 'PROMPT',
                userID: req.session.userID
            });

            return res.status(201).json({
                success: true,
                data: { chat }
            });
        } catch (error) {
            if (error instanceof CustomError) return next(error);

            return next(
                new CustomError(
                    error.message ?? 'Failed to create prompt chat',
                    500
                )
            );
        }
    };

    createResponseChat = async (req, res, next) => {
        try {
            if (!req.session || !req.session.userID)
                throw new CustomError('Unauthenticated request!', 401);

            const prompt = await this.chatService.fetchChatById(
                req.params.promptID
            );

            if (!prompt)
                throw new CustomError('Prompt message not found!', 404);

            const response = await this.openAiService.generateText(prompt.text);

            const chat = await this.chatService.create({
                text: response,
                type: 'RESPONSE',
                userID: req.session.userID,
                promptID: req.params.promptID
            });

            await this.chatService.update(req.params.promptID, {
                responseID: chat._id
            });

            return res.status(201).json({
                success: true,
                data: {
                    chat
                }
            });
        } catch (error) {
            if (error instanceof CustomError) return next(error);

            return next(
                new CustomError(
                    error.message ?? 'Failed to fetch response',
                    500
                )
            );
        }
    };

    fetchUserChats = async (req, res, next) => {
        try {
            if (!req.session || !req.session.userID)
                throw new CustomError('Unauthenticated request!', 401);

            const chats = await ChatModel.find({ userID: req.session.userID });

            return res.status(200).json({ success: true, data: { chats } });
        } catch (error) {
            if (error instanceof CustomError) return next(error);

            return next(
                new CustomError(
                    error.message ?? 'Failed to fetch user chats',
                    500
                )
            );
        }
    };
}

module.exports = ChatController;
