const CustomError = require('../common/CustomError');
const AuthModel = require('../modules/auth/auth.model');

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.session || !req.session.userID)
            throw new CustomError('Unauthorized Request!', 401);

        const authUser = await AuthModel.findById(req.session.userID, {
            password: 0
        });

        if (!authUser)
            throw new CustomError('User not found! Signup required.', 404);

        // append user details to request object
        req.user = {
            userID: authUser.id,
            username: authUser.username,
            email: authUser.email
        };

        return next();
    } catch (error) {
        if (error instanceof CustomError) {
            return next(error);
        }

        return next(
            new CustomError('Error occurred while authenticating user', 500)
        );
    }
};

module.exports = authMiddleware;
