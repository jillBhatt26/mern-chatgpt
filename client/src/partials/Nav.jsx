import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthServices from '../services/auth';
import useAuthStore from '../stores/auth';
import useLoadingStore from '../stores/loading';

const Nav = () => {
    // states
    const [navButtonLabel, setNavButtonLabel] = useState('Signup');
    const [disableNavButton, setDisableNavButton] = useState(false);

    // hooks
    const navigate = useNavigate();
    const location = useLocation();
    const authUser = useAuthStore(state => state.authUser);
    const unsetAuthUser = useAuthStore(state => state.unsetAuthUser);
    const isLoading = useLoadingStore(state => state.isLoading);

    // effects
    useEffect(() => {
        setDisableNavButton(isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (isLoading) return setNavButtonLabel('Login');

        switch (location.pathname) {
            default:
                setNavButtonLabel('Signup');
                break;

            case '/login':
                setNavButtonLabel('Signup');
                break;

            case '/signup':
                setNavButtonLabel('Login');
                break;

            case '/error':
                setNavButtonLabel('Home');
                break;

            case '/':
                setNavButtonLabel('Logout');
                break;
        }
    }, [location.pathname, authUser, isLoading]);

    // event handlers
    const handleNavButtonClick = async e => {
        e.preventDefault();

        if (isLoading) return;

        if (location.pathname.includes('flow')) {
            await AuthServices.logout();

            unsetAuthUser();

            return navigate('/login', { replace: true });
        }

        switch (location.pathname) {
            default:
                navigate('/');
                break;

            case '/login':
                navigate('/signup');
                break;

            case '/signup':
                navigate('/login');
                break;

            case '/about':
                if (
                    authUser &&
                    authUser.username &&
                    authUser._id &&
                    authUser.email
                )
                    navigate('/');
                else navigate('/login');
                break;

            case '/error':
                navigate('/');
                break;

            case '/':
                await AuthServices.logout();

                unsetAuthUser();

                navigate('/login', { replace: true });

                break;
        }
    };

    return (
        <nav
            className="navbar navbar-expand-lg bg-primary"
            data-bs-theme="dark"
        >
            <div className="container py-1 px-2  px-md-0">
                <Link
                    to="/"
                    className="navbar-brand fs-4 gap-3"
                    style={{ border: 'none' }}
                >
                    MyChatGPT
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor01"
                    aria-controls="navbarColor01"
                    aria-expanded="true"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="navbar-collapse collapse"
                    id="navbarColor01"
                    style={{}}
                >
                    <ul className="navbar-nav me-auto"></ul>

                    <div className="d-sm-block d-sm-my-2 d-lg-flex gap-2">
                        {location.pathname === '/' && authUser && (
                            <div className="d-grid">
                                {/* <button
                                    type="button"
                                    className="btn btn-success fw-bold mt-1 mb-3 mx-3 m-md-0"
                                    onClick={() => setShowFlowFormModal(true)}
                                >
                                    New Flow
                                </button> */}
                            </div>
                        )}

                        <div className="d-grid">
                            <button
                                type="button"
                                className="btn btn-info fw-bold mt-1 mb-3 mx-3 m-md-0"
                                onClick={handleNavButtonClick}
                                disabled={disableNavButton}
                            >
                                {navButtonLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
