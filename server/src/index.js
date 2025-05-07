const express = require('express');
const cors = require('cors');
const { PORT, CLIENT_URL, NODE_ENV } = require('./config/env');
const initAppSession = require('./config/session');
const { DB } = require('./db');
const errorHandlerMW = require('./middleware/error');
const appRouter = require('./routes');

DB.connectMongoDB()
    .then(conn => {
        const app = express();

        // trust proxy
        if (NODE_ENV === 'production') app.set('trust proxy', 1);

        // json and body-parser middleware
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // cors
        app.use(
            cors({
                origin: CLIENT_URL,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type'],
                credentials: true
            })
        );

        // session
        app.use(initAppSession());

        // app routes
        app.use('/api', appRouter);
        app.use((_, res, next) =>
            res.status(404).json({ success: false, error: 'Invalid request!' })
        );

        // error handler middleware
        app.use(errorHandlerMW);

        app.listen(PORT, () => {
            console.log(
                `✅✅✅...Connected to MongoDB on: ${conn.connection.host}...✅✅✅`
            );
            console.log(`🚀🚀🚀...Server exposed on port: ${PORT}...🚀🚀🚀`);
        });
    })
    .catch(error => {
        console.error(
            `❌❌❌...Server startup error: ${error.message}...❌❌❌`
        );

        return process.exit(1);
    });
