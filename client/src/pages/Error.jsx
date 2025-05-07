import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../partials/Nav';
import Footer from '../partials/Footer';

const ErrorPage = ({ message = undefined }) => {
    // hooks
    const navigate = useNavigate();
    const location = useLocation();

    // states
    const [errorMessage, setErrorMessage] = useState(message);

    // effects
    useEffect(() => {
        if (location && location.state && location.state.message)
            setErrorMessage(location.state.message);
    }, [location]);

    return (
        <>
            <Nav />

            <div className="container">
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh'
                    }}
                >
                    <h4 className="text-center">
                        {errorMessage
                            ? errorMessage
                            : 'Requested page not found!'}
                    </h4>

                    <div className="d-grid gap-2 mt-3">
                        <button
                            className="btn btn-lg btn-info"
                            type="button"
                            onClick={() => navigate('/')}
                        >
                            Home
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ErrorPage;
