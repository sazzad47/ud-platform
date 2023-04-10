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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    UncontrolledDropdown,
} from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
// import { getDatasetList, resetDatasetFlag } from '../../../store/actions';
import { isEmpty } from 'lodash';

//import images
import leftsidebar from '../../../assets/images/projects/project-left-sidebar.jpg';
import urbanmappingmain from '../../../assets/images/projects/urban-mapping-main.jpg';
import rightsidebartop from '../../../assets/images/projects/project-right-sidebar-top.png';
import projectcontrols from '../../../assets/images/projects/project-controls.jpg';
import projecttimeline from '../../../assets/images/projects/project-activity-chart.png';
import urbanmappinobj001 from '../../../assets/images/projects/urban-mapping-object-001.png';
import urbanmappinobj002 from '../../../assets/images/projects/urban-mapping-object-002.png';
import urbanmappinobj003 from '../../../assets/images/projects/urban-mapping-object-003.png';

const MainTab = ({ project_id }) => {
    const [imageModalIsVisible, setImageModalIsVisible] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    const { projectList } = useSelector(state => ({
        projectList: state.Projects.projectList,
    }));

    const matchedProjectList = projectList.filter(
        project => project._id === project_id
    );

    const project =
        matchedProjectList.length > 0 ? matchedProjectList[0] : null;

    const onObjectImageClick = image => {
        // console.log('I am here, clicking on Object Image');
        setModalImage(image);
        setImageModalIsVisible(true);
    };

    const closeImageModal = () => {
        setImageModalIsVisible(false);
    };

    return (
        <React.Fragment>
            {/* Image Modal for Object Images */}
            <Modal
                isOpen={imageModalIsVisible}
                toggle={closeImageModal}
                centered={true}
                size='md'
                className='detected-object-image-modal h-60'
                // contentClassName='h-75'
                // className='detected-object-image-modal h-75 min-vh-75'
            >
                <ModalHeader
                    toggle={closeImageModal}
                    className='p-3 bg-soft-info'
                >
                    Detected Object Close-up
                </ModalHeader>
                <ModalBody className='py-3 px-5'>
                    <img src={modalImage} alt='' />
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    <Button color='primary' onClick={closeImageModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
            {project && (
                <div>
                    <Row className='no-gutters'>
                        <Col lg={2}>
                            <img
                                src={leftsidebar}
                                className='me-1 img-fluid'
                                alt='left sidebar'
                            />
                        </Col>
                        <Col lg={8}>
                            <img
                                src={project.mainImage}
                                className='me-1 img-fluid'
                                alt='main view'
                            />
                            <img
                                src={projectcontrols}
                                className='me-3 img-fluid w-100'
                                alt='project controls'
                            />
                        </Col>
                        <Col lg={2}>
                            {' '}
                            <img
                                src={rightsidebartop}
                                className='me-1 img-fluid mb-3'
                                alt='right sidebar top'
                            />
                            {/* <div className='d-flex flex-wrap justify-content-between'> */}
                            <div className='d-flex flex-wrap'>
                                {project.smallImages &&
                                    project.smallImages.map(image => (
                                        <img
                                            onClick={() =>
                                                onObjectImageClick(image)
                                            }
                                            key={image}
                                            src={image}
                                            className='m-20 img-fluid rounded avatar-sm'
                                            alt='urban mapping object 001'
                                        />
                                    ))}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <img
                            src={projecttimeline}
                            className='me-1 img-fluid mt-3'
                            alt='left sidebar'
                        />
                    </Row>
                </div>
            )}
        </React.Fragment>
    );
};

export default MainTab;

// TO BE DELETED - KEPT FOR NOW IN CASE THIS IS REQUIRED

// useEffect(() => {
//     setTimeout(() => {
//         dispatch(resetDatasetFlag());
//     }, 3000);
// }, [dispatch]);

// const [allDatasets, setAllDatasets] = useState([]);

// console.log({ datasetList });
// console.log({ allDatasets });

// useEffect(() => {
//     dispatch(getDatasetList());
// }, [dispatch]);

// useEffect(() => {
//     if (datasetList && !datasetList.length) {
//         dispatch(getDatasetList());
//     }
// }, [dispatch, datasetList]);

// useEffect(() => {
//     setAllDatasets(datasetList);
// }, [datasetList]);

// useEffect(() => {
//     if (!isEmpty(datasetList)) setAllDatasets(datasetList);
// }, [datasetList]);

// const handleLinkDatasetConfirmClick = () => {
//     console.log('Confirm LINK DATASET has been clicked');
//     setShowLinkDataSetModal(false);
// };
