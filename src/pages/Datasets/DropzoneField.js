import React, { useEffect } from 'react';
import { Button, Card, Col, Label, Row } from 'reactstrap';
import { useField } from 'formik';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';

/**
 * Formats the size
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const DropzoneField = ({ selectedFiles, setSelectedFiles, ...props }) => {
    const [fieldInputProps, fieldMetaProps, fieldHelperProps] = useField(props);

    useEffect(() => {
        fieldHelperProps.setValue(selectedFiles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleAcceptedFiles(acceptedFiles) {
        const processedFiles = acceptedFiles.map(file => {
            if (file.type.startsWith('image')) {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    formattedSize: formatBytes(file.size),
                });
            } else {
                return Object.assign(file, {
                    preview: null,
                    formattedSize: formatBytes(file.size),
                });
            }
        });
        fieldHelperProps.setError('');
        fieldHelperProps.setTouched(true);
        fieldHelperProps.setValue(processedFiles);
        setSelectedFiles(processedFiles);
    }

    function handleRemoveFile(fileToRemove) {
        const newSelectedFiles = selectedFiles.filter(
            file => file.name !== fileToRemove.name
        );

        if (newSelectedFiles.length === 0) {
            fieldHelperProps.setValue([]);
        }
        setSelectedFiles(newSelectedFiles);
    }

    return (
        <>
            <div className='mt-1'>
                <Dropzone
                    {...fieldInputProps}
                    {...props}
                    onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles);
                    }}
                    style={{ border: '1px solid red' }}
                >
                    {({ getRootProps, getInputProps }) => {
                        const dropzoneBorderColorClass =
                            fieldMetaProps.touched && fieldMetaProps.error
                                ? 'red-border-dropzone'
                                : '';
                        return (
                            <div
                                className={`dropzone dz-clickable ${dropzoneBorderColorClass}`}
                            >
                                <div
                                    className='dz-message needsclick'
                                    {...getRootProps()}
                                >
                                    <div className='mb-3'>
                                        <i className='display-4 text-muted ri-upload-cloud-2-fill' />
                                    </div>
                                    <h5>Drop files here or click to upload.</h5>
                                </div>
                            </div>
                        );
                    }}
                </Dropzone>
                <ul className='list-unstyled mb-0' id='dropzone-preview'>
                    {selectedFiles.map((file, index) => {
                        return (
                            <Card
                                className='mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete'
                                key={index + '-file'}
                            >
                                <div className='p-2'>
                                    <Row className='align-items-center'>
                                        <Col className='col-auto'>
                                            {file.preview && (
                                                <img
                                                    data-dz-thumbnail=''
                                                    height='80'
                                                    className='avatar-sm rounded bg-light'
                                                    alt={file.name}
                                                    src={file.preview}
                                                />
                                            )}
                                        </Col>
                                        <Col className='d-flex gap-3'>
                                            <Link
                                                to='#'
                                                className='text-muted font-weight-bold'
                                            >
                                                {file.name}
                                            </Link>
                                            <p className='mb-0'>
                                                <strong>
                                                    {file.formattedSize}
                                                </strong>
                                            </p>
                                            <Button
                                                className='ms-auto'
                                                size='sm'
                                                color='dark'
                                                onClick={() => {
                                                    handleRemoveFile(file);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        );
                    })}
                </ul>
                {fieldMetaProps.touched && fieldMetaProps.error ? (
                    <p className='mt-1 tiny-warning-text text-danger'>
                        {fieldMetaProps.error}
                    </p>
                ) : null}
            </div>
        </>
    );
};

export default DropzoneField;
