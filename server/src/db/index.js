const { connect, disconnect, MongooseError } = require('mongoose');
const { MONGODB_URL } = require('../config/env');

class DB {
    static connectMongoDB = () =>
        new Promise(async (resolve, reject) => {
            try {
                const conn = await connect(MONGODB_URL);

                return resolve(conn);
            } catch (error) {
                return reject(
                    error.message ??
                        'Error occurred while trying to connect with MongoDB'
                );
            }
        });

    static disconnectMongoDB = () =>
        new Promise(async (resolve, reject) => {
            try {
                await disconnect();

                return resolve(true);
            } catch (error) {
                if (error instanceof MongooseError) {
                    return reject(error.message);
                }

                return reject(
                    'Error occurred while trying to disconnect MongoDB!'
                );
            }
        });
}

module.exports = {
    DB
};
