import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { Box, Button, Flex, Text } from 'theme-ui';

const AlertModal = ({ message, isOpen, closeModal, Title, onCancle, onOk, noCancle, noOK }) => {

    return (
        <Modal showCloseIcon={false} closeOnEsc={false} closeOnOverlayClick={false} open={isOpen} onClose={closeModal} center>
            <h5 className="modal-heading fw-bold">{Title}</h5>
            <div className="mt-3 mb-3 " >

                {message}

            </div>
            <Flex>
                {noCancle ? <div style={{ width: '47%', }} /> :
                    <Button onClick={onCancle} mr={4} sx={{ width: 108 }} backgroundColor="tealGreen" color="white"  className="p-2"
                    >{"Cancel"}</Button>}
                {noOK ? <div style={{ width: '47%', }} /> :
                    <Button onClick={onOk} mr={4} sx={{   width: 95  }} variant="white" className="p-2"
                    >{"Ok"}</Button>}

            </Flex>
        </Modal>
    )
}

export default AlertModal;