import React, { useState } from 'react';
import {
    Card,
    CardBody,
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from 'reactstrap';
import classnames from 'classnames';

import { useSelector } from 'react-redux';

//import images
import MainTab from './MainTab';
import SettingsTab from './SettingsTab';
import EditTab from './EditTab';
import TrainTab from './TrainTab';
import ObjectsTab from './ObjectsTab';
import AnalyzeTab from './AnalyzeTab';
import { useEffect } from 'react';

const Section = ({ project_id }) => {
    //Tab
    const [activeTab, setActiveTab] = useState('1');

    const { projectList } = useSelector(state => ({
        projectList: state.Projects.projectList,
    }));

    const matchedProjectList = projectList.filter(
        project => project._id === project_id
    );

    const project =
        matchedProjectList.length > 0 ? matchedProjectList[0] : null;

    const toggleTab = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <React.Fragment>
            {project && (
                <div>
                    <Row>
                        <Col lg={12}>
                            <Card className='mt-n4 mx-n4'>
                                <div className='bg-soft-warning'>
                                    <CardBody className='pb-0 px-4'>
                                        <Row className='mb-3'>
                                            <div className='col-md'>
                                                <Row className='align-items-center g-3'>
                                                    <div className='col-md-auto'>
                                                        <div className='avatar-md'>
                                                            <div className='avatar-title bg-white rounded-circle'>
                                                                <img
                                                                    src={
                                                                        project.img
                                                                    }
                                                                    alt=''
                                                                    className='avatar-md project-thumbnail-round'
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md'>
                                                        <div>
                                                            <h4 className='fw-bold'>
                                                                {project.label}
                                                            </h4>
                                                            <div className='hstack gap-3 flex-wrap'>
                                                                <div>
                                                                    Owner:{' '}
                                                                    <span className='fw-medium'>
                                                                        John Doe
                                                                    </span>
                                                                </div>
                                                                <div className='vr'></div>
                                                                <div>
                                                                    Created:{' '}
                                                                    <span className='fw-medium'>
                                                                        15 Jun,
                                                                        2022
                                                                    </span>
                                                                </div>
                                                                <div className='vr'></div>
                                                                <div>
                                                                    Status:{' '}
                                                                    <span className='fw-medium'>
                                                                        In
                                                                        Progress
                                                                    </span>
                                                                </div>

                                                                {/* <div>
                                                            Due Date :{' '}
                                                            <span className='fw-medium'>
                                                                29 Dec, 2022
                                                            </span>
                                                        </div> */}
                                                                {/* <div className='vr'></div> */}
                                                                {/* <div className='badge rounded-pill bg-info fs-12'>
                                                            New
                                                        </div>
                                                        <div className='badge rounded-pill bg-danger fs-12'>
                                                            High
                                                        </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </div>
                                            <div className='col-md-auto'>
                                                <div className='hstack gap-1 flex-wrap'>
                                                    <button
                                                        type='button'
                                                        className='btn py-0 fs-16 favourite-btn active'
                                                    >
                                                        <i className='ri-star-fill'></i>
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn py-0 fs-16 text-body'
                                                    >
                                                        <i className='ri-share-line'></i>
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn py-0 fs-16 text-body'
                                                    >
                                                        <i className='ri-flag-line'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </Row>

                                        <Nav
                                            className='nav-tabs-custom border-bottom-0'
                                            role='tablist'
                                        >
                                            <NavItem>
                                                <NavLink
                                                    className={classnames(
                                                        {
                                                            active:
                                                                activeTab ===
                                                                '1',
                                                        },
                                                        'text-body fw-semibold'
                                                    )}
                                                    onClick={() => {
                                                        toggleTab('1');
                                                    }}
                                                    href='#'
                                                >
                                                    Main
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames(
                                                        {
                                                            active:
                                                                activeTab ===
                                                                '2',
                                                        },
                                                        'text-body fw-semibold'
                                                    )}
                                                    onClick={() => {
                                                        toggleTab('2');
                                                    }}
                                                    href='#'
                                                >
                                                    Settings
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames(
                                                        {
                                                            active:
                                                                activeTab ===
                                                                '3',
                                                        },
                                                        'text-body fw-semibold'
                                                    )}
                                                    onClick={() => {
                                                        toggleTab('3');
                                                    }}
                                                    href='#'
                                                >
                                                    Edit
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames(
                                                        {
                                                            active:
                                                                activeTab ===
                                                                '4',
                                                        },
                                                        'text-body fw-semibold'
                                                    )}
                                                    onClick={() => {
                                                        toggleTab('4');
                                                    }}
                                                    href='#'
                                                >
                                                    Train
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames(
                                                        {
                                                            active:
                                                                activeTab ===
                                                                '5',
                                                        },
                                                        'text-body fw-semibold'
                                                    )}
                                                    onClick={() => {
                                                        toggleTab('5');
                                                    }}
                                                    href='#'
                                                >
                                                    Objects
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames(
                                                        {
                                                            active:
                                                                activeTab ===
                                                                '6',
                                                        },
                                                        'text-body fw-semibold'
                                                    )}
                                                    onClick={() => {
                                                        toggleTab('6');
                                                    }}
                                                    href='#'
                                                >
                                                    Analyze
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </CardBody>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <TabContent
                                activeTab={activeTab}
                                className='text-muted'
                            >
                                <TabPane tabId='1'>
                                    <MainTab project_id={project_id} />
                                </TabPane>
                                <TabPane tabId='2'>
                                    <SettingsTab project_id={project_id} />
                                </TabPane>
                                <TabPane tabId='3'>
                                    <EditTab />
                                </TabPane>
                                <TabPane tabId='4'>
                                    <TrainTab />
                                </TabPane>
                                <TabPane tabId='5'>
                                    <ObjectsTab />
                                </TabPane>
                                <TabPane tabId='6'>
                                    <AnalyzeTab />
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </div>
            )}
            {!project && (
                <div>
                    <Row>
                        <Col lg={12}>
                            <Card className='mt-n4 mx-n4'>
                                <div className='bg-soft-warning'>
                                    <CardBody className='pb-0 px-4'>
                                        <Row className='mb-3'>
                                            <div className='col-md'>
                                                <Row className='align-items-center g-3'>
                                                    <div className='col-md'>
                                                        <div>
                                                            <h4 className='fw-bold'>
                                                                Project Not
                                                                Found
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </div>
                                        </Row>
                                    </CardBody>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </React.Fragment>
    );
};

export default Section;
