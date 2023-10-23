import React from 'react';
import { Modal } from 'react-responsive-modal';

const CMSModal = (props) => {
  console.log("CMSModal props => ", props);
  return (
    <div>
      <Modal open={props.isModalVisible} onClose={props.closeModal} center styles={{ modal: { borderRadius: 16} }}>
        <h5 className="modal-heading fw-bold">{props.CMSModalTitle}</h5>
        <div
          dangerouslySetInnerHTML={{
            __html: props?.htmlContent
          }}
          className="mt-3 html-content"
        />
      </Modal>
    </div>
  )
}

export default CMSModal;