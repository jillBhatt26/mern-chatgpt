const CustomError = require('../common/CustomError');

const errorHandlerMW = async (error, _, res, next) => {
    if (error instanceof CustomError) {
        return res.status(error.code).json({
            success: false,
            error: error.message
        });
    }

    return res.status(500).json({
        success: false,
        error: 'Something went wrong! Please try again later.'
    });
};

module.exports = errorHandlerMW;
