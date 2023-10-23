import React from 'react';
import { Modal } from 'react-responsive-modal';

const CustomModal = ({ children, isOpen, closeModal, Title, onCancle, onOk, noCancle, noOK, styles }) => {

    return (
        <Modal closeOnEsc={false} closeOnOverlayClick={false} open={isOpen} onClose={closeModal} center styles={styles}>
            <div className="mt-3 mb-3 " >

                {children}

            </div>
        </Modal>
    )
}

export default CustomModal;