// import { useWhatChanged } from '@simbathesailor/use-what-changed';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
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
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    UncontrolledDropdown,
} from 'reactstrap';

import { v4 as uuidv4 } from 'uuid';

//redux
import { useSelector, useDispatch } from 'react-redux';
// import { getDatasetList } from '../../store/actions';
import TableContainer from '../../Components/Common/TableContainer';
import {
    getDatasetList,
    addNewDataset,
    updateDataset,
    deleteDataset,
    resetDatasetFlag,
} from '../../store/actions';

import {
    Name,
    Owner,
    UploadDate,
    Type,
    Status,
    Access,
    HasAnnotations,
} from './DatasetsCols';

//Import Flatepicker
import Flatpickr from 'react-flatpickr';

import { isEmpty } from 'lodash';

// Formik
import * as Yup from 'yup';
import { useFormik } from 'formik';

import DeleteModal from '../../Components/Common/DeleteModal';
import DownloadModal from './DownloadModal';
import EditDatasetModal from './EditDatasetModal';

import { toast, ToastContainer } from 'react-toastify';
import MsgToast from '../../Components/Common/MsgToast';
import MsgToastCentered from '../../Components/Common/MsgToastCentered';

import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Components/Common/Loader';

const DatasetsList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDatasetList());
    }, [dispatch]);

    const {
        datasetList,
        isDatasetSuccess,
        error,
        isDatasetAdded,
        isDatasetAddFail,
        isDatasetDeleted,
        isDatasetDeleteFail,
        isDatasetUpdated,
        isDatasetUpdateFail,
    } = useSelector(state => ({
        datasetList: state.Datasets.datasetList,
        isDatasetSuccess: state.Datasets.isDatasetSuccess,
        error: state.Datasets.error,
        isDatasetAdded: state.Datasets.isDatasetAdded,
        isDatasetAddFail: state.Datasets.isDatasetAddFail,
        isDatasetDeleted: state.Datasets.isDatasetDeleted,
        isDatasetDeleteFail: state.Datasets.isDatasetDeleteFail,
        isDatasetUpdated: state.Datasets.isDatasetUpdated,
        isDatasetUpdateFail: state.Datasets.isDatasetUpdateFail,
    }));

    // useWhatChanged(
    //     [
    //         dispatch,
    //         isDatasetSuccess,
    //         error,
    //         isDatasetAdded,
    //         isDatasetAddFail,
    //         isDatasetDeleted,
    //         isDatasetDeleteFail,
    //         isDatasetUpdated,
    //         isDatasetUpdateFail,
    //     ],
    //     'dispatch, isDatasetSuccess, error, isDatasetAdded, isDatasetAddFail, isDatasetDeleted, isDatasetDeleteFail, isDatasetUpdated, isDatasetUpdateFail'
    // );

    // uwc-debug
    useEffect(() => {
        // console.log('something changed , need to figure out what');
        setTimeout(() => {
            dispatch(resetDatasetFlag());
        }, 3000);
    }, [
        dispatch,
        isDatasetSuccess,
        error,
        isDatasetAdded,
        isDatasetAddFail,
        isDatasetDeleted,
        isDatasetDeleteFail,
        isDatasetUpdated,
        isDatasetUpdateFail,
    ]);

    const [isEdit, setIsEdit] = useState(false);
    const [dataset, setDataset] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [downloadModal, setDownloadModal] = useState(false);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setDataset(null);
        } else {
            setModal(true);
            // setcreDate(dateFormat());
            // setdueDate(dateFormat());
        }
    }, [modal]);

    // validation
    const formik = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (dataset && dataset.id) || '',
            name: (dataset && dataset.name) || '',
            description: (dataset && dataset.description) || '',
            type: (dataset && dataset.type) || '',
            access: (dataset && dataset.access) || '',
            hasAnnotations: (dataset && dataset.hasAnnotations) || '',
        },
        validationSchema: Yup.object({
            id: Yup.string().required('Please Enter id'),
            name: Yup.string().required('Please Enter Name'),
            description: Yup.string().required('Please Enter Description'),
            type: Yup.string().required('Please Enter Type'),
            access: Yup.string().required('Please Enter Access'),
            hasAnnotations: Yup.string().required('Please Select Yes or No'),
        }),
        onSubmit: values => {
            if (isEdit) {
                const updateDatasets = {
                    _id: dataset ? dataset._id : 0,
                    datasetId: values.datasetId,
                    name: values.name,
                    description: values.description,
                    status: dataset.status,
                    type: values.type,
                    access: values.access,
                    hasAnnotations: values.hasAnnotations,
                };
                // update ticket
                dispatch(updateDataset(updateDatasets));
                formik.resetForm();
            } else {
                const newDataset = {
                    _id: (
                        Math.floor(Math.random() * (30 - 20)) + 20
                    ).toString(),
                    id: values['id'],
                    datasetId: values['datasetId'],
                    name: values['name'],
                    description: values['description'],
                    type: values['type'],
                    status: dataset['status'],
                    access: values['access'],
                    hasAnnotations: values['hasAnnotations'],
                };
                // save new ticket
                dispatch(addNewDataset(newDataset));
                formik.resetForm();
            }
            toggle();
        },
    });

    // Delete Dataset
    const onClickDelete = dataset => {
        setDataset(dataset);
        setDeleteModal(true);
    };

    const handleDeleteDataset = () => {
        if (dataset) {
            dispatch(deleteDataset(dataset._id));
            setDeleteModal(false);
        }
    };

    const onClickDownload = dataset => {
        setDataset(dataset);
        setDownloadModal(true);
    };

    const handleDownloadDatasetClick = () => {
        if (dataset) {
            setDownloadModal(false);
        }
    };

    // Handle Click on Edit (pencil) icon
    const handleEditDatasetClick = useCallback(
        arg => {
            const thisDataset = arg;

            setDataset({
                _id: thisDataset._id,
                id: thisDataset.id,
                name: thisDataset.name,
                description: thisDataset.description,
                type: thisDataset.type,
                status: thisDataset.status,
                access: thisDataset.access,
                hasAnnotations: thisDataset.hasAnnotations,
            });

            setIsEdit(true);
            toggle();
        },
        [toggle]
    );

    const onClickCopyDataset = useCallback(
        dataset => {
            dispatch(
                addNewDataset({
                    ...dataset,
                    name: `Copy of ${dataset.name}`,
                    _id: uuidv4(),
                })
            );
        },
        [dispatch]
    );

    const columns = useMemo(
        () => [
            // {
            //     Header: '#',
            //     Cell: () => {
            //         return <Input type='checkbox' />;
            //     },
            // },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: false,
                Cell: cellProps => {
                    return <Name {...cellProps} />;
                },
            },
            {
                Header: 'Description',
                accessor: 'description',
                filterable: false,
                Cell: cellProps => {
                    return null;
                },
            },
            {
                Header: 'Owner',
                accessor: 'owner',
                filterable: false,
                Cell: cellProps => {
                    return <Owner {...cellProps} />;
                },
            },
            {
                Header: 'Upload Date',
                accessor: 'uploadDate',
                filterable: false,
                Cell: cellProps => {
                    return <UploadDate {...cellProps} />;
                },
            },
            {
                Header: 'Type',
                accessor: 'type',
                filterable: false,
                Cell: cellProps => {
                    return <Type {...cellProps} />;
                },
            },
            {
                Header: 'Status',
                accessor: 'status',
                filterable: false,
                Cell: cellProps => {
                    return <Status {...cellProps} />;
                },
            },
            {
                Header: 'Access',
                accessor: 'access',
                filterable: false,
                Cell: cellProps => {
                    return <Access {...cellProps} />;
                },
            },
            {
                Header: 'Has Annotations',
                accessor: 'hasAnnotations',
                filterable: false,
                Cell: cellProps => {
                    return <HasAnnotations {...cellProps} />;
                },
            },
            {
                Header: 'Actions',
                Cell: cellProps => {
                    return (
                        <React.Fragment>
                            <div className='dataset-action-icons'>
                                <div
                                    onClick={() => {
                                        const datasetData =
                                            cellProps.row.original;

                                        onClickDownload(datasetData);
                                    }}
                                    className='mdi mdi-download-outline fs-20 blue-200-icon clickable-icon'
                                ></div>
                                <div
                                    onClick={() => {
                                        const datasetData =
                                            cellProps.row.original;

                                        handleEditDatasetClick(datasetData);
                                    }}
                                    className='mdi mdi-lead-pencil blue-200-icon fs-18 clickable-icon'
                                ></div>
                                <div
                                    onClick={() => {
                                        const datasetData =
                                            cellProps.row.original;

                                        onClickCopyDataset(datasetData);
                                    }}
                                    className='mdi mdi-content-copy blue-200-icon fs-16 clickable-icon'
                                ></div>
                                <div
                                    onClick={() => {
                                        const datasetData =
                                            cellProps.row.original;
                                        onClickDelete(datasetData);
                                    }}
                                    className='mdi mdi-delete-outline text-danger fs-20 clickable-icon'
                                ></div>
                            </div>
                        </React.Fragment>
                    );
                },
            },
        ],
        [handleEditDatasetClick, onClickCopyDataset]
    );

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
        <React.Fragment>
            <Row>
                <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDeleteDataset}
                    onCloseClick={() => setDeleteModal(false)}
                />
                <Col lg={12}>
                    <Card>
                        <CardHeader className='border-0'>
                            <div className='d-flex align-items-center'>
                                <h5 className='card-title mb-0 flex-grow-1'>
                                    Uploaded Datasets
                                </h5>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <TableContainer
                                columns={columns}
                                data={datasetList || []}
                                isGlobalFilter={false}
                                isAddUserList={false}
                                customPageSize={8}
                                className='custom-header-css'
                                divClass='table-responsive table-card mb-4'
                                tableClass='align-middle table-nowrap mb-0'
                                theadClass=''
                                thClass=''
                                // handleTicketClick={handleDatasetsClick}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <EditDatasetModal
                show={modal}
                dataset={dataset}
                toggle={toggle}
                setModal={setModal}
                onCancelClick={() => {
                    toggle();
                }}
            />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteDataset}
                onCloseClick={() => setDeleteModal(false)}
                text={`Ready to delete dataset: ${dataset?.name}`}
            />
            <DownloadModal
                show={downloadModal}
                onConfirmClick={handleDownloadDatasetClick}
                onCancelClick={() => setDownloadModal(false)}
                text={`Dataset: ${dataset?.name}`}
            ></DownloadModal>{' '}
            {isDatasetUpdated ? (
                <MsgToastCentered
                    msg='Dataset Updated Successfully'
                    color='success'
                    icon='ri-checkbox-circle-line'
                />
            ) : null}
            {isDatasetAdded ? (
                <MsgToastCentered
                    msg='Dataset Added Successfully'
                    color='success'
                    icon='ri-checkbox-circle-line'
                />
            ) : null}
            {isDatasetDeleted ? (
                <MsgToastCentered
                    msg='Dataset Deleted Successfully'
                    color='success'
                    icon='ri-checkbox-circle-line'
                />
            ) : null}
            {isDatasetUpdateFail ? (
                <MsgToastCentered
                    msg='Dataset Update Failed'
                    color='danger'
                    icon='ri-error-warning-line'
                />
            ) : null}
            {isDatasetAddFail ? (
                <MsgToastCentered
                    msg='Dataset Creation Failed'
                    color='danger'
                    icon='ri-error-warning-line'
                />
            ) : null}
            {isDatasetDeleteFail ? (
                <MsgToastCentered
                    msg='Dataset Deletion Failed'
                    color='danger'
                    icon='ri-error-warning-line'
                />
            ) : null}
            <ToastContainer limit={1} closeButton={false} />
        </React.Fragment>
    );
};

export default DatasetsList;
