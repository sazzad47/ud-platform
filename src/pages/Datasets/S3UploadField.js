import React, { useEffect } from 'react';
import {
    Button,
    Card,
    Col,
    FormFeedback,
    Label,
    Row,
    Form,
    Input,
} from 'reactstrap';
import { useField, Field } from 'formik';
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

const S3UploadField = ({
    touched,
    values,
    errors,
    handleBlur,
    handleChange,
}) => {
    return (
        <>
            <div className='mt-1'>
                <Row>
                    <Col lg={6}>
                        <div className='mb-3'>
                            {' '}
                            <Label
                                className='form-label'
                                htmlFor='aws-secret-key-id-input'
                            >
                                AWS secret key ID
                            </Label>
                            <Input
                                type='text'
                                name='AWSSecretKeyId'
                                className='form-control'
                                id='aws-secret-key-id-input'
                                placeholder='Enter key ID'
                                validate={{
                                    required: {
                                        value: true,
                                    },
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.AWSSecretKeyId}
                                invalid={
                                    touched.AWSSecretKeyId &&
                                    errors.AWSSecretKeyId
                                        ? true
                                        : false
                                }
                            />
                            {touched.AWSSecretKeyId && errors.AWSSecretKeyId ? (
                                <FormFeedback invalid='true' type='invalid'>
                                    {errors.AWSSecretKeyId}
                                </FormFeedback>
                            ) : null}
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className='mb-3'>
                            {' '}
                            <Label
                                className='form-label'
                                htmlFor='aws-secret-key-input'
                            >
                                AWS secret key
                            </Label>
                            <Input
                                type='text'
                                name='AWSSecretKey'
                                className='form-control'
                                id='aws-secret-key-input'
                                placeholder='Enter secret key'
                                validate={{
                                    required: {
                                        value: true,
                                    },
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.AWSSecretKey}
                                invalid={
                                    touched.AWSSecretKey && errors.AWSSecretKey
                                        ? true
                                        : false
                                }
                            />
                            {touched.AWSSecretKey && errors.AWSSecretKey ? (
                                <FormFeedback invalid='true' type='invalid'>
                                    {errors.AWSSecretKey}
                                </FormFeedback>
                            ) : null}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <div className='mb-3'>
                            {' '}
                            <Label
                                className='form-label'
                                htmlFor='aws-region-input'
                            >
                                AWS region
                            </Label>
                            <Input
                                type='text'
                                name='AWSRegion'
                                className='form-control'
                                id='aws-region-input'
                                placeholder='Enter AWS region'
                                validate={{
                                    required: {
                                        value: true,
                                    },
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.AWSRegion}
                                invalid={
                                    touched.AWSRegion && errors.AWSRegion
                                        ? true
                                        : false
                                }
                            />
                            {touched.AWSRegion && errors.AWSRegion ? (
                                <FormFeedback invalid='true' type='invalid'>
                                    {errors.AWSRegion}
                                </FormFeedback>
                            ) : null}
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className='mb-3'>
                            {' '}
                            <Label
                                className='form-label'
                                htmlFor='s3-bucket-address-input'
                            >
                                S3 bucket address
                            </Label>
                            <Input
                                type='text'
                                name='S3BucketAddress'
                                className='form-control'
                                id='s3-bucket-address-input'
                                placeholder='Enter S3 bucket address'
                                validate={{
                                    required: {
                                        value: true,
                                    },
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.S3BucketAddress}
                                invalid={
                                    touched.S3BucketAddress &&
                                    errors.S3BucketAddress
                                        ? true
                                        : false
                                }
                            />
                            {touched.S3BucketAddress &&
                            errors.S3BucketAddress ? (
                                <FormFeedback invalid='true' type='invalid'>
                                    {errors.S3BucketAddress}
                                </FormFeedback>
                            ) : null}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className=''>
                            {' '}
                            <Label className='form-label' htmlFor='path-input'>
                                Path
                            </Label>
                            <Input
                                type='text'
                                name='path'
                                className='form-control'
                                id='path-input'
                                placeholder='Enter path'
                                validate={{
                                    required: {
                                        value: true,
                                    },
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.path}
                                invalid={
                                    touched.path && errors.path ? true : false
                                }
                            />
                            {touched.path && errors.path ? (
                                <FormFeedback invalid='true' type='invalid'>
                                    {errors.path}
                                </FormFeedback>
                            ) : null}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default S3UploadField;
