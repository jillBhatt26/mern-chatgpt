import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import Nav from '../partials/Nav';
import Footer from '../partials/Footer';
import AuthServices from '../services/auth';
import useAuthStore from '../stores/auth';

YupPassword(yup);

const LoginPage = () => {
    // states
    const [inputUsernameOrEmail, setInputUsernameOrEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const loginInputsSchema = useMemo(
        () =>
            yup.object({
                usernameOrEmail: yup
                    .string('Username or email should be string')
                    .trim()
                    .required('Either username or email is required')
                    .min(
                        4,
                        'Username or email should be at least 4 characters long'
                    )
                    .max(
                        255,
                        'Username or email should not be more than 255 characters long'
                    ),
                password: yup
                    .string('Password should be string')
                    .trim()
                    .required('Password is required')
                    .password()
            }),
        []
    );

    // hooks
    const setAuthUser = useAuthStore(state => state.setAuthUser);

    const navigate = useNavigate();

    // effects
    useEffect(() => {
        setDisableButton(loading || loginError !== null);
    }, [loading, loginError]);

    // event handlers
    const handleLogin = async e => {
        e.preventDefault();

        try {
            setLoading(true);

            const loginInputs = await loginInputsSchema.validate({
                usernameOrEmail: inputUsernameOrEmail,
                password: inputPassword
            });

            const loginResData = await AuthServices.login(loginInputs);

            const { success, data, error } = loginResData;

            if (success && data && data.user) {
                setAuthUser(data.user);
                return navigate('/', { replace: true });
            }

            setLoginError(error);
        } catch (error) {
            if (error instanceof yup.ValidationError)
                setLoginError(error.message);
            else setLoginError(error.error ?? 'Failed to login the user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />

            <div className="container mt-5 col-12 col-md-8 col-lg-4">
                <h1 className="text-center">Log In</h1>

                {loginError && (
                    <div className="alert alert-dismissible alert-danger mt-5">
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setLoginError(null)}
                        ></button>

                        {loginError}
                    </div>
                )}

                <form autoComplete="off" noValidate onSubmit={handleLogin}>
                    <div>
                        <label
                            htmlFor="usernameOrEmail"
                            className="form-label mt-4"
                        >
                            Username or Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="usernameOrEmail"
                            placeholder="Username or email"
                            onChange={e =>
                                setInputUsernameOrEmail(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="form-label mt-4">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            autoComplete="off"
                            onChange={e => setInputPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid gap-2 mt-5">
                        <button
                            className={`btn btn-lg btn-success ${
                                disableButton ?? 'disabled'
                            }`}
                            type="submit"
                            disabled={disableButton}
                        >
                            {loading ? (
                                <div className="progress">
                                    <div
                                        className="progress-bar progress-bar-striped bg-success"
                                        role="progressbar"
                                        style={{ width: '100%' }}
                                        aria-valuenow={100}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                            ) : (
                                <span>Login</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
};

export default LoginPage;
