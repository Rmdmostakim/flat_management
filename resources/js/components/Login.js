import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Url from '../apiurl/Url';
import EmailInput from './Form/EmailInput';
import PasswordInput from './Form/PasswordInput';

export default function Login() {
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

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const credentialsHandler = (name, value) => {
        setCredentials({ ...credentials, [name]: value });
    };
    const submitHandler = (event) => {
        event.preventDefault();
        if (credentials.email.trim().length !== 0 && credentials.password.trim().length !== 0) {
            axios
                .post(Url.login, credentials)
                .then((response) => {
                    if (response.status === 200) {
                        if(response.data.status === 200){
                            successMsg(response.data.message);
                            localStorage.setItem('user', response.data.user);
                            setTimeout(() => navigate('/'), 1000);
                        }else{
                            errorMsg(response.data.message);
                        }
                    } else {
                        errorMsg("Connection failed");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <>
            <title>Login</title>
            <div style={{ margin: '5rem 0rem 0rem 0rem' }}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="4" className="bg-white p-5 rounded">
                            <h6 className="text-center mb-3">Login</h6>
                            <Form onSubmit={submitHandler}>
                                <EmailInput
                                    placeholder="Enter email"
                                    label="Email"
                                    title="email"
                                    credentialsHandler={credentialsHandler}
                                    defaultValue={credentials.email}
                                >
                                    <FaEnvelope />
                                </EmailInput>
                                <PasswordInput
                                    placeholder="Enter password"
                                    label="password"
                                    length="6"
                                    title="password"
                                    credentialsHandler={credentialsHandler}
                                    defaultValue={credentials.password}
                                    ss
                                >
                                    <RiLockPasswordFill />
                                </PasswordInput>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" size="sm" type="submit">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                            <div className="d-grid gap-2 text-center mt-2">
                                <Link to="/registration">Not a member? Sign up</Link>
                                <Link to="/reset-password">Reset Password</Link>
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
