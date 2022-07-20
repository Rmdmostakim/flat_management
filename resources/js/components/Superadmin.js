import React, {useEffect, useState} from "react";
import {Navbar, Container, Button, Table, Modal} from "react-bootstrap";
import axios from "axios";
import Url from "../apiurl/Url";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Encryption from "../helpers/Encryption";
import {useNavigate} from "react-router-dom";
import PasswordInput from "./Form/PasswordInput";

export default function Superadmin(){
    const navigate = useNavigate();
    const [status,setStatus] = useState(false);
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            await axios.get(Url.superadmin)
                .then((response)=>{
                    if(response.status === 200){
                        setUsers(response.data);
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
        fetchData();
    },[status]);

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

    const statusHandler = (id)=>{
        axios.get(Url.userManage+Encryption.Decrypt(id))
            .then((response)=>{
                if(response.status === 200){
                    if(response.data.status === 200){
                        setStatus(!status);
                        successMsg(response.data.message);
                    }else{
                        errorMsg(response.data.message);
                    }
                }else{
                    errorMsg("Connection failed");
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const logout = ()=>{
        localStorage.clear();
        navigate('/super-admin/login');
    }

    const [editModal,setEditModal] = useState(false);
    const initialValue = {user_id:'',password:''};
    const [credentials,setCredentials] = useState(initialValue);
    const editModalClose = () => {
        setEditModal(false);
        setCredentials(initialValue);
    }
    const editModalShow = (id) =>{
        setEditModal(true);
        setCredentials({...credentials,['user_id']:id});
    }
    const credentialsHandler = (name,value) =>{
        setCredentials({...credentials,[name]:value});
    }

    const userResetPassword = () =>{
        axios.post(Url.superadminUserReset,credentials)
            .then((response)=>{
                if(response.status === 200){
                    if(response.data.status === 200){
                        successMsg(response.data.message);
                        setEditModal(false);
                        setCredentials(initialValue);
                    }else{
                        errorMsg(response.data.message);
                    }
                }else{
                    errorMsg("Connection failed");
                }
            })
    }

    return(
        <>
            <Navbar className="bg-dark" fixed="top">
                <Container>
                    <Navbar.Brand className="text-white">Super Admin Panel</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container style={{marginTop:'5rem'}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((data,index)=>{
                        return(
                            <tr key={Math.random()}>
                                <td>{index+1}</td>
                                <td>{data.name}</td>
                                <td>{data.phone}</td>
                                <td>{data.email}</td>
                                <td>{data.verified === 1? 'verified':'unverified'}</td>
                                <td>
                                    {data.verified === 1? <Button variant="danger" size="sm" onClick={()=>statusHandler(Encryption.Encrypt(data.id))}>Deactivate</Button>:<Button variant="primary" size="sm" onClick={()=>statusHandler(Encryption.Encrypt(data.id))}>Activate</Button>}
                                    &emsp;
                                    <Button variant="danger" size="sm" onClick={()=>editModalShow(data.id)}>Reset Password</Button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </Container>
            {/*password reset modal*/}
            <Modal show={editModal} onHide={editModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PasswordInput
                        placeholder="Enter new password"
                        credentialsHandler={credentialsHandler}
                        defaultValue={credentials.password}
                        label="password"
                        length="6"
                        title="password"
                    >
                        New Password
                    </PasswordInput>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={editModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={userResetPassword} >
                        Reset
                    </Button>
                </Modal.Footer>
            </Modal>
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

    )
}
