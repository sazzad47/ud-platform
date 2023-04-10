import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table,
    UncontrolledDropdown,
} from 'reactstrap';

const EditTab = () => {
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h5 className='mb-3 text-uppercase'>Edit</h5>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default EditTab;
