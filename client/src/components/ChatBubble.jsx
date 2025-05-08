const ChatBubble = ({ chat }) => {
    return (
        <div
            className={`m-1 row ${
                chat.type === 'PROMPT'
                    ? 'justify-content-end'
                    : 'justify-content-start'
            } my-2`}
        >
            <div
                className={`col-12 col-md-8 col-lg-6 col-xl-5 ${
                    chat.type === 'PROMPT' ? 'bg-secondary' : 'bg-primary'
                } text-white rounded py-2 px-3`}
            >
                <p>{chat.text}</p>
                <small>{new Date(chat.createdAt).toLocaleString()}</small>
            </div>
        </div>
    );
};

export default ChatBubble;
