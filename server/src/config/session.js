const MongoStore = require('connect-mongo');
const session = require('express-session');
const { MONGODB_URL, SESSION_SECRET, NODE_ENV } = require('./env');
const { SESSION_COOKIE_MAX_AGE_DAYS } = require('./constants');

const initAppSession = () => {
    const mongoStore = MongoStore.create({
        mongoUrl: MONGODB_URL,
        collectionName: 'sessions'
    });

    const appSession = session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: true,
        store: mongoStore,
        cookie: {
            sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
            httpOnly: NODE_ENV === 'production',
            secure: NODE_ENV === 'production',
            maxAge: SESSION_COOKIE_MAX_AGE_DAYS * 1 // 1 day
        }
    });

    return appSession;
};

module.exports = initAppSession;
