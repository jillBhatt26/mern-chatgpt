require('dotenv/config');

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const MONGODB_URL =
    process.env.MONGODB_URL ?? 'mongodb://localhost:27017/mern-chatgpt';
const PORT = parseInt(process.env.PORT ?? 5000);
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:3000';
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'shhhhh!!!';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';

module.exports = {
    NODE_ENV,
    MONGODB_URL,
    PORT,
    CLIENT_URL,
    SESSION_SECRET,
    OPENAI_API_KEY
};
