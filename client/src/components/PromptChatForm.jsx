import { useMemo, useState } from 'react';
import * as yup from 'yup';
import ChatService from '../services/chat';
import useChatStore from '../stores/chat';

const PromptChatForm = () => {
    // states
    const [inputPrompt, setInputPrompt] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // hook store
    const pushChat = useChatStore(store => store.pushChat);

    // memo
    const promptValidationSchema = useMemo(
        () =>
            yup.object({
                text: yup.string().trim().required('Prompt text is required')
            }),
        []
    );

    // event handlers
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setLoading(true);

            const { text } = await promptValidationSchema.validate({
                text: inputPrompt
            });

            const createPromptData = await ChatService.createPromptChat(text);

            if (!createPromptData.success && createPromptData.error)
                return setError(createPromptData.error);

            if (createPromptData.success && createPromptData.data.chat) {
                pushChat(createPromptData.data.chat);

                const createResponseData = await ChatService.createResponseChat(
                    createPromptData.data.chat._id
                );

                if (!createResponseData.success && createResponseData.error)
                    return setError(createResponseData.error);

                if (
                    createResponseData.success &&
                    createResponseData.data &&
                    createResponseData.data.chat
                )
                    pushChat(createResponseData.data.chat);
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) setError(error.message);

            setError(error);
        } finally {
            setLoading(false);
            setInputPrompt('');
        }
    };

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input
                className="form-control me-sm-2"
                type="text"
                placeholder={`${loading ? 'Loading...' : 'Prompt'}`}
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
            />
            <button
                className="btn btn-success my-2 my-sm-0"
                type="submit"
                disabled={loading || error}
            >
                Send
            </button>
        </form>
    );
};

export default PromptChatForm;
