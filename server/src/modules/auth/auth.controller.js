const { ValidationError } = require('yup');
const CustomError = require('../../common/CustomError');
const destroySession = require('./session.utils');
const AuthModel = require('./auth.model');
const PasswordUtils = require('./password.utils');
const {
    loginRequestBodySchema,
    signupRequestBodySchema
} = require('./auth.validations');

class AuthControllers {
    active = async (req, res, next) => {
        try {
            if (!req.session.userID || !req.user)
                throw new CustomError('Unauthorized request!', 401);

            return res.status(200).json({
                success: true,
                data: {
                    user: req.user
                }
            });
        } catch (error) {
            if (error instanceof CustomError) return next(error);

            return next(
                new CustomError(
                    'Error occurred while fetching active user.',
                    500
                )
            );
        }
    };

    signup = async (req, res, next) => {
        try {
            if (req.session.userID)
                throw new CustomError("You're already authenticated", 400);

            const signupRequestBody = await signupRequestBodySchema.validate(
                req.body
            );

            const checkUserExists = await AuthModel.findOne({
                $or: [
                    { username: signupRequestBody.username },
                    { email: signupRequestBody.email }
                ]
            });

            if (checkUserExists !== null)
                throw new CustomError('Username or email already in use', 400);

            const hashedPassword = await PasswordUtils.hash(
                signupRequestBody.password
            );

            const newUser = await AuthModel.create({
                username: signupRequestBody.username,
                email: signupRequestBody.email,
                password: hashedPassword
            });

            req.session.userID = newUser.id;

            return res.status(201).json({
                success: true,
                data: {
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                        username: newUser.username
                    }
                }
            });
        } catch (error) {
            if (error instanceof CustomError) return next(error);

            if (error instanceof ValidationError)
                return next(new CustomError(error.message, 400));

            return next(
                new CustomError(
                    'Error occurred while signing up new user.',
                    500
                )
            );
        }
    };

    login = async (req, res, next) => {
        try {
            if (req.session.userID)
                throw new CustomError("You're already authenticated", 400);

            const loginRequestBody = await loginRequestBodySchema.validate(
                req.body
            );

            const userToLogin = await AuthModel.findOne({
                $or: [
                    { username: loginRequestBody.usernameOrEmail },
                    { email: loginRequestBody.usernameOrEmail }
                ]
            });

            if (!userToLogin)
                throw new CustomError('User not found! Sign up required!', 404);

            const doPasswordsMatch = await PasswordUtils.verify(
                userToLogin.password,
                loginRequestBody.password
            );

            if (!doPasswordsMatch)
                throw new CustomError('Incorrect password', 400);

            req.session.userID = userToLogin.id;

            return res.status(200).json({
                success: true,
                data: {
                    user: {
                        id: userToLogin.id,
                        username: userToLogin.username,
                        email: userToLogin.email
                    }
                }
            });
        } catch (error) {
            if (error instanceof ValidationError)
                return next(new CustomError(error.message, 400));

            if (error instanceof CustomError) return next(error);

            return next(
                new CustomError('Error occurred while logging in a user.', 500)
            );
        }
    };

    logout = async (req, res, next) => {
        try {
            if (!req.session || !req.session.userID)
                throw new CustomError('Unauthorized request!', 401);

            const isSessionDestroyed = await destroySession(req.session);

            res.clearCookie('connect.sid');

            return res.status(200).json({
                success: isSessionDestroyed
            });
        } catch (error) {
            if (error instanceof CustomError) return next(error);

            return next(
                new CustomError('Error occurred while logging out a user.', 500)
            );
        }
    };
}

module.exports = AuthControllers;
