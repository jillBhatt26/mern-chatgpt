import axiosRequest from '../config/axios';

class ChatService {
    static API_URL = '/chat';

    static createPromptChat = async text => {
        try {
            const response = await axiosRequest({
                url: `${this.API_URL}/prompt`,
                method: 'POST',
                data: {
                    text
                }
            });

            return response.data;
        } catch (error) {
            return (
                error.response.data.error ??
                error.message ??
                'Failed to create prompt chat'
            );
        }
    };

    static createResponseChat = async promptID => {
        try {
            const response = await axiosRequest({
                url: `${this.API_URL}/response/${promptID}`,
                method: 'POST'
            });

            return response.data;
        } catch (error) {
            return (
                error.response.data.error ??
                error.message ??
                'Failed to create response chat'
            );
        }
    };

    static fetchUserChats = async () => {
        try {
            const response = await axiosRequest({
                url: this.API_URL
            });

            return response.data;
        } catch (error) {
            return (
                error.response.data.error ??
                error.message ??
                'Failed to fetch user chats'
            );
        }
    };
}

export default ChatService;
