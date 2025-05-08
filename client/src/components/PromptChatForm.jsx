const PromptChatForm = () => {
    return (
        <form className="d-flex">
            <input
                className="form-control h-0 me-sm-2"
                type="text"
                placeholder="Prompt"
            />
            <button className="btn btn-success my-2 my-sm-0" type="submit">
                Send
            </button>
        </form>
    );
};

export default PromptChatForm;
