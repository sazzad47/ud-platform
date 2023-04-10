// import { useWhatChanged } from '@simbathesailor/use-what-changed';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormFeedback,
    Input,
    Label,
    Row,
    UncontrolledDropdown,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap';
import MsgToastCentered from '../../../Components/Common/MsgToastCentered';
import { ToastContainer } from 'react-toastify';

import {
    getProjectList,
    deleteProject,
    updateProject,
    addNewProject,
    resetProjectFlag,
} from '../../../store/actions';
import DeleteModal from '../../../Components/Common/DeleteModal';

import * as Yup from 'yup';
import { useFormik } from 'formik';

//Import Icons
import FeatherIcon from 'feather-icons-react';
import { v4 as uuidv4 } from 'uuid';

import stripes from '../../../assets/images/projects/download.jpg';
import planeinforest from '../../../assets/images/projects/david-kovalenko-G85VuTpw6jg-unsplash.jpg';
import lightbulb from '../../../assets/images/projects/diego-ph-fIq0tET6llw-unsplash.jpg';
import pencils from '../../../assets/images/projects/jess-bailey-l3N9Q27zULw-unsplash.jpg';
import avatar2 from '../../../assets/images/users/avatar-2.jpg';

// const List = ({ projectList }) => {
const List = () => {
    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);
    const [createEditModalIsOpen, setCreateEditModalIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [pickedProject, setPickedProject] = useState(null);

    const {
        projectList,
        isProjectSuccess,
        error,
        isProjectAdded,
        isProjectAddFail,
        isProjectDeleted,
        isProjectDeleteFail,
        isProjectUpdated,
        isProjectUpdateFail,
    } = useSelector(state => ({
        projectList: state.Projects.projectList,
        isProjectSuccess: state.Projects.isProjectSuccess,
        error: state.Projects.error,
        isProjectAdded: state.Projects.isProjectAdded,
        isProjectAddFail: state.Projects.isProjectAddFail,
        isProjectDeleted: state.Projects.isProjectDeleted,
        isProjectDeleteFail: state.Projects.isProjectDeleteFail,
        isProjectUpdated: state.Projects.isProjectUpdated,
        isProjectUpdateFail: state.Projects.isProjectUpdateFail,
    }));

    useEffect(() => {
        dispatch(getProjectList());
    }, [dispatch]);

    // useWhatChanged(
    //     [
    //         dispatch,
    //         isProjectSuccess,
    //         error,
    //         isProjectAdded,
    //         isProjectAddFail,
    //         isProjectDeleted,
    //         isProjectDeleteFail,
    //         isProjectUpdated,
    //         isProjectUpdateFail,
    //     ],
    //     'dispatch, isProjectSuccess, error, isProjectAdded, isProjectAddFail, isProjectDeleted, isProjectDeleteFail, isProjectUpdated, isProjectUpdateFail'
    // );

    useEffect(() => {
        // console.log('something changed , need to figure out what');
        setTimeout(() => {
            dispatch(resetProjectFlag());
        }, 3000);
    }, [
        dispatch,
        isProjectSuccess,
        error,
        isProjectAdded,
        isProjectAddFail,
        isProjectDeleted,
        isProjectDeleteFail,
        isProjectUpdated,
        isProjectUpdateFail,
    ]);

    const toggleCreateEditModalVisibility = useCallback(() => {
        if (createEditModalIsOpen) {
            setCreateEditModalIsOpen(false);
            setPickedProject(null);
        } else {
            setCreateEditModalIsOpen(true);
        }
    }, [createEditModalIsOpen]);

    const formik = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: (pickedProject && pickedProject.label) || '',
            description: (pickedProject && pickedProject.caption) || '',
            hasAnnotations:
                (pickedProject && pickedProject.hasAnnotations) || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please Enter Project Name'),
            description: Yup.string().required(
                'Please Enter Project Description'
            ),
            hasAnnotations: Yup.string().required('Please Select Yes or No'),
        }),
        // validator: () => ({}),
        onSubmit: values => {
            console.log('IN Formik ON SUBMIT /&$(/%(/&');

            console.log({ projectList });

            const maxId = projectList
                .map(project => (project ? project?.id : 0))
                .reduce((prev, curr) => Math.max(prev, curr), -Infinity);

            const today = new Date();
            const dateString =
                today.getDate() +
                '-' +
                (today.getMonth() + 1) +
                '-' +
                today.getFullYear();

            const timeString = today.getHours() + ':' + today.getMinutes();
            var updatedDateTimeString = `Updated ${dateString} at ${timeString}`;

            if (isEdit) {
                console.log('IN if !!!! (isEdit===true)');
                const editedProject = {
                    _id: pickedProject ? pickedProject._id : uuidv4(),
                    id: pickedProject ? pickedProject.id : maxId + 1,
                    label: values.name,
                    caption: values.description,
                    hasAnnotations: values.hasAnnotations,

                    status: values.status,
                    isDesign1: true,
                    time: updatedDateTimeString,
                    img: pickedProject ? pickedProject.img : stripes,
                    imgbgColor: pickedProject
                        ? pickedProject.imgbgColor
                        : 'warning',
                    number: pickedProject ? pickedProject.number : '18/42',
                    progressBar: pickedProject
                        ? pickedProject.progressBar
                        : '34%',
                    subItem: pickedProject ? pickedProject.subItem : [],
                    date: pickedProject ? pickedProject.date : '10 Jul, 2023',
                    ratingClass: pickedProject ? pickedProject.ratingClass : '',
                    datasets: pickedProject ? pickedProject.datasets : [5, 6],
                    mainImage: pickedProject
                        ? pickedProject.mainImage
                        : stripes,
                    smallImages: pickedProject
                        ? pickedProject.smallImages
                        : [planeinforest, lightbulb, pencils],
                };
                dispatch(updateProject(editedProject));
                formik.resetForm();
                setIsEdit(false);
                setCreateEditModalIsOpen(false);
            } else {
                console.log('IN else !!!! (isEdit===false)');

                const newProject = {
                    _id: uuidv4(),
                    id: maxId + 1,
                    label: values.name,
                    caption: values.description,
                    hasAnnotations: values.hasAnnotations,
                    status: 'Newly created',
                    progressBar: '50%',
                    isDesign1: true,
                    img: stripes,
                    smallImages: [planeinforest, lightbulb, pencils],
                    time: updatedDateTimeString,
                    imgbgColor: 'warning',
                    number: '18/42',
                    subItem: [
                        { id: 1, imgFooter: avatar2 },
                        { id: 2, imgNumber: '+' },
                    ],
                    date: '10 Jul, 2023',
                    ratingClass: '',
                    datasets: [5, 6],
                    mainImage: stripes,
                };

                console.log({ newProject });

                dispatch(addNewProject(newProject));
                formik.resetForm();
                setCreateEditModalIsOpen(false);
            }
        },
    });

    // Delete Project
    const onClickDeleteProjectIcon = project => {
        setPickedProject(project);
        setDeleteModal(true);
    };

    const handleDeleteProjectConfirmed = () => {
        if (pickedProject && Object.keys(pickedProject).length !== 0) {
            dispatch(deleteProject(pickedProject.id));
        }
        setDeleteModal(false);
    };

    // Update Project --- useCallback version
    // const handleClickEditProjectIcon = useCallback(project => {
    //     console.log('In handleClickEditProjectIcon !!!!!!!!!!!');
    //     console.log({ project });
    //     setPickedProject(project);

    //     formik.resetForm();
    //     formik.setValues({name: project.name})
    //     console.log({ formik });
    //     setIsEdit(true);
    //     setCreateEditModalIsOpen(true);
    // }, []);

    const handleClickEditProjectIcon = project => {
        console.log('In handleClickEditProjectIcon !!!!!!!!!!!');
        console.log({ project });
        setPickedProject(project);

        formik.resetForm();

        console.log({ formik });
        setIsEdit(true);
        setCreateEditModalIsOpen(true);
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={createEditModalIsOpen}
                toggle={toggleCreateEditModalVisibility}
                centered
                size='lg'
                className='border-0'
                modalClassName='zoomIn'
            >
                <ModalHeader
                    toggle={toggleCreateEditModalVisibility}
                    className='p-3 bg-soft-info'
                >
                    {!!isEdit ? 'Edit Project' : 'Create Project '}
                </ModalHeader>
                <Form
                    onSubmit={e => {
                        console.log('I am in the <Form onSubmit...');
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                    }}
                >
                    <ModalBody>
                        <Row className='g-3'>
                            <Col lg={12}>
                                <div>
                                    <Label
                                        htmlFor='projectName-field'
                                        className='form-label'
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        name='name'
                                        id='projectName-field'
                                        className='form-control'
                                        placeholder='Enter Name'
                                        type='text'
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
                                        <FormFeedback type='invalid'>
                                            {formik.errors.name}
                                        </FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <Label
                                        htmlFor='projectStatus-field'
                                        className='form-label'
                                    >
                                        Has annotations:
                                    </Label>
                                    <Input
                                        name='hasAnnotations'
                                        type='select'
                                        className='form-select'
                                        id='hasAnnotations-field'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={
                                            formik.values.hasAnnotations || ''
                                        }
                                        invalid={
                                            formik.touched.hasAnnotations &&
                                            formik.errors.hasAnnotations
                                                ? true
                                                : false
                                        }
                                    >
                                        <option value=''>
                                            Select Yes or No
                                        </option>
                                        <option value='Yes'>Yes</option>
                                        <option value='No'>No</option>
                                    </Input>
                                    {formik.touched.hasAnnotations &&
                                    formik.errors.hasAnnotations ? (
                                        <FormFeedback type='invalid'>
                                            {formik.errors.hasAnnotations}
                                        </FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <Label
                                        htmlFor='description-field'
                                        className='form-label'
                                    >
                                        Description
                                    </Label>
                                    <Input
                                        name='description'
                                        type='textarea'
                                        rows='8'
                                        id='description-field'
                                        placeholder='Enter Description'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description || ''}
                                        invalid={
                                            formik.touched.description &&
                                            formik.errors.description
                                                ? true
                                                : false
                                        }
                                    />

                                    {formik.touched.description &&
                                    formik.errors.description ? (
                                        <FormFeedback type='invalid'>
                                            {formik.errors.description}
                                        </FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                    <div className='modal-footer d-flex flex-row justify-content-start'>
                        <div className='d-flex flex-row justify-content-start gap-2'>
                            <button
                                type='submit'
                                className='btn btn-success'
                                id='add-btn'
                            >
                                {!!isEdit ? 'Save Changes' : 'Save'}
                            </button>
                            <button
                                onClick={() => {
                                    formik.resetForm();
                                    setCreateEditModalIsOpen(false);
                                }}
                                type='button'
                                className='btn btn-light'
                                data-bs-dismiss='modal'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal>
            <DeleteModal
                text={`Do you want to delete this project?\n${
                    pickedProject && pickedProject.name
                }`}
                show={deleteModal}
                onDeleteClick={handleDeleteProjectConfirmed}
                onCloseClick={() => setDeleteModal(false)}
            />
            <Row className='g-4 mb-3'>
                <div className='col-sm'>
                    <div className='d-flex justify-content-sm-end gap-2'>
                        <div className='search-box ms-2'>
                            <Input
                                type='text'
                                className='form-control'
                                placeholder='Search...'
                            />
                            <i className='ri-search-line search-icon'></i>
                        </div>
                    </div>
                </div>
                <div className='col-sm-auto'>
                    <div>
                        <Button
                            onClick={() => {
                                setPickedProject(null);
                                setIsEdit(false);
                                setCreateEditModalIsOpen(true);
                            }}
                            className='btn btn-success'
                        >
                            <i className='ri-add-line align-bottom me-1'></i>{' '}
                            New Project
                        </Button>
                    </div>
                </div>
            </Row>

            <div className='row'>
                {(projectList || []).map((thisProject, index) => {
                    return (
                        <React.Fragment key={index}>
                            {thisProject?.isDesign1 ? (
                                <Col xxl={3} sm={6} className='project-card'>
                                    <Card className='h-90'>
                                        <CardBody>
                                            <div className='d-flex flex-column h-100'>
                                                <div className='d-flex'>
                                                    <div className='flex-grow-1'>
                                                        <p className='text-muted mb-4'>
                                                            {thisProject.time}
                                                        </p>
                                                    </div>
                                                    <div className='flex-shrink-0'>
                                                        <div className='d-flex gap-1 align-items-center'>
                                                            <button
                                                                type='button'
                                                                className={`btn avatar-xs mt-n1 p-0 favourite-btn ${thisProject.ratingClass}`}
                                                            >
                                                                <span className='avatar-title bg-transparent fs-15'>
                                                                    <i className='ri-star-fill'></i>
                                                                </span>
                                                            </button>
                                                            <UncontrolledDropdown direction='start'>
                                                                <DropdownToggle
                                                                    tag='button'
                                                                    className='btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15'
                                                                >
                                                                    <FeatherIcon
                                                                        icon='more-vertical'
                                                                        className='icon-sm'
                                                                    />
                                                                </DropdownToggle>

                                                                <DropdownMenu className='dropstart project-dropdown-container'>
                                                                    <div className='horizontal-dropdown-menu'>
                                                                        <DropdownItem
                                                                            onClick={() => {
                                                                                // console.log(
                                                                                //     'Clicking edit project!'
                                                                                // );

                                                                                handleClickEditProjectIcon(
                                                                                    thisProject
                                                                                );
                                                                            }}
                                                                        >
                                                                            <i className='ri-pencil-fill text-muted'></i>{' '}
                                                                        </DropdownItem>
                                                                        <DropdownItem
                                                                            onClick={() => {
                                                                                onClickDeleteProjectIcon(
                                                                                    thisProject
                                                                                );
                                                                            }}
                                                                        >
                                                                            <i className='ri-delete-bin-fill text-muted'></i>{' '}
                                                                        </DropdownItem>
                                                                    </div>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-column mb-1'>
                                                    <Link
                                                        to={{
                                                            pathname:
                                                                '/apps-project-view',
                                                            state: {
                                                                theProject:
                                                                    thisProject,
                                                                project_id:
                                                                    thisProject._id,
                                                            },
                                                        }}
                                                        className='text-dark'
                                                    >
                                                        <div className='flex-shrink-0 mb-3'>
                                                            <img
                                                                src={
                                                                    thisProject.img
                                                                }
                                                                alt=''
                                                                className='img-fluid w-100 project-thumbnail'
                                                            />
                                                        </div>
                                                        <div className='flex-grow-1'>
                                                            <h5 className='mb-1 fs-14'>
                                                                {
                                                                    thisProject.label
                                                                }
                                                            </h5>
                                                            <p className='text-muted text-truncate-two-lines mb-3'>
                                                                {
                                                                    thisProject.caption
                                                                }
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className='mt-1'>
                                                    <div className='d-flex mb-2'>
                                                        <div className='flex-grow-1'>
                                                            <div>Tasks</div>
                                                        </div>
                                                        <div className='flex-shrink-0'>
                                                            <div>
                                                                <i className='ri-list-check align-bottom me-1 text-muted'></i>{' '}
                                                                {
                                                                    thisProject.number
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='progress progress-sm animated-progess'>
                                                        <div
                                                            className='progress-bar bg-success'
                                                            role='progressbar'
                                                            aria-valuenow='34'
                                                            aria-valuemin='0'
                                                            aria-valuemax='100'
                                                            style={{
                                                                width: thisProject.progressBar,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                        <div className='card-footer bg-transparent border-top-dashed py-2'>
                                            <div className='d-flex align-items-center'>
                                                <div className='flex-grow-1'>
                                                    <div className='avatar-group'>
                                                        {thisProject.subItem.map(
                                                            (member, key) => (
                                                                <React.Fragment
                                                                    key={key}
                                                                >
                                                                    {thisProject.imgFooter ? (
                                                                        <Link
                                                                            to='#'
                                                                            className='avatar-group-item'
                                                                            data-bs-toggle='tooltip'
                                                                            data-bs-trigger='hover'
                                                                            data-bs-placement='top'
                                                                            title='Darline Williams'
                                                                        >
                                                                            <div className='avatar-xxs'>
                                                                                <img
                                                                                    src={
                                                                                        member.imgFooter
                                                                                    }
                                                                                    alt=''
                                                                                    className='rounded-circle img-fluid'
                                                                                />
                                                                            </div>
                                                                        </Link>
                                                                    ) : (
                                                                        <Link
                                                                            to='#'
                                                                            className='avatar-group-item'
                                                                            data-bs-toggle='tooltip'
                                                                            data-bs-trigger='hover'
                                                                            data-bs-placement='top'
                                                                            title='Add Members'
                                                                        >
                                                                            <div className='avatar-xxs'>
                                                                                <div
                                                                                    className={
                                                                                        member.bgColor
                                                                                            ? 'avatar-title rounded-circle bg-' +
                                                                                              member.bgColor
                                                                                            : 'avatar-title rounded-circle bg-light border-dashed border text-primary fs-16 '
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        member.imgNumber
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    )}
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='flex-shrink-0'>
                                                    <div className='text-muted'>
                                                        <i className='ri-calendar-event-fill me-1 align-bottom'></i>{' '}
                                                        {thisProject.date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ) : thisProject?.isDesign2 ? (
                                <Col xxl={3} sm={6} className='project-card'>
                                    <Card>
                                        <CardBody>
                                            <div
                                                className={`p-3 mt-n3 mx-n3 bg-soft-${thisProject.cardHeaderClass} rounded-top`}
                                            >
                                                <div className='d-flex align-items-center'>
                                                    <div className='flex-grow-1'>
                                                        <h5 className='mb-0 fs-14'>
                                                            <Link
                                                                to='/apps-projects-overview'
                                                                className='text-dark'
                                                            >
                                                                {
                                                                    thisProject.label
                                                                }
                                                            </Link>
                                                        </h5>
                                                    </div>
                                                    <div className='flex-shrink-0'>
                                                        <div className='d-flex gap-1 align-items-center my-n2'>
                                                            <button
                                                                type='button'
                                                                className={`btn avatar-xs mt-n1 p-0 favourite-btn ${thisProject.ratingClass}`}
                                                            >
                                                                <span className='avatar-title bg-transparent fs-15'>
                                                                    <i className='ri-star-fill'></i>
                                                                </span>
                                                            </button>
                                                            <UncontrolledDropdown direction='start'>
                                                                <DropdownToggle
                                                                    tag='button'
                                                                    className='btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15'
                                                                >
                                                                    <FeatherIcon
                                                                        icon='more-horizontal'
                                                                        className='icon-sm'
                                                                    />
                                                                </DropdownToggle>

                                                                <DropdownMenu className='dropdown-menu-end'>
                                                                    <DropdownItem href='apps-projects-overview'>
                                                                        <i className='ri-eye-fill align-bottom me-2 text-muted'></i>{' '}
                                                                        View
                                                                    </DropdownItem>
                                                                    <DropdownItem href='apps-projects-create'>
                                                                        <i className='ri-pencil-fill align-bottom me-2 text-muted'></i>{' '}
                                                                        Edit
                                                                    </DropdownItem>
                                                                    <div className='dropdown-divider'></div>
                                                                    <DropdownItem
                                                                        href='#'
                                                                        data-bs-toggle='modal'
                                                                        data-bs-target='#removeProjectModal'
                                                                    >
                                                                        <i className='ri-delete-bin-fill align-bottom me-2 text-muted'></i>{' '}
                                                                        Remove
                                                                    </DropdownItem>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='py-3'>
                                                <Row className='gy-3'>
                                                    <Col xs={6}>
                                                        <div>
                                                            <p className='text-muted mb-1'>
                                                                Status
                                                            </p>
                                                            <div
                                                                className={
                                                                    'fs-12 badge badge-soft-' +
                                                                    thisProject.statusClass
                                                                }
                                                            >
                                                                {
                                                                    thisProject.status
                                                                }
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div>
                                                            <p className='text-muted mb-1'>
                                                                Deadline
                                                            </p>
                                                            <h5 className='fs-13'>
                                                                {
                                                                    thisProject.deadline
                                                                }
                                                            </h5>
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <div className='d-flex align-items-center mt-3'>
                                                    <p className='text-muted mb-0 me-2'>
                                                        Team :
                                                    </p>
                                                    <div className='avatar-group'>
                                                        {thisProject.subItem.map(
                                                            (item, key) => (
                                                                <React.Fragment
                                                                    key={key}
                                                                >
                                                                    {thisProject.imgTeam ? (
                                                                        <Link
                                                                            to='#'
                                                                            className='avatar-group-item'
                                                                            data-bs-toggle='tooltip'
                                                                            data-bs-trigger='hover'
                                                                            data-bs-placement='top'
                                                                            title='Darline Williams'
                                                                        >
                                                                            <div className='avatar-xxs'>
                                                                                <img
                                                                                    src={
                                                                                        item.imgTeam
                                                                                    }
                                                                                    alt=''
                                                                                    className='rounded-circle img-fluid'
                                                                                />
                                                                            </div>
                                                                        </Link>
                                                                    ) : (
                                                                        <Link
                                                                            to='#'
                                                                            className='avatar-group-item'
                                                                            data-bs-toggle='tooltip'
                                                                            data-bs-trigger='hover'
                                                                            data-bs-placement='top'
                                                                            title='Donna Kline'
                                                                        >
                                                                            <div className='avatar-xxs'>
                                                                                <div
                                                                                    className={
                                                                                        item.bgColor
                                                                                            ? 'avatar-title rounded-circle bg-' +
                                                                                              item.bgColor
                                                                                            : 'avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary'
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        item.imgNumber
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    )}
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='d-flex mb-2'>
                                                    <div className='flex-grow-1'>
                                                        <div>Progress</div>
                                                    </div>
                                                    <div className='flex-shrink-0'>
                                                        <div>
                                                            {
                                                                thisProject.progressBar
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='progress progress-sm animated-progess'>
                                                    <div
                                                        className='progress-bar bg-success'
                                                        role='progressbar'
                                                        aria-valuenow='50'
                                                        aria-valuemin='0'
                                                        aria-valuemax='100'
                                                        style={{
                                                            width: thisProject.progressBar,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ) : thisProject?.isDesign3 ? (
                                <Col xxl={3} sm={6} className='project-card'>
                                    <Card>
                                        <CardBody>
                                            <div
                                                className={`p-3 mt-n3 mx-n3 bg-${thisProject.cardHeaderClass} rounded-top`}
                                            >
                                                <div className='d-flex gap-1 align-items-center justify-content-end my-n2'>
                                                    <button
                                                        type='button'
                                                        className={`btn avatar-xs mt-n1 p-0 favourite-btn ${thisProject.ratingClass}`}
                                                    >
                                                        <span className='avatar-title bg-transparent fs-15'>
                                                            <i className='ri-star-fill'></i>
                                                        </span>
                                                    </button>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            tag='button'
                                                            className='btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15'
                                                        >
                                                            <FeatherIcon
                                                                icon='more-horizontal'
                                                                className='icon-sm'
                                                            />
                                                        </DropdownToggle>

                                                        <DropdownMenu className='dropdown-menu-end'>
                                                            <DropdownItem href='/apps-projects-overview'>
                                                                <i className='ri-eye-fill align-bottom me-2 text-muted'></i>{' '}
                                                                View
                                                            </DropdownItem>
                                                            <DropdownItem href='/apps-projects-create'>
                                                                <i className='ri-pencil-fill align-bottom me-2 text-muted'></i>{' '}
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                divider
                                                            />
                                                            <DropdownItem
                                                                href='#'
                                                                data-bs-toggle='modal'
                                                                data-bs-target='#removeProjectModal'
                                                            >
                                                                <i className='ri-delete-bin-fill align-bottom me-2 text-muted'></i>{' '}
                                                                Remove
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                                <div className='text-center pb-3'>
                                                    <img
                                                        src={thisProject.img}
                                                        alt=''
                                                        height='32'
                                                    />
                                                </div>
                                            </div>

                                            <div className='py-3'>
                                                <h5 className='fs-14 mb-3'>
                                                    <Link
                                                        to='/apps-projects-overview'
                                                        className='text-dark'
                                                    >
                                                        {thisProject.label}
                                                    </Link>
                                                </h5>
                                                <Row className='gy-3'>
                                                    <Col xs={6}>
                                                        <div>
                                                            <p className='text-muted mb-1'>
                                                                Status
                                                            </p>
                                                            <div
                                                                className={
                                                                    'fs-12 badge badge-soft-' +
                                                                    thisProject.statusClass
                                                                }
                                                            >
                                                                {
                                                                    thisProject.status
                                                                }
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div>
                                                            <p className='text-muted mb-1'>
                                                                Deadline
                                                            </p>
                                                            <h5 className='fs-13'>
                                                                {
                                                                    thisProject.deadline
                                                                }
                                                            </h5>
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <div className='d-flex align-items-center mt-3'>
                                                    <p className='text-muted mb-0 me-2'>
                                                        Team :
                                                    </p>
                                                    <div className='avatar-group'>
                                                        {thisProject.subItem.map(
                                                            (item, key) => (
                                                                <React.Fragment
                                                                    key={key}
                                                                >
                                                                    {thisProject.imgTeam ? (
                                                                        <Link
                                                                            to='#'
                                                                            className='avatar-group-item'
                                                                            data-bs-toggle='tooltip'
                                                                            data-bs-trigger='hover'
                                                                            data-bs-placement='top'
                                                                            title='Darline Williams'
                                                                        >
                                                                            <div className='avatar-xxs'>
                                                                                <img
                                                                                    src={
                                                                                        item.imgTeam
                                                                                    }
                                                                                    alt=''
                                                                                    className='rounded-circle img-fluid'
                                                                                />
                                                                            </div>
                                                                        </Link>
                                                                    ) : (
                                                                        <Link
                                                                            to='#'
                                                                            className='avatar-group-item'
                                                                            data-bs-toggle='tooltip'
                                                                            data-bs-trigger='hover'
                                                                            data-bs-placement='top'
                                                                            title='Donna Kline'
                                                                        >
                                                                            <div className='avatar-xxs'>
                                                                                <div
                                                                                    className={
                                                                                        item.bgColor
                                                                                            ? 'avatar-title rounded-circle bg-' +
                                                                                              item.bgColor
                                                                                            : 'avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary'
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        item.imgNumber
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    )}
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='d-flex mb-2'>
                                                    <div className='flex-grow-1'>
                                                        <div>Tasks</div>
                                                    </div>
                                                    <div className='flex-shrink-0'>
                                                        <div>
                                                            <i className='ri-list-check align-bottom me-1 text-muted'></i>{' '}
                                                            {thisProject.number}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='progress progress-sm animated-progess'>
                                                    <div
                                                        className='progress-bar bg-success'
                                                        role='progressbar'
                                                        aria-valuenow='71'
                                                        aria-valuemin='0'
                                                        aria-valuemax='100'
                                                        style={{
                                                            width: thisProject.progressBar,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ) : null}
                        </React.Fragment>
                    );
                })}
            </div>
            <Row className='g-0 text-center text-sm-start align-items-center mb-4'>
                <Col sm={6}>
                    <div>
                        <p className='mb-sm-0 text-muted'>
                            Showing <span className='fw-semibold'>1</span> to{' '}
                            <span className='fw-semibold'>5</span> of{' '}
                            <span className='fw-semibold text-decoration-underline'>
                                5
                            </span>{' '}
                            entries
                        </p>
                    </div>
                </Col>

                <Col sm={6}>
                    <ul className='pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0'>
                        <li className='page-item disabled'>
                            <Link to='#' className='page-link'>
                                Previous
                            </Link>
                        </li>
                        <li className='page-item active'>
                            <Link to='#' className='page-link'>
                                1
                            </Link>
                        </li>
                        <li className='page-item'>
                            <Link to='#' className='page-link'>
                                Next
                            </Link>
                        </li>
                    </ul>
                </Col>
            </Row>
            {isProjectUpdated ? (
                <MsgToastCentered
                    msg='Project Updated Successfully'
                    color='success'
                    icon='ri-checkbox-circle-line'
                />
            ) : null}
            {isProjectAdded ? (
                <MsgToastCentered
                    msg='Project Added Successfully'
                    color='success'
                    icon='ri-checkbox-circle-line'
                />
            ) : null}
            {isProjectDeleted ? (
                <MsgToastCentered
                    msg='Project Deleted Successfully'
                    color='success'
                    icon='ri-checkbox-circle-line'
                />
            ) : null}
            {isProjectUpdateFail ? (
                <MsgToastCentered
                    msg='Project Update Failed'
                    color='danger'
                    icon='ri-error-warning-line'
                />
            ) : null}
            {isProjectAddFail ? (
                <MsgToastCentered
                    msg='Project Creation Failed'
                    color='danger'
                    icon='ri-error-warning-line'
                />
            ) : null}
            {isProjectDeleteFail ? (
                <MsgToastCentered
                    msg='Project Deletion Failed'
                    color='danger'
                    icon='ri-error-warning-line'
                />
            ) : null}
            <ToastContainer limit={1} closeButton={false} />
        </React.Fragment>
    );
};

export default List;
