import React from 'react';
import { Link } from 'react-router-dom';
import {
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

//import images
import avatar8 from '../../../assets/images/users/avatar-8.jpg';
import avatar10 from '../../../assets/images/users/avatar-10.jpg';
import avatar6 from '../../../assets/images/users/avatar-6.jpg';
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../../assets/images/users/avatar-4.jpg';
import avatar7 from '../../../assets/images/users/avatar-7.jpg';
import image4 from '../../../assets/images/small/img-4.jpg';
import image5 from '../../../assets/images/small/img-5.jpg';

//SimpleBar
import SimpleBar from 'simplebar-react';

const AnalyzeTab = () => {
    return (
        <React.Fragment>
            <Row>
                <Col xl={9} lg={8}>
                    <Card>
                        <CardBody>
                            <div className='text-muted'>
                                <h5 className='mb-3 text-uppercase'>Analyze</h5>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default AnalyzeTab;
