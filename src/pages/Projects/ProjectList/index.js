import React from 'react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';

import List from './List';

const ProjectList = () => {
    document.title = 'Project List | UD Platform';

    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    <BreadCrumb title='All Projects' pageTitle='Projects' />
                    <List />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectList;
