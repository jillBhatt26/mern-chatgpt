import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const Modal = ({ open, onClose, children }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            as="div"
            className="card text-white bg-primary"
            style={{
                maxWidth: '50rem',
                minWidth: '40rem',
                position: 'fixed',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <DialogPanel>{children}</DialogPanel>
        </Dialog>
    );
};

const ModalHeader = ({ className, children, ...props }) => {
    return (
        <DialogTitle as="h5" className={`card-header ${className}`} {...props}>
            {children}
        </DialogTitle>
    );
};

const ModalBody = ({ className, children, ...props }) => {
    return (
        <div className={`card-body ${className}`} {...props}>
            {children}
        </div>
    );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;

export default Modal;
