import { useNavigate } from 'react-router-dom';
import Footer from '../partials/Footer';
import Nav from '../partials/Nav';

const HomePage = () => {
    // hooks
    const navigate = useNavigate();

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
                    <h3 className="text-center">Home Page</h3>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default HomePage;
