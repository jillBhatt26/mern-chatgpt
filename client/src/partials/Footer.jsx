const Footer = () => {
    return (
        <footer className="container footer bg-dark text-center my-5">
            <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                <span className="text-muted">
                    &copy; {new Date().getFullYear()}. Website developed by{' '}
                    <a
                        href="https://www.linkedin.com/in/jill-bhatt"
                        target="_blank"
                        className="link-success text-decoration-none"
                    >
                        Jill Bhatt
                    </a>
                    .
                </span>
                <span>
                    <a
                        href="https://github.com/jillBhatt26/mern-chatgpt"
                        target="_blank"
                        className="text-info text-decoration-none"
                    >
                        Github Repo.
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
