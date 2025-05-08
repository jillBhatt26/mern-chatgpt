import Footer from '../partials/Footer';
import Nav from '../partials/Nav';
import Conversation from '../components/Conversation';
import PromptChatForm from '../components/PromptChatForm';

const HomePage = () => {
    return (
        <>
            <Nav />

            <div className="container">
                <Conversation />
                <PromptChatForm />
            </div>

            <Footer />
        </>
    );
};

export default HomePage;
