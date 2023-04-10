import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ParticlesAuth from '../ParticlesAuth';

//import images
import logoLight from '../../../assets/images/logo-light.png';

const BasicSuccessMsg = () => {
    document.title =
        'Success Message | Velzon - React Admin & Dashboard Template';
    return (
        <React.Fragment>
            <div className='auth-page-wrapper'>
                <ParticlesAuth>
                    <div className='auth-page-content'>
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className='mt-2 mt-sm-5 d-flex flex-column justify-content-center align-items-center'>
                                        <h5 className='text-primary fw-bold fs-3 text-white'>
                                            UD PLATFORM
                                        </h5>
                                        {/* <div>
                                            <Link to="/dashboard" className="d-inline-block auth-logo">
                                                <img src={logoLight} alt="" height="20" />
                                            </Link>
                                        </div> */}
                                        <p className='mt-3 fs-15 fw-medium'>
                                            Platform for Data in Motion
                                        </p>
                                    </div>
                                </Col>
                            </Row>

                            <Row className='justify-content-center'>
                                <Col md={8} lg={6} xl={5}>
                                    <Card className='mt-4'>
                                        <CardBody className='p-4 text-center'>
                                            <div className='avatar-lg mx-auto mt-2'>
                                                <div className='avatar-title bg-light text-success display-3 rounded-circle'>
                                                    <i className='ri-checkbox-circle-fill'></i>
                                                </div>
                                            </div>
                                            <div className='mt-4 pt-2'>
                                                <h4>Success !</h4>
                                                <p className='text-muted mx-4'>
                                                    You have sucessfully
                                                    verified your email address.
                                                </p>
                                                <div className='mt-4'>
                                                    <Link
                                                        to='/'
                                                        className='btn btn-success w-100'
                                                    >
                                                        Back to Dashboard
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </ParticlesAuth>
            </div>
        </React.Fragment>
    );
};

export default BasicSuccessMsg;
