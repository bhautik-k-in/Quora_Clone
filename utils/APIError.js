class APIError extends Error {
    constructor({ message, errors, status = 500, stack, data }) {
        super(message);
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.stack = stack;
        this.data = data;
    }
}

module.exports = APIError;