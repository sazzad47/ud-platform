import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Modal,
    Row,
    UncontrolledDropdown,
    ModalBody,
    ModalHeader,
} from 'reactstrap';

//SimpleBar
import SimpleBar from 'simplebar-react';

//import images
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../../assets/images/users/avatar-4.jpg';
import avatar8 from '../../../assets/images/users/avatar-8.jpg';

import avatar7 from '../../../assets/images/users/avatar-7.jpg';
import avatar5 from '../../../assets/images/users/avatar-5.jpg';

const ObjectsTab = () => {
    //Modal
    const [modal, setModal] = useState(false);
    const openModal = () => setModal(!modal);
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h5 className='mb-3 text-uppercase'>Objects</h5>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default ObjectsTab;
