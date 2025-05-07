class CustomError extends Error {
    code = null;

    constructor(message, code) {
        super(message);

        this.code = code;
    }

    toError = () => ({
        code: this.code,
        message: this.message
    });
}

module.exports = CustomError;
