import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    UncontrolledDropdown,
} from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
// import { useSelector, useDispatch, connect } from 'react-redux';

import {
    getDatasetList,
    updateProject,
    resetProjectFlag,
} from '../../../store/actions';
import { isEmpty } from 'lodash';

import LinkDatasetModal from './LinkDatasetModal';

const SettingsTab = ({ project_id }) => {
    // console.log('SettingsTab -------->>>>>>');
    // console.log({ project_id });
    // const { project, projectList } = props;

    // console.log({ projectList });

    const [showLinkDatasetModal, setShowLinkDataSetModal] = useState(false);
    const [allDatasets, setAllDatasets] = useState([]);
    // Juan Guirao
    // This (localProjectList) is added force re-render when Redux projectList changes
    const [localProjectList, setLocalProjectList] = useState([]);

    const dispatch = useDispatch();
    const {
        datasetList,
        projectList,
        isProjectSuccess,
        error,
        isProjectUpdated,
        isProjectUpdateFailed,
    } = useSelector(state => ({
        datasetList: state.Datasets.datasetList,
        projectList: state.Projects.projectList,
        isProjectSuccess: state.Projects.isProjectSuccess,
        error: state.Projects.error,
        isProjectUpdated: state.Projects.isProjectUpdated,
        isProjectUpdateFailed: state.Projects.isProjectUpdateFailed,
    }));

    const matchedProjectList = projectList.filter(
        project => project._id === project_id
    );

    const project =
        matchedProjectList.length > 0 ? matchedProjectList[0] : null;

    const datasetSelection = project.datasets ? project.datasets : [];

    // const [datasetSelection, setDatasetSelection] = useState(
    //     project.datasets ? project.datasets : []
    // );

    useEffect(() => {
        setTimeout(() => {
            // console.log(
            //     '>>>> !!!! Executing useEffect setTimeout resetDatasetFlag'
            // );
            // console.log('isProjectUpdated', isProjectUpdated);
            dispatch(resetProjectFlag());
        }, 3000);
    }, [
        dispatch,
        isProjectSuccess,
        error,
        isProjectUpdated,
        isProjectUpdateFailed,
    ]);

    useEffect(() => {
        // console.log('inside useEffect - dependency projectList');
        setLocalProjectList(projectList);
    }, [projectList]);

    // console.log({ datasetList });
    // console.log({ allDatasets });

    useEffect(() => {
        dispatch(getDatasetList());
    }, [dispatch]);

    useEffect(() => {
        if (datasetList && !datasetList.length) {
            dispatch(getDatasetList());
        }
    }, [dispatch, datasetList]);

    useEffect(() => {
        setAllDatasets(datasetList);
    }, [datasetList]);

    useEffect(() => {
        if (!isEmpty(datasetList)) setAllDatasets(datasetList);
    }, [datasetList]);

    const onLinkDatasetClick = () => {
        // console.log('I am here, clicking on Link Dataset');
        setShowLinkDataSetModal(true);
    };

    const updateProjectDatasetsAndCloseModal = newDatasetSelection => {
        // console.log('Confirm LINK DATASET has been clicked');
        setShowLinkDataSetModal(false);
        const updatedProject = { ...project, datasets: newDatasetSelection };
        // console.log('----- in handleLinkDatasetConfirmClick -----');
        // console.log({ project });
        // console.log({ newDatasetSelection });
        // console.log({ updatedProject });
        dispatch(updateProject(updatedProject));
    };

    return (
        <React.Fragment>
            <LinkDatasetModal
                show={showLinkDatasetModal}
                updateProjectDatasetsAndCloseModal={
                    updateProjectDatasetsAndCloseModal
                }
                onCancelClick={() => setShowLinkDataSetModal(false)}
                project={project}
                allDatasets={allDatasets}
                // datasetSelection={datasetSelection}
            ></LinkDatasetModal>
            <Row>
                <Col xl={12} lg={12}>
                    <Card>
                        <CardBody>
                            <h5 className='mb-4 text-uppercase'>Settings</h5>
                            <div className='text-muted'>
                                <h6 className='mb-3 text-uppercase'>Summary</h6>
                                <p>{project.caption}</p>

                                <div className='pt-3 border-top border-top-dashed mt-4'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h6 className='mb-3 fw-semibold text-uppercase'>
                                            Datasets
                                        </h6>

                                        <div className='col-sm-auto mb-2'>
                                            <div>
                                                <Button
                                                    onClick={onLinkDatasetClick}
                                                    className='btn btn-success'
                                                >
                                                    <i className='ri-add-line align-bottom me-1'></i>{' '}
                                                    Link Dataset
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    {(!datasetSelection ||
                                        datasetSelection.length === 0) && (
                                        <div>
                                            <Row className='g-3'>
                                                <Col xxl={12} lg={12}>
                                                    <div className='border rounded border-dashed p-2'>
                                                        <div className='d-flex align-items-center'>
                                                            <div className='flex-grow-1 overflow-hidden'>
                                                                <h5 className='fs-13 mb-1'>
                                                                    No dataset
                                                                    linked
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}

                                    {allDatasets &&
                                        allDatasets.length &&
                                        datasetSelection && (
                                            <Row className='g-3'>
                                                {datasetSelection.map(
                                                    datasetId => {
                                                        return (
                                                            <div
                                                                key={datasetId}
                                                            >
                                                                <Col
                                                                    xxl={12}
                                                                    lg={12}
                                                                >
                                                                    <div className='border rounded border-dashed p-2'>
                                                                        <div className='d-flex align-items-center'>
                                                                            <div className='flex-shrink-0 me-3'>
                                                                                <div className='avatar-sm'>
                                                                                    <div className='avatar-title bg-light text-secondary rounded fs-24'>
                                                                                        <i className='ri-folder-zip-line'></i>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='flex-grow-1 overflow-hidden'>
                                                                                <h5 className='fs-13 mb-1'>
                                                                                    {/* <Link
                                                                                        to='#'
                                                                                        className='text-body text-truncate d-block'
                                                                                    > */}
                                                                                    {
                                                                                        allDatasets.filter(
                                                                                            dataset =>
                                                                                                dataset.id ===
                                                                                                datasetId
                                                                                        )[0]
                                                                                            .name
                                                                                    }
                                                                                    {/* </Link> */}
                                                                                </h5>
                                                                                <div>
                                                                                    2.2MB
                                                                                </div>
                                                                            </div>
                                                                            <div className='flex-shrink-0 ms-2'>
                                                                                <div className='d-flex gap-1'>
                                                                                    <button
                                                                                        type='button'
                                                                                        className='btn btn-icon text-muted btn-sm fs-18'
                                                                                    >
                                                                                        <i className='ri-download-2-line'></i>
                                                                                    </button>
                                                                                    <UncontrolledDropdown>
                                                                                        <DropdownToggle
                                                                                            tag='button'
                                                                                            className='btn btn-icon text-muted btn-sm fs-18 dropdown'
                                                                                        >
                                                                                            <i className='ri-more-fill'></i>
                                                                                        </DropdownToggle>
                                                                                        <DropdownMenu>
                                                                                            <li>
                                                                                                <DropdownItem>
                                                                                                    <i className='ri-pencil-fill align-bottom me-2 text-muted'></i>{' '}
                                                                                                    Rename
                                                                                                </DropdownItem>
                                                                                            </li>
                                                                                            <li>
                                                                                                <DropdownItem>
                                                                                                    <i className='ri-delete-bin-fill align-bottom me-2 text-muted'></i>{' '}
                                                                                                    Delete
                                                                                                </DropdownItem>
                                                                                            </li>
                                                                                        </DropdownMenu>
                                                                                    </UncontrolledDropdown>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </Row>
                                        )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className='align-items-center d-flex border-bottom-dashed'>
                            <h4 className='card-title mb-0 flex-grow-1'>
                                Workflows
                            </h4>
                            <div className='flex-shrink-0'>
                                <button
                                    type='button'
                                    className='btn btn-soft-info btn-sm'
                                >
                                    <i className='ri-upload-2-fill me-1 align-bottom'></i>{' '}
                                    Upload
                                </button>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <div className='vstack gap-2'>
                                <div className='border rounded border-dashed p-2'>
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-shrink-0 me-3'>
                                            <div className='avatar-sm'>
                                                <div className='avatar-title bg-light text-secondary rounded fs-24'>
                                                    <i className='ri-folder-zip-line'></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex-grow-1 overflow-hidden'>
                                            <h5 className='fs-13 mb-1'>
                                                <Link
                                                    to='#'
                                                    className='text-body text-truncate d-block'
                                                >
                                                    App-pages.zip
                                                </Link>
                                            </h5>
                                            <div>2.2MB</div>
                                        </div>
                                        <div className='flex-shrink-0 ms-2'>
                                            <div className='d-flex gap-1'>
                                                <button
                                                    type='button'
                                                    className='btn btn-icon text-muted btn-sm fs-18'
                                                >
                                                    <i className='ri-download-2-line'></i>
                                                </button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        tag='button'
                                                        className='btn btn-icon text-muted btn-sm fs-18 dropdown'
                                                        type='button'
                                                    >
                                                        <i className='ri-more-fill'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li>
                                                            <DropdownItem>
                                                                <i className='ri-pencil-fill align-bottom me-2 text-muted'></i>{' '}
                                                                Rename
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem>
                                                                <i className='ri-delete-bin-fill align-bottom me-2 text-muted'></i>{' '}
                                                                Delete
                                                            </DropdownItem>
                                                        </li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='border rounded border-dashed p-2'>
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-shrink-0 me-3'>
                                            <div className='avatar-sm'>
                                                <div className='avatar-title bg-light text-secondary rounded fs-24'>
                                                    <i className='ri-file-ppt-2-line'></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex-grow-1 overflow-hidden'>
                                            <h5 className='fs-13 mb-1'>
                                                <Link
                                                    to='#'
                                                    className='text-body text-truncate d-block'
                                                >
                                                    Velzon-admin.ppt
                                                </Link>
                                            </h5>
                                            <div>2.4MB</div>
                                        </div>
                                        <div className='flex-shrink-0 ms-2'>
                                            <div className='d-flex gap-1'>
                                                <button
                                                    type='button'
                                                    className='btn btn-icon text-muted btn-sm fs-18'
                                                >
                                                    <i className='ri-download-2-line'></i>
                                                </button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        tag='button'
                                                        className='btn btn-icon text-muted btn-sm fs-18 dropdown'
                                                        type='button'
                                                    >
                                                        <i className='ri-more-fill'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li>
                                                            <DropdownItem>
                                                                <i className='ri-pencil-fill align-bottom me-2 text-muted'></i>{' '}
                                                                Rename
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem>
                                                                <i className='ri-delete-bin-fill align-bottom me-2 text-muted'></i>{' '}
                                                                Delete
                                                            </DropdownItem>
                                                        </li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='border rounded border-dashed p-2'>
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-shrink-0 me-3'>
                                            <div className='avatar-sm'>
                                                <div className='avatar-title bg-light text-secondary rounded fs-24'>
                                                    <i className='ri-folder-zip-line'></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex-grow-1 overflow-hidden'>
                                            <h5 className='fs-13 mb-1'>
                                                <Link
                                                    to='#'
                                                    className='text-body text-truncate d-block'
                                                >
                                                    Images.zip
                                                </Link>
                                            </h5>
                                            <div>1.2MB</div>
                                        </div>
                                        <div className='flex-shrink-0 ms-2'>
                                            <div className='d-flex gap-1'>
                                                <button
                                                    type='button'
                                                    className='btn btn-icon text-muted btn-sm fs-18'
                                                >
                                                    <i className='ri-download-2-line'></i>
                                                </button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        tag='button'
                                                        className='btn btn-icon text-muted btn-sm fs-18 dropdown'
                                                        type='button'
                                                    >
                                                        <i className='ri-more-fill'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li>
                                                            <DropdownItem>
                                                                <i className='ri-pencil-fill align-bottom me-2 text-muted'></i>{' '}
                                                                Rename
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem>
                                                                <i className='ri-delete-bin-fill align-bottom me-2 text-muted'></i>{' '}
                                                                Delete
                                                            </DropdownItem>
                                                        </li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='border rounded border-dashed p-2'>
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-shrink-0 me-3'>
                                            <div className='avatar-sm'>
                                                <div className='avatar-title bg-light text-secondary rounded fs-24'>
                                                    <i className='ri-image-2-line'></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex-grow-1 overflow-hidden'>
                                            <h5 className='fs-13 mb-1'>
                                                <Link
                                                    to='#'
                                                    className='text-body text-truncate d-block'
                                                >
                                                    bg-pattern.png
                                                </Link>
                                            </h5>
                                            <div>1.1MB</div>
                                        </div>
                                        <div className='flex-shrink-0 ms-2'>
                                            <div className='d-flex gap-1'>
                                                <button
                                                    type='button'
                                                    className='btn btn-icon text-muted btn-sm fs-18'
                                                >
                                                    <i className='ri-download-2-line'></i>
                                                </button>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        tag='button'
                                                        className='btn btn-icon text-muted btn-sm fs-18 dropdown'
                                                        type='button'
                                                    >
                                                        <i className='ri-more-fill'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <li>
                                                            <DropdownItem>
                                                                <i className='ri-pencil-fill align-bottom me-2 text-muted'></i>{' '}
                                                                Rename
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem>
                                                                <i className='ri-delete-bin-fill align-bottom me-2 text-muted'></i>{' '}
                                                                Delete
                                                            </DropdownItem>
                                                        </li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SettingsTab;

// const mapStateToProps = state => {
//     return {
//         projectList: state.Projects.projectList,
//     };
// };

// export default connect(mapStateToProps)(SettingsTab);
