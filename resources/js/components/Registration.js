import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaEnvelope, FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Url from '../apiurl/Url';
import EmailInput from './Form/EmailInput';
import PasswordInput from './Form/PasswordInput';
import TextInput from './Form/TextInput';

export default function Registration() {
    /* toastify message */
    const errorMsg = (msg) => {
        toast.error(msg, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const successMsg = (msg) => {
        toast.success(msg, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const [credentials, setCredentials] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const credentialsHandler = (name, value) => {
        setCredentials({ ...credentials, [name]: value });
    };
    const submitHandler = (event) => {
        event.preventDefault();
        if (
            credentials.name.trim().length !== 0 &&
            credentials.phone.trim().length !== 0 &&
            credentials.email.trim().length !== 0 &&
            credentials.password.trim().length !== 0
        ) {
            axios
                .post(Url.registration, credentials)
                .then((response) => {
                    if (response.status === 200) {
                        successMsg(response.data.message);
                        setTimeout(() => navigate('/login'), 1000);
                    } else {
                        errorMsg(response.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <>
            <title>Registration</title>
            <div style={{ margin: '5rem 0rem 0rem 0rem' }}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="4" className="bg-white p-5 rounded">
                            <h6 className="text-center mb-3">User Registration</h6>
                            <Form onSubmit={submitHandler}>
                                <TextInput
                                    placeholder="Enter name"
                                    label="name"
                                    title="name"
                                    length="5"
                                    defaultValue={credentials.name}
                                    credentialsHandler={credentialsHandler}
                                >
                                    <FaUserAlt />
                                </TextInput>
                                <TextInput
                                    placeholder="Enter phone number"
                                    label="Phone"
                                    title="phone"
                                    length="11"
                                    defaultValue={credentials.phone}
                                    credentialsHandler={credentialsHandler}
                                >
                                    <BsTelephoneFill />
                                </TextInput>
                                <EmailInput
                                    placeholder="Enter email"
                                    label="Email"
                                    title="email"
                                    defaultValue={credentials.email}
                                    credentialsHandler={credentialsHandler}
                                >
                                    <FaEnvelope />
                                </EmailInput>
                                <PasswordInput
                                    placeholder="Enter password"
                                    label="password"
                                    title="password"
                                    length="6"
                                    defaultValue={credentials.password}
                                    credentialsHandler={credentialsHandler}
                                >
                                    <RiLockPasswordFill />
                                </PasswordInput>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" size="sm" type="submit">
                                        Sign Up
                                    </Button>
                                </div>
                            </Form>
                            <div className="d-grid gap-2 text-center mt-2">
                                <Link to="/login">Already have an account? Sign in</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* toastify message */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />
        </>
    );
}
