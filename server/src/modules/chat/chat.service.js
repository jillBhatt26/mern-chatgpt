const CustomError = require('../../common/CustomError');
const ChatModel = require('./chat.model');

class ChatService {
    create = chatInput =>
        new Promise(async (resolve, reject) => {
            try {
                const chat = await ChatModel.create(chatInput);

                return resolve(chat);
            } catch (error) {
                if (error instanceof CustomError) return reject(error);

                return reject(
                    new CustomError(
                        error.message ?? 'Failed to create chat!',
                        error.code ?? error.status ?? 500
                    )
                );
            }
        });

    fetchChatById = chatID =>
        new Promise(async (resolve, reject) => {
            try {
                const chat = await ChatModel.findById(chatID);

                resolve(chat);
            } catch (error) {
                if (error instanceof CustomError) return reject(error);

                return reject(
                    new CustomError(
                        error.message ?? 'Failed to fetch chat!',
                        error.code ?? error.status ?? 500
                    )
                );
            }
        });

    fetchChatsByUserID = userID =>
        new Promise(async (resolve, reject) => {
            try {
                const chats = await ChatModel.find({ userID });

                return resolve(chats);
            } catch (error) {
                if (error instanceof CustomError) return reject(error);

                return reject(
                    new CustomError(
                        error.message ?? 'Failed to fetch user chats!',
                        error.code ?? error.status ?? 500
                    )
                );
            }
        });

    update = (chatID, updateChatInput) =>
        new Promise(async (resolve, reject) => {
            try {
                const toUpdateChat = await this.fetchChatById(chatID);

                if (!toUpdateChat)
                    throw new CustomError('Chat to update not found!', 404);

                const updatedChat = await ChatModel.findByIdAndUpdate(
                    chatID,
                    updateChatInput,
                    { new: true }
                );

                return resolve(updatedChat);
            } catch (error) {
                if (error instanceof CustomError) return reject(error);

                return reject(
                    new CustomError(
                        error.message ?? 'Failed to update chat!',
                        error.code ?? error.status ?? 500
                    )
                );
            }
        });
}

module.exports = ChatService;
