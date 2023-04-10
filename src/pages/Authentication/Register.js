import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    CardBody,
    Card,
    Alert,
    Container,
    Input,
    Label,
    Form,
    FormFeedback,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

import downloadIcon from '../../assets/images/svg/download-svgrepo-com.svg';

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// action
import { registerUser, apiError, resetRegisterFlag } from '../../store/actions';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';

//import images
import logoLight from '../../assets/images/logo-light.png';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';

const Register = () => {
    const [showTerms, setShowTerms] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
            first_name: '',
            username: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please Enter Your Email'),
            first_name: Yup.string().required('Please Enter Your Username'),
            password: Yup.string().required('Please Enter Your Password'),
            confirm_password: Yup.string().when('password', {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    "Confirm Password Isn't Match"
                ),
            }),
        }),
        onSubmit: values => {
            dispatch(registerUser(values));
        },
    });

    const { error, registrationError, success } = useSelector(state => ({
        registrationError: state.Account.registrationError,
        success: state.Account.success,
        error: state.Account.error,
    }));

    useEffect(() => {
        dispatch(apiError(''));
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setTimeout(() => history.push('login'), 3000);
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag());
        }, 3000);
    }, [dispatch, success, error, history]);

    document.title = 'Sign Up | UD Platform';

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className='auth-page-content'>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className='mt-2 mt-sm-5 d-flex flex-column justify-content-center align-items-center'>
                                    {/* <div className='register-logo-circle'> */}
                                    <h5 className='text-primary fw-bold fs-3 text-white'>
                                        UD PLATFORM
                                    </h5>
                                    {/* </div> */}
                                    {/* <h5 className='text-center fw-bold fs-3 mt-4'>
                                    Sign Up
                                </h5> */}
                                    <p className='mt-3 fs-15 fw-medium'>
                                        Platform for Data in Motion
                                    </p>
                                </div>
                            </Col>
                        </Row>

                        <Row className='justify-content-center'>
                            <Col md={8} lg={6} xl={5}>
                                <Card className='mt-4'>
                                    <CardBody className='p-4'>
                                        <div className='text-center mt-2'>
                                            <h5 className='text-primary'>
                                                Create New Account
                                            </h5>
                                            <p className='text-muted'>
                                                Get your free UD Platform
                                                account now
                                            </p>
                                        </div>
                                        <div className='p-2 mt-4'>
                                            <Form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                className='needs-validation'
                                                action='#'
                                            >
                                                {success && success ? (
                                                    <>
                                                        {toast(
                                                            'Your Redirect To Login Page...',
                                                            {
                                                                position:
                                                                    'top-right',
                                                                hideProgressBar: false,
                                                                className:
                                                                    'bg-success text-white',
                                                                progress:
                                                                    undefined,
                                                                toastId: '',
                                                            }
                                                        )}
                                                        <ToastContainer
                                                            autoClose={2000}
                                                            limit={1}
                                                        />
                                                        <Alert color='success'>
                                                            Register User
                                                            Successfully and
                                                            Your Redirect To
                                                            Login Page...
                                                        </Alert>
                                                    </>
                                                ) : null}

                                                {error && error ? (
                                                    <Alert color='danger'>
                                                        <div>
                                                            {/* {registrationError} */}
                                                            Email has been
                                                            Register Before,
                                                            Please Use Another
                                                            Email Address...{' '}
                                                        </div>
                                                    </Alert>
                                                ) : null}

                                                <div className='mb-3'>
                                                    <Label
                                                        htmlFor='useremail'
                                                        className='form-label'
                                                    >
                                                        Email{' '}
                                                        <span className='text-danger'>
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        id='email'
                                                        name='email'
                                                        className='form-control'
                                                        placeholder='Enter email address'
                                                        type='email'
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .email || ''
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .email &&
                                                            validation.errors
                                                                .email
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.email &&
                                                    validation.errors.email ? (
                                                        <FormFeedback type='invalid'>
                                                            <div>
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .email
                                                                }
                                                            </div>
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className='mb-3'>
                                                    <Label
                                                        htmlFor='username'
                                                        className='form-label'
                                                    >
                                                        Username{' '}
                                                        <span className='text-danger'>
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        name='first_name'
                                                        type='text'
                                                        placeholder='Enter username'
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .first_name ||
                                                            ''
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .first_name &&
                                                            validation.errors
                                                                .first_name
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched
                                                        .first_name &&
                                                    validation.errors
                                                        .first_name ? (
                                                        <FormFeedback type='invalid'>
                                                            <div>
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .first_name
                                                                }
                                                            </div>
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className='mb-2'>
                                                    <Label
                                                        htmlFor='userpassword'
                                                        className='form-label'
                                                    >
                                                        Password{' '}
                                                        <span className='text-danger'>
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        name='password'
                                                        type='password'
                                                        placeholder='Enter Password'
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .password || ''
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .password &&
                                                            validation.errors
                                                                .password
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched
                                                        .password &&
                                                    validation.errors
                                                        .password ? (
                                                        <FormFeedback type='invalid'>
                                                            <div>
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .password
                                                                }
                                                            </div>
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className='mb-2'>
                                                    <Label
                                                        htmlFor='confirmPassword'
                                                        className='form-label'
                                                    >
                                                        Confirm Password{' '}
                                                        <span className='text-danger'>
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        name='confirm_password'
                                                        type='password'
                                                        placeholder='Confirm Password'
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .confirm_password ||
                                                            ''
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .confirm_password &&
                                                            validation.errors
                                                                .confirm_password
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched
                                                        .confirm_password &&
                                                    validation.errors
                                                        .confirm_password ? (
                                                        <FormFeedback type='invalid'>
                                                            <div>
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .confirm_password
                                                                }
                                                            </div>
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className='mb-4'>
                                                    <p className='mb-0 fs-12 text-muted fst-italic'>
                                                        By registering you agree
                                                        to our {'\u00a0'}
                                                        <span
                                                            role='button'
                                                            onClick={() => {
                                                                setShowTerms(
                                                                    true
                                                                );
                                                            }}
                                                            className='text-primary text-decoration-underline fst-normal fw-medium'
                                                        >
                                                            Terms of Use
                                                        </span>
                                                    </p>
                                                </div>

                                                <div className='mt-4'>
                                                    <button
                                                        className='btn btn-success w-100'
                                                        type='submit'
                                                    >
                                                        Sign Up
                                                    </button>
                                                </div>

                                                {/* <div className='mt-4 text-center'>
                                                <div className='signin-other-title'>
                                                    <h5 className='fs-13 mb-4 title text-muted'>
                                                        Create account with
                                                    </h5>
                                                </div>

                                                <div>
                                                    <button
                                                        type='button'
                                                        className='btn btn-primary btn-icon waves-effect waves-light'
                                                    >
                                                        <i className='ri-facebook-fill fs-16'></i>
                                                    </button>{' '}
                                                    <button
                                                        type='button'
                                                        className='btn btn-danger btn-icon waves-effect waves-light'
                                                    >
                                                        <i className='ri-google-fill fs-16'></i>
                                                    </button>{' '}
                                                    <button
                                                        type='button'
                                                        className='btn btn-dark btn-icon waves-effect waves-light'
                                                    >
                                                        <i className='ri-github-fill fs-16'></i>
                                                    </button>{' '}
                                                    <button
                                                        type='button'
                                                        className='btn btn-info btn-icon waves-effect waves-light'
                                                    >
                                                        <i className='ri-twitter-fill fs-16'></i>
                                                    </button>
                                                </div>
                                            </div> */}
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className='mt-4 text-center'>
                                    <p className='mb-0'>
                                        Already have an account ?{' '}
                                        <Link
                                            to='/login'
                                            className='fw-semibold text-primary text-decoration-underline'
                                        >
                                            {' '}
                                            Sign in{' '}
                                        </Link>{' '}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
            <Modal
                isOpen={showTerms}
                size='lg'
                toggle={() => {
                    setShowTerms(false);
                }}
                centered={true}
            >
                <ModalHeader
                    className='p-3 bg-soft-info modal-title'
                    toggle={() => {
                        setShowTerms(false);
                    }}
                >
                    UD Platform
                </ModalHeader>
                <ModalBody className='py-3 px-5'>
                    <div className='mt-2'>
                        {/* <img
                            src={downloadIcon}
                            className='img-fluid download-modal-icon'
                            alt='user-pic'
                        /> */}
                        <div className='mt-2 pt-2 fs-15 mx-4 mx-sm-5'>
                            <h4 className='text-center mb-3'>Terms of Use</h4>
                            <div className='text-left mb-2'>
                                <p className='text-muted mx-4 mb-0'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Aenean placerat nisi id est
                                    placerat, sed finibus arcu sodales. Praesent
                                    at nunc facilisis, luctus leo eget,
                                    hendrerit velit. Integer fermentum ligula
                                    sit amet risus eleifend volutpat. Vestibulum
                                    mi sem, blandit nec velit eu, dignissim
                                    viverra sem.
                                </p>
                                <br />

                                <p className='text-muted mx-4 mb-0'>
                                    Quisque laoreet dolor sed accumsan euismod.
                                    Nulla suscipit consectetur dui a volutpat.
                                    Nam risus risus, euismod eu tincidunt non,
                                    vehicula sit amet leo. Pellentesque varius
                                    blandit leo, vitae malesuada sapien
                                    imperdiet sit amet. Nam sit amet rhoncus ex.{' '}
                                </p>
                                <br />
                                <p className='text-muted mx-4 mb-0'>
                                    Sed fermentum pellentesque felis, quis
                                    malesuada urna pulvinar id. Vivamus eget
                                    orci est. Mauris eu tincidunt dui. Vivamus
                                    faucibus vehicula elit ac accumsan. Maecenas
                                    sagittis bibendum magna non facilisis. Morbi
                                    convallis sit amet turpis nec viverra. Donec
                                    nec dictum neque.{' '}
                                </p>
                                <br />
                                <p className='text-muted mx-4 mb-0'>
                                    Integer varius, nibh et elementum tempor,
                                    dui purus consequat metus, et tempus nisi
                                    nibh ut velit. Fusce in velit facilisis,
                                    eleifend lorem lacinia, laoreet lorem. Donec
                                    pretium eget arcu vel malesuada. Donec in
                                    sagittis turpis.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex gap-2 justify-content-center mt-4 mb-2'>
                        <button
                            type='button'
                            className='btn w-sm btn-primary '
                            id='delete-record'
                            onClick={() => {
                                setShowTerms(false);
                            }}
                        >
                            Accept
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default Register;
