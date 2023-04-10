import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import downloadIcon from '../../assets/images/svg/download-svgrepo-com.svg';

const DownloadModal = ({ show, onConfirmClick, onCancelClick, text }) => {
    return (
        <Modal isOpen={show} toggle={onCancelClick} centered={true}>
            <ModalBody className='py-3 px-5'>
                <div className='mt-2 text-center'>
                    <img
                        src={downloadIcon}
                        className='img-fluid download-modal-icon'
                        alt='user-pic'
                    />
                    <div className='mt-4 pt-2 fs-15 mx-4 mx-sm-5'>
                        <h4>Please confirm download</h4>
                        <p className='text-muted mx-4 mb-0'>{text}</p>
                    </div>
                </div>
                <div className='d-flex gap-2 justify-content-center mt-4 mb-2'>
                    <button
                        type='button'
                        className='btn w-sm btn-light'
                        data-bs-dismiss='modal'
                        onClick={onCancelClick}
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        className='btn w-sm btn-primary '
                        id='delete-record'
                        onClick={onConfirmClick}
                    >
                        Yes, Download It!
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

DownloadModal.propTypes = {
    onCloseClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default DownloadModal;
