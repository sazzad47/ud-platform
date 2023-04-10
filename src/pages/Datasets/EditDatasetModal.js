import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ButtonGroup,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    UncontrolledDropdown,
} from 'reactstrap';

import { v4 as uuidv4 } from 'uuid';

//Import Flatepicker
import Flatpickr from 'react-flatpickr';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Dropzone from 'react-dropzone';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { updateDataset } from '../../store/actions';
import { useDispatch } from 'react-redux';

const EditDatasetModal = ({
    show,
    dataset,
    toggle,
    setModal,
    onCancelClick,
}) => {
    const dispatch = useDispatch();

    //Dropzone file upload
    const [selectedFiles, setselectedFiles] = useState([]);
    const [files, setFiles] = useState([]);

    /**
     * Formats the size
     */
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
        );
    }

    function handleAcceptedFiles(files) {
        files.map(file => {
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

        setselectedFiles(files);
    }

    // validation
    const formik = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: (dataset && dataset.name) || '',
            description: (dataset && dataset.description) || '',
            type: (dataset && dataset.type) || '',
            access: (dataset && dataset.access) || '',
            hasAnnotations: (dataset && dataset.hasAnnotations) || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please enter Name'),
            description: Yup.string().required('Please enter Description'),
            type: Yup.string().required('Please select Type'),
            access: Yup.string().required('Please select Public or Private'),
            hasAnnotations: Yup.string().required('Please select Yes or No'),
        }),
        onSubmit: values => {
            const updatedDataset = {
                _id: dataset ? dataset._id : uuidv4(), // Simplify: There's no way there is no dataset?
                id: dataset.id,
                name: values.name,
                description: values.description,
                type: values.type,
                access: values.access,
                hasAnnotations: values.hasAnnotations,
                status: dataset?.status,
            };

            dispatch(updateDataset(updatedDataset));
            // toastNotifyDatasetUpdated();
            formik.resetForm();
            toggle();
        },
    });

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
    const [duedate, setdueDate] = useState(dateFormat());

    const credateformate = e => {
        const date = e.toString().split(' ');
        const joinDate = (date[2] + ' ' + date[1] + ', ' + date[3]).toString();
        setcreDate(joinDate);
    };

    const duedateformate = e => {
        const date = e.toString().split(' ');
        const joinDate = (date[2] + ' ' + date[1] + ', ' + date[3]).toString();
        setdueDate(joinDate);
    };

    return (
        <Modal
            isOpen={show}
            toggle={onCancelClick}
            centered
            size='lg'
            className='border-0'
            modalClassName='zoomIn'
        >
            <ModalHeader toggle={onCancelClick} className='p-3 bg-soft-info'>
                Edit Dataset
            </ModalHeader>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    formik.handleSubmit();
                    return false;
                }}
            >
                <ModalBody>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <div>
                                        <Label
                                            className='form-label'
                                            htmlFor='name'
                                        >
                                            Dataset Name
                                        </Label>
                                        <Input
                                            type='text'
                                            name='name'
                                            className='form-control'
                                            id='name'
                                            placeholder='Enter dataset name'
                                            validate={{
                                                required: { value: true },
                                            }}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name || ''}
                                            invalid={
                                                formik.touched.name &&
                                                formik.errors.name
                                                    ? true
                                                    : false
                                            }
                                        />
                                        {formik.touched.name &&
                                        formik.errors.name ? (
                                            <FormFeedback
                                                invalid
                                                type='invalid'
                                            >
                                                {formik.errors.name}
                                            </FormFeedback>
                                        ) : null}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={7} className='align-self-stretch d-flex'>
                            <Card className='flex-grow-1'>
                                <CardBody className='d-flex flex-column'>
                                    <div className='d-flex flex-column flex-grow-1'>
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
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.description || ''
                                            }
                                            invalid={
                                                formik.touched.description &&
                                                formik.errors.description
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={5} className='d-flex flex-column'>
                            <Card className='flex-grow-1'>
                                <CardBody className='d-flex flex-column gap-5'>
                                    <Row className='mb-3'>
                                        <Col lg={12}>
                                            <div className='mb-3 mb-lg-0'>
                                                <Label
                                                    htmlFor='choices-dataset-type'
                                                    className='form-label'
                                                >
                                                    Dataset Type
                                                </Label>
                                                <Input
                                                    type='select'
                                                    className='form-select'
                                                    data-choices
                                                    data-choices-search-false
                                                    id='choices-dataset-type'
                                                    name='type'
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={formik.values.type}
                                                    onBlur={formik.handleBlur}
                                                    invalid={
                                                        formik.touched.type &&
                                                        formik.errors.type
                                                            ? true
                                                            : false
                                                    }
                                                >
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
                                                {formik.touched.type &&
                                                formik.errors.type ? (
                                                    <FormFeedback>
                                                        {formik.errors.type}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className='mb-3'>
                                        <Col lg={12}>
                                            <FormGroup>
                                                <Label
                                                    htmlFor='choices-access'
                                                    className='form-label'
                                                >
                                                    Access
                                                </Label>
                                                <Input
                                                    name='access'
                                                    type='select'
                                                    className='form-select'
                                                    // data-choices
                                                    // data-choices-search-false
                                                    id='choices-access'
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={formik.values.access}
                                                    onBlur={formik.handleBlur}
                                                    invalid={
                                                        formik.touched.access &&
                                                        formik.errors.access
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <option value='Private'>
                                                        Private
                                                    </option>
                                                    <option value='Public'>
                                                        Public
                                                    </option>
                                                </Input>
                                                {formik.touched.access &&
                                                formik.errors.access ? (
                                                    <FormFeedback>
                                                        {formik.errors.access}
                                                    </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div>
                                                <Label
                                                    htmlFor='choices-has-annotations'
                                                    className='form-label'
                                                >
                                                    Has Annotations?
                                                </Label>
                                                <Input
                                                    name='hasAnnotations'
                                                    type='select'
                                                    className='form-select'
                                                    // data-choices
                                                    // data-choices-search-false
                                                    id='choices-has-annotations'
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values
                                                            .hasAnnotations
                                                    }
                                                >
                                                    <option value='Yes'>
                                                        Yes
                                                    </option>
                                                    <option value='No'>
                                                        No
                                                    </option>
                                                </Input>
                                                {formik.touched
                                                    .hasAnnotations &&
                                                formik.errors.hasAnnotations ? (
                                                    <FormFeedback>
                                                        {
                                                            formik.errors
                                                                .hasAnnotations
                                                        }
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ModalBody>
                <div className='modal-footer'>
                    <div className='hstack gap-2 justify-content-end'>
                        <button
                            onClick={() => {
                                onCancelClick();
                                setModal(false);
                            }}
                            type='button'
                            className='btn btn-light'
                            data-bs-dismiss='modal'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='btn btn-success'
                            id='add-btn'
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};

EditDatasetModal.propTypes = {
    onCancelClick: PropTypes.func,
    onSaveClick: PropTypes.func,
    show: PropTypes.any,
};

export default EditDatasetModal;
