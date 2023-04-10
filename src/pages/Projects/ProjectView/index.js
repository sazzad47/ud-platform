import React from 'react';
import { Container } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import Section from './Section';

const ProjectView = () => {
    // console.log('In ProjectView');

    document.title = 'Project View | UD Platform';

    const location = useLocation();
    const { theProject, project_id } = location.state;

    // console.log({ theProject });

    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    <Section project_id={project_id} />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectView;
