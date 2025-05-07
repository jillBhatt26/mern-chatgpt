const CustomError = require('../../common/CustomError');

const destroySession = session =>
    new Promise((resolve, reject) => {
        session.destroy(error => {
            if (error)
                return reject(
                    new CustomError(
                        error.message ??
                            'Error occurred while destroying session',
                        500
                    )
                );

            return resolve(true);
        });
    });

module.exports = destroySession;
