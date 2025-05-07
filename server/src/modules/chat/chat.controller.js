const CustomError = require('../../common/CustomError');
const ChatModel = require('./chat.model');
const OpenAIService = require('./openai.service');

class ChatController {
    openAiService = new OpenAIService();

    createPromptChat = async (req, res, next) => {
        try {
            if (!req.session || !req.session.userID)
                throw new CustomError('Unauthenticated request!', 401);

            const chat = await ChatModel.create({
                text: req.body.prompt,
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

            const response = await this.openAiService.generateText(
                req.body.prompt
            );

            const chat = await ChatModel.create({
                text: response,
                type: 'RESPONSE',
                userID: req.session.userID
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

    fetchResponseFromPrompt = async (req, res, next) => {
        try {
            if (!req.session || !req.session.userID)
                throw new CustomError('Unauthenticated request!', 401);

            const response = await this.openAiService.generateText(
                req.body.prompt
            );

            const [promptChat, responseChat] = await Promise.all([
                ChatModel.create({
                    text: req.body.prompt,
                    type: 'PROMPT',
                    userID: req.session.userID
                }),
                ChatModel.create({
                    text: response,
                    type: 'RESPONSE',
                    userID: req.session.userID
                })
            ]);

            return res.status(201).json({
                success: true,
                data: {
                    promptChat,
                    responseChat
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
