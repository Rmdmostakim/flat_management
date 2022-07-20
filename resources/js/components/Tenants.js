import React, {useEffect, useState} from 'react';
import Layout from "./Layout";
import {Badge, Button, Modal} from "react-bootstrap";
import axios from "axios";
import Url from "../apiurl/Url";
import UserName from "../approutes/UserName";
import {Link} from "react-router-dom";
import Encryption from "../helpers/Encryption";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Tenants(){
    const [tenants,setTenants] = useState([]);
    const [tenantDeleteModal,setTenantDeleteModal] = useState(false);
    const [deleteId,setDeleteId] = useState('');
    const tenantDeleteModalClose = ()=> setTenantDeleteModal(false);
    const tenantDeleteModalOpen = (id)=> {
        setDeleteId(id);
        setTenantDeleteModal(true);
    }
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

    const tenantRemoveHandler = () =>{
        axios.get(Url.destroyTenant+Encryption.Decrypt(deleteId))
            .then((response)=>{
                if(response.status === 200){
                    if(response.data.status === 200){
                        setTenantDeleteModal(false);
                        successMsg(response.data.message);
                    }else{
                        setTenantDeleteModal(false);
                        errorMsg(response.data.message)
                    }
                }else{
                    setTenantDeleteModal(false);
                    errorMsg("Falied to connect")
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    useEffect(()=>{
        async function fetchData(){
            await axios.post(Url.getTenants,{user:UserName()})
                .then((response)=>{
                    if(response.status === 200){
                        if(response.data.status === 200){
                            setTenants(response.data.flats);
                        }
                    }
                })
                .catch((error)=>{
                    console.log(error);
                });
        }
        fetchData();
    },[tenantDeleteModal]);

    // tenants listing
    const tenant = tenants.map((data)=>{
        if(data.tenant !==null){
            return(
                <div className="houseList" key={Math.random()}>
                    <div className="btn btn-sm btn-success">{data.tenant.first_name}</div>
                    <div>
                        <Link className="btn btn-sm btn-success" to={`/tenants/payments/${Encryption.Encrypt(data.tenant.id)}`}>
                            Payment
                        </Link>
                    </div>
                    <div>
                        <Link className="btn btn-sm btn-success" to={`/tenants/${Encryption.Encrypt(data.tenant.id)}`}>
                            Details
                        </Link>
                    </div>
                    <div>
                        <Button variant="danger" size="sm" onClick={() => tenantDeleteModalOpen(Encryption.Encrypt(data.tenant.id))}>Remove</Button>
                    </div>
                </div>
            );
        }else{
            return('');
        }
    });

    return(
        <Layout>
            <title>Tenants</title>
            <div className="housesContainer">
                <div className="houseCreateBtn">
                    <Button className="btn btn-primary btn-sm mb-3 text-capitalize">
                        Tenants List
                    </Button>
                </div>

                <div className="houseContainer">
                    {tenant}
                </div>
            </div>
            {/*tenant delete modal*/}
            <Modal show={tenantDeleteModal} onHide={tenantDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure, you want to delete this item?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={tenantDeleteModalClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={tenantRemoveHandler}>
                        Delete
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
        </Layout>
    );
}
