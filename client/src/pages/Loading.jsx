import Nav from '../partials/Nav';
import Footer from '../partials/Footer';
import ContentLoader from '../partials/ContentLoader';

const LoadingPage = () => {
    return (
        <div className="overflow-hidden">
            <Nav />

            <ContentLoader />

            <Footer />
        </div>
    );
};

export default LoadingPage;
