import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import EmailInput from "./Form/EmailInput";
import {FaEnvelope} from "react-icons/fa";
import PasswordInput from "./Form/PasswordInput";
import {RiLockPasswordFill} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Url from "../apiurl/Url";
import axios from "axios";
export default function Resetpass(){
    const [emailValidation,setEmailValidation] = useState(false);
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

    const emailHandler = ()=>{
        axios.post(Url.userEmail,credentials)
            .then((response)=>{
                if(response.status === 200){
                    if(response.data.status === 200){
                        setEmailValidation(true);
                    }else{
                        errorMsg(response.data.message);
                        setCredentials({...credentials,['email']:''});
                    }
                }else{
                    errorMsg("Connection failed");
                }
            }).catch((error)=>{
                console.log(error)
        })
    }

    const passwordHandler = () =>{
        axios.post(Url.userReset,credentials)
            .then((response)=>{
                if(response.status === 200){
                    if(response.data.status === 200){
                        successMsg(response.data.message);
                        navigate('/login');
                    }else{
                        errorMsg(response.data.message);
                        setCredentials({...credentials,['email']:''});
                        setEmailValidation(false);
                    }
                }else{
                    errorMsg("Connection failed");
                }
            }).catch((error)=>{
            console.log(error)
        })

    }

    const email = () =>{
        return(
            <EmailInput
                placeholder="Enter email"
                label="Email"
                title="email"
                credentialsHandler={credentialsHandler}
                defaultValue={credentials.email}
            >
                <FaEnvelope />
            </EmailInput>
        );
    }

    const password = () =>{
        return(
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
        );
    }

    return(
        <>
            <title>Password Reset</title>
            <div style={{ margin: '5rem 0rem 0rem 0rem' }}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="4" className="bg-white p-5 rounded">
                            <h6 className="text-center mb-3">{emailValidation === false? 'Enter your email to reset password':'Enter new password'}</h6>
                            <Form>
                                {emailValidation === false? email():password()}
                                <div className="d-grid gap-2">
                                    {emailValidation===false?
                                        <Button variant="primary" size="sm" onClick={emailHandler}>
                                            Submit
                                        </Button>:
                                        <Button variant="primary" size="sm" onClick={passwordHandler}>
                                            Reset password
                                        </Button>
                                    }
                                </div>
                            </Form>
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
