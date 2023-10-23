import React from 'react';
import { Modal } from 'react-responsive-modal';
import { useSelector } from 'react-redux';
import { Flex } from 'theme-ui';

const CertificateModal = ({ closeModal, title, isModalVisible, header, subHeader, }) => {
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    return (
        <Modal showCloseIcon={true} closeOnEsc={false} closeOnOverlayClick={false}
            onClose={closeModal}
            open={isModalVisible} center>
            <Flex sx={{ padding: '25px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <h5 className="fw-bold maintenance-heading" >
                    {header}
                </h5>
                <img className="mb-4" src={"/Ribben.png"} height={300} width={300} />
                <h5 className="fw-bold maintenance-message mt-2" > {subHeader}</h5>
                <h5 className="fw-bold maintenance-message mt-2" > {title}</h5>
            </Flex>
        </Modal>
    );
};

export default CertificateModal;

