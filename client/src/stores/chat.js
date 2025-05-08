import { create } from 'zustand';

const useChatStore = create(set => ({
    chats: [],
    setChats: chats => {
        set(state => ({
            ...state,
            chats
        }));
    },
    pushChat: chat => {
        set(state => ({
            ...state,
            chats: [...state.chats, chat]
        }));
    }
}));

export default useChatStore;
