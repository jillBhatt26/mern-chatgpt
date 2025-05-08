import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatService from '../services/chat';
import useChatStore from '../stores/chat';
import ContentLoader from '../partials/ContentLoader';
import ChatBubble from './ChatBubble';

const Conversation = () => {
    // states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // store hook
    const chats = useChatStore(store => store.chats);
    const setChats = useChatStore(store => store.setChats);

    // nav hook
    const navigate = useNavigate();

    // effects
    const fetchUserChatsCB = useCallback(async () => {
        try {
            const chatData = await ChatService.fetchUserChats();

            const { success, data, error } = chatData;

            if (!success || error)
                return setError(error ?? 'Failed to fetch user chats');

            if (success && data && data.chats) return setChats(data.chats);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

        // eslint-disable-next-line
    }, []);

    // effects
    useEffect(() => {
        fetchUserChatsCB();
    }, [fetchUserChatsCB]);

    useEffect(() => {
        if (error) return navigate('/error', { state: { error } });

        // eslint-disable-next-line
    }, [error]);

    return (
        <div className="py-2 vh-75 overflow-x-hidden overflow-y-auto">
            {loading ? (
                <ContentLoader />
            ) : (
                <>
                    {chats.length > 0 ? (
                        chats.map((chat, index) => (
                            <ChatBubble chat={chat} key={index} />
                        ))
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '60vh'
                            }}
                        >
                            <h5 className="text-center">
                                Ask a question to start conversation
                            </h5>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Conversation;
