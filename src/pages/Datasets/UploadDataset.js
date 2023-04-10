import React, { useState } from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormFeedback,
    Input,
    Label,
    Row,
} from 'reactstrap';
// import { toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import { addNewDataset } from '../../store/actions';
import { useDispatch } from 'react-redux';
import DropzoneField from './DropzoneField';
import S3UploadField from './S3UploadField';

const UploadDataset = () => {
    const dispatch = useDispatch();

    //Dropzone file upload
    const [selectedFiles, setSelectedFiles] = useState([]);
    // const [files, setFiles] = useState([]);

    const [uploadOption, setUploadOption] = useState('Dropzone');

    const dateFormat = () => {
        let d = new Date(),
            months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ];
        return (
            d.getDate() +
            ' ' +
            months[d.getMonth()] +
            ', ' +
            d.getFullYear()
        ).toString();
    };

    const [credate, setcreDate] = useState(dateFormat());

    const credateformate = e => {
        const date = e.toString().split(' ');
        const joinDate = (date[2] + ' ' + date[1] + ', ' + date[3]).toString();
        setcreDate(joinDate);
    };

    // const toastNotifyDatasetCreated = () => {
    //     console.log('I AM in the toast notify Dataset Created');
    //     toast('Dataset successfully created!', {
    //         position: 'top-center',
    //         hideProgressBar: true,
    //         className: 'bg-success text-white',
    //     });
    // };

    const initialFormValues = {
        name: '',
        description: '',
        type: '',
        access: '',
        hasAnnotations: '',
        files: [],
        dataUploadOption: uploadOption,
        AWSSecretKeyId: '',
        AWSSecretKey: '',
        AWSRegion: '',
        S3BucketAddress: '',
        path: '',
    };

    // const s3ValidationSchema = Yup.object().shape({
    //     AWSSecretKey: Yup.string().required('AWS Secret Key is required'),
    // });

    const newDatasetValidationSchema = Yup.object({
        name: Yup.string().required('Please enter Name'),
        description: Yup.string().required('Please enter Description'),
        type: Yup.string().required('Please select the Type of Dataset'),
        access: Yup.string().required('Please select Public or Private'),
        hasAnnotations: Yup.string().required('Please select Yes or No'),
        dataUploadOption: Yup.string(),
        files: Yup.array(
            Yup.object({
                name: Yup.string().required(),
            }).nullable()
        ).when('dataUploadOption', {
            is: 'Dropzone',
            then: schema =>
                schema.min(1, 'Please select at least one file to upload'),
        }),
        AWSSecretKey: Yup.string().when('dataUploadOption', {
            is: 'S3',
            then: schema => schema.required('AWS Secret Key required'),
        }),
        AWSSecretKeyId: Yup.string().when('dataUploadOption', {
            is: 'S3',
            then: schema => schema.required('AWS Secret Key ID required'),
        }),
        AWSRegion: Yup.string().when('dataUploadOption', {
            is: 'S3',
            then: schema => schema.required('AWS Region required'),
        }),
        S3BucketAddress: Yup.string().when('dataUploadOption', {
            is: 'S3',
            then: schema => schema.required('S3 Bucket Address required'),
        }),
        path: Yup.string().when('dataUploadOption', {
            is: 'S3',
            then: schema => schema.required('Path required'),
        }),
    });

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={newDatasetValidationSchema}
            onSubmit={(values, actions) => {
                const newDataset = {
                    _id: uuidv4(),
                    name: values.name,
                    description: values.description,
                    type: values.type,
                    access: values.access,
                    hasAnnotations: values.hasAnnotations,
                    status: 'Not started',
                    owner: 'Dave (Founder)',
                    files: values.files,
                    uploadDate: new Date(),
                    dataUploadOption: values.uploadOption,
                    AWSSecretKeyId: values.AWSSecretKeyId,
                    AWSSecretKey: values.AWSSecretKey,
                    AWSRegion: values.AWSRegion,
                    S3BucketAddress: values.S3BucketAddress,
                    path: values.path,
                };

                dispatch(addNewDataset(newDataset));
                // toastNotifyDatasetCreated();
                actions.resetForm();
                actions.setFieldValue('dataUploadOption', uploadOption);

                setSelectedFiles([]);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
                setFieldValue,
            }) => (
                <Form
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                        return false;
                    }}
                >
                    <Card className='bg-light'>
                        <CardBody>
                            <CardHeader className='mb-1 bg-light'>
                                <div className='d-flex align-items-center'>
                                    <h5 className='card-title mb-0 flex-grow-1'>
                                        New Dataset
                                    </h5>
                                </div>
                            </CardHeader>
                            <Row>
                                <Col lg={7} className='d-flex flex-column'>
                                    <Card className='flex-grow-1'>
                                        <CardBody className='d-flex flex-column'>
                                            <div className='mb-3'>
                                                <Label
                                                    className='form-label'
                                                    htmlFor='project-name-input'
                                                >
                                                    Dataset Name
                                                </Label>
                                                <Input
                                                    type='text'
                                                    name='name'
                                                    className='form-control'
                                                    id='project-name-input'
                                                    placeholder='Enter dataset name'
                                                    validate={{
                                                        required: {
                                                            value: true,
                                                        },
                                                    }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name || ''}
                                                    invalid={
                                                        touched.name &&
                                                        errors.name
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {touched.name && errors.name ? (
                                                    <FormFeedback
                                                        invalid='true'
                                                        type='invalid'
                                                    >
                                                        {errors.name}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                            <div className='mb-0 flex-grow-1 d-flex flex-column'>
                                                <Label className='form-label'>
                                                    Dataset Description
                                                </Label>
                                                <Input
                                                    className='flex-grow-1'
                                                    type='textarea'
                                                    name='description'
                                                    placeholder='Enter dataset description'
                                                    validate={{
                                                        required: {
                                                            value: true,
                                                        },
                                                    }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={
                                                        values.description || ''
                                                    }
                                                    invalid={
                                                        touched.description &&
                                                        errors.description
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {errors.description ? (
                                                    <FormFeedback
                                                        invalid='true'
                                                        type='invalid'
                                                    >
                                                        {errors.description}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                {/* cw */}
                                <Col lg={5} className='d-flex flex-column'>
                                    <Card className='d-flex flex-column flex-grow-1'>
                                        <CardBody className='d-flex flex-column'>
                                            {' '}
                                            <div className='d-flex flex-column flex-grow-1 upload-dataset-dropzone-wrapper'>
                                                <Label
                                                    className='form-label'
                                                    htmlFor='project-title-input'
                                                >
                                                    Dataset Files
                                                </Label>
                                                <p className='text-muted'>
                                                    Add data files here.
                                                </p>
                                                <ButtonGroup className='mb-2'>
                                                    <Button
                                                        className='p-0'
                                                        color='dark'
                                                        outline
                                                        onClick={() => {
                                                            setUploadOption(
                                                                'S3'
                                                            );
                                                            setFieldValue(
                                                                'dataUploadOption',
                                                                'S3'
                                                            );
                                                        }}
                                                        active={
                                                            uploadOption ===
                                                            'S3'
                                                        }
                                                    >
                                                        S3
                                                    </Button>
                                                    <Button
                                                        className='p-0'
                                                        color='dark'
                                                        outline
                                                        onClick={() => {
                                                            setUploadOption(
                                                                'Dropzone'
                                                            );
                                                            setFieldValue(
                                                                'dataUploadOption',
                                                                'Dropzone'
                                                            );
                                                        }}
                                                        active={
                                                            uploadOption ===
                                                            'Dropzone'
                                                        }
                                                    >
                                                        <i className='text-muted ri-upload-cloud-2-fill fs-4' />
                                                    </Button>
                                                </ButtonGroup>
                                                {uploadOption ===
                                                    'Dropzone' && (
                                                    <DropzoneField
                                                        name='files'
                                                        label='Dataset Files'
                                                        invalid={
                                                            touched.files &&
                                                            errors.files
                                                                ? true
                                                                : false
                                                        }
                                                        value={
                                                            values.files || ''
                                                        }
                                                        selectedFiles={
                                                            selectedFiles
                                                        }
                                                        setSelectedFiles={
                                                            setSelectedFiles
                                                        }
                                                        values={values}
                                                        errors={errors}
                                                        touched={touched}
                                                    />
                                                )}

                                                {uploadOption === 'S3' && (
                                                    <S3UploadField
                                                        name='s3'
                                                        label='Dataset Files'
                                                        invalid={
                                                            touched.files &&
                                                            errors.files
                                                                ? true
                                                                : false
                                                        }
                                                        values={values}
                                                        errors={errors}
                                                        touched={touched}
                                                        handleBlur={handleBlur}
                                                        handleChange={
                                                            handleChange
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={12}>
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col lg={4}>
                                                    <div className='mb-1 mb-lg-0'>
                                                        <Label
                                                            htmlFor='choices-data-set-type'
                                                            className='form-label'
                                                        >
                                                            Dataset Type
                                                        </Label>
                                                        <Input
                                                            className='form-select'
                                                            name='type'
                                                            type='select'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={values.type}
                                                            onBlur={handleBlur}
                                                            invalid={
                                                                touched.type &&
                                                                errors.type
                                                                    ? true
                                                                    : false
                                                            }
                                                            data-choices
                                                            data-choices-search-false
                                                            id='choices-data-set-type'
                                                        >
                                                            <option value=''>
                                                                Select Type
                                                            </option>

                                                            <option value='Images'>
                                                                Images
                                                            </option>
                                                            <option value='Videos'>
                                                                Videos
                                                            </option>
                                                            <option value='Point Cloud'>
                                                                Point Cloud
                                                            </option>
                                                            <option value='Other'>
                                                                Other
                                                            </option>
                                                        </Input>
                                                        {touched.type &&
                                                        errors.type ? (
                                                            <FormFeedback>
                                                                {errors.type}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className='mb-1 mb-lg-0'>
                                                        <Label
                                                            htmlFor='choices-access-input'
                                                            className='form-label'
                                                        >
                                                            Access
                                                        </Label>
                                                        <Input
                                                            className='form-select'
                                                            name='access'
                                                            type='select'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            data-choices
                                                            data-choices-search-false
                                                            id='choices-access-input'
                                                            value={
                                                                values.access
                                                            }
                                                            onBlur={handleBlur}
                                                            invalid={
                                                                touched.access &&
                                                                errors.access
                                                                    ? true
                                                                    : false
                                                            }
                                                        >
                                                            <option value=''>
                                                                Select Access
                                                                Level
                                                            </option>
                                                            <option value='Private'>
                                                                Private
                                                            </option>
                                                            <option value='Public'>
                                                                Public
                                                            </option>
                                                        </Input>
                                                        {touched.access &&
                                                        errors.access ? (
                                                            <FormFeedback>
                                                                {errors.access}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col lg={4}>
                                                    <div className='mb-1 mb-lg-0'>
                                                        <Label
                                                            htmlFor='choices-has-annotations-input'
                                                            className='form-label'
                                                        >
                                                            Has Annotations?
                                                        </Label>
                                                        <Input
                                                            className='form-select'
                                                            name='hasAnnotations'
                                                            type='select'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            data-choices
                                                            data-choices-search-false
                                                            id='choices-has-annotations-input'
                                                            value={
                                                                values.hasAnnotations
                                                            }
                                                            onBlur={handleBlur}
                                                            invalid={
                                                                touched.hasAnnotations &&
                                                                errors.hasAnnotations
                                                                    ? true
                                                                    : false
                                                            }
                                                        >
                                                            <option value=''>
                                                                Select Yes or No
                                                            </option>
                                                            <option value='Yes'>
                                                                Yes
                                                            </option>
                                                            <option value='No'>
                                                                No
                                                            </option>
                                                        </Input>
                                                        {touched.hasAnnotations &&
                                                        errors.hasAnnotations ? (
                                                            <FormFeedback>
                                                                {
                                                                    errors.hasAnnotations
                                                                }
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                    <div className='text-end mb-2'>
                                        <button
                                            type='button'
                                            className='btn btn-danger w-sm me-1'
                                            onClick={() => {
                                                resetForm();
                                                setFieldValue(
                                                    'dataUploadOption',
                                                    uploadOption
                                                );

                                                setSelectedFiles([]);
                                                // toastNotifyDatasetCreated();
                                            }}
                                        >
                                            Clear Form
                                        </button>
                                        <button
                                            type='submit'
                                            className='btn btn-success w-sm'
                                        >
                                            Upload Dataset
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Form>
            )}
        </Formik>
    );
};

export default UploadDataset;
