require('dotenv/config');

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const MONGODB_URL =
    process.env.MONGODB_URL ?? 'mongodb://localhost:27017/mern-chatgpt';
const PORT = parseInt(process.env.PORT ?? 5000);
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:3000';
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'shhhhh!!!';

const EMAIL_HOST = process.env.EMAIL_HOST || null;
const EMAIL_PORT = process.env.EMAIL_PORT || null;

const EMAIL_USERNAME = process.env.EMAIL_USERNAME || null;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || null;

module.exports = {
    NODE_ENV,
    MONGODB_URL,
    PORT,
    CLIENT_URL,
    SESSION_SECRET,
    EMAIL_HOST,
    EMAIL_PASSWORD,
    EMAIL_PORT,
    EMAIL_USERNAME
};
