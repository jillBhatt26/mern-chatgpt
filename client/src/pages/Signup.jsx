import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import Footer from '../partials/Footer';
import Nav from '../partials/Nav';
import AuthServices from '../services/auth';
import useAuthStore from '../stores/auth';

// extend yup
YupPassword(yup);

const Signup = () => {
    // states
    const [inputEmail, setInputEmail] = useState('');
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState('');
    const [signupError, setSignupError] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const [loading, setLoading] = useState(false);

    // schema
    const signupInputsSchema = useMemo(
        () =>
            yup
                .object({
                    username: yup
                        .string('Username must be a string')
                        .trim()
                        .required('Username is required')
                        .min(
                            4,
                            'Username should be more than 4 characters long'
                        )
                        .max(
                            255,
                            'Username should be less than 255 characters long'
                        )
                        .matches(
                            /^[^\s<>&'"\\]+$/,
                            'Cannot contain spaces or special characters'
                        ),
                    email: yup
                        .string('Email should be a string')
                        .trim()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: yup
                        .string('Password must be a string')
                        .trim()
                        .required('Password is required')
                        .password()
                        .min(8, 'Password should be more than 8 characters')
                        .max(
                            255,
                            'Password should be less than 255 characters'
                        ),
                    confirmPassword: yup
                        .string('Confirm password must be a string')
                        .trim()
                        .required('Please retype password to confirm password')
                        .password()
                        .oneOf(
                            [yup.ref('password')],
                            'Confirm password should be same as password'
                        )
                        .min(
                            8,
                            'Confirm Password should be more than 8 characters'
                        )
                        .max(
                            255,
                            'Confirm Password should be less than 255 characters'
                        )
                })
                .required('All inputs are required'),
        []
    );

    // hooks
    const navigate = useNavigate();
    const setAuthUser = useAuthStore(state => state.setAuthUser);

    // effects
    useEffect(() => {
        setDisableButton(loading || signupError !== null);
    }, [loading, signupError]);

    // event handlers
    const handleUserSignup = async e => {
        e.preventDefault();

        if (
            !inputUsername ||
            !inputEmail ||
            !inputPassword ||
            !inputConfirmPassword
        )
            return setSignupError('All fields required!');

        try {
            const signupInputs = await signupInputsSchema.validate({
                username: inputUsername,
                email: inputEmail,
                password: inputPassword,
                confirmPassword: inputConfirmPassword
            });

            const signupResData = await AuthServices.signup(signupInputs);

            const { success, data, error } = signupResData;

            if (success && data && data.user) {
                setAuthUser(data.user);
                return navigate('/', { replace: true });
            }

            setSignupError(error);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                setSignupError(error.message);
            } else setSignupError(error.error ?? 'Failed to signup new user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />

            <div className="container mt-5 col-12 col-md-8 col-lg-4">
                <h1 className="text-center">Sign Up</h1>

                {signupError && (
                    <div className="alert alert-dismissible alert-danger mt-5">
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setSignupError(null)}
                        ></button>

                        {signupError}
                    </div>
                )}

                <form autoComplete="off" noValidate onSubmit={handleUserSignup}>
                    <div>
                        <label htmlFor="email" className="form-label mt-4">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            onChange={e => setInputEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="form-label mt-4">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            aria-describedby="usernameHelp"
                            placeholder="Enter username"
                            onChange={e => setInputUsername(e.target.value)}
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
                            value={inputPassword}
                            onChange={e => setInputPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="form-label mt-4"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            value={inputConfirmPassword}
                            onChange={e =>
                                setInputConfirmPassword(e.target.value)
                            }
                        />
                    </div>

                    <div className="d-grid gap-2 mt-5">
                        <button
                            className="btn btn-lg btn-success"
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
                                <span>Signup</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
};

export default Signup;
