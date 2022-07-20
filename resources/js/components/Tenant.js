import React, {useEffect, useState} from "react";
import {Row, Col, Button} from "react-bootstrap";
import Layout from "./Layout";
import {useParams} from "react-router-dom";
import axios from "axios";
import Url from "../apiurl/Url";
import Encryption from "../helpers/Encryption";
import TextInput from "./Form/TextInput";
import EmailInput from "./Form/EmailInput";
import NumberInput from "./Form/NumberInput";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Tenant(){
    const {tenantId} = useParams();
    const [tenantData,setTenantData] = useState([]);
    const [edit,setEdit] = useState(false);
    const [credentials,setCredentials] = useState({});
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

    const editHandler = ()=>{
        setCredentials({...credentials,['first_name']:tenantData.first_name,['last_name']:tenantData.last_name,
        ['phone']:tenantData.phone,['email']:tenantData.email,['rent']:tenantData.rent,['tenant_id']:tenantData.id});
        setEdit(true);
    }

    const credentialsHandler=(name,value)=>{
        setCredentials({...credentials,[name]:value});
    }

    const updateHandler=()=>{
        axios.post(Url.updateTenant+credentials.tenant_id,credentials)
            .then((response)=>{
                if(response.status === 200){
                    if(response.data.status === 200){
                        successMsg(response.data.message);
                        setEdit(false);
                    }else{
                        errorMsg(response.data);
                    }
                }else{
                    errorMsg("Connection failed")
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    useEffect(()=>{
        async function fetchData(){
            await axios.get(Url.showTenant+Encryption.Decrypt(tenantId))
                .then((response)=>{
                    if(response.status === 200){
                        if(response.data.status === 200){
                            setTenantData(response.data.tenant);
                        }
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
        fetchData();
    },[tenantId,edit]);

    const editView = ()=>{
        return(
            <Col md={4}>
                <TextInput
                    label="first name"
                    title="first_name"
                    length="3"
                    placeholder="Enter first name"
                    defaultValue={credentials.first_name}
                    credentialsHandler={credentialsHandler}
                >
                    first Name
                </TextInput>
                <TextInput
                    label="last name"
                    title="last_name"
                    length="3"
                    placeholder="Enter last name"
                    defaultValue={credentials.last_name}
                    credentialsHandler={credentialsHandler}
                >
                    Last Name
                </TextInput>
                <EmailInput
                    label="email"
                    title="email"
                    placeholder="Enter email number"
                    defaultValue={credentials.email}
                    credentialsHandler={credentialsHandler}
                >
                    Email &emsp;&emsp;
                </EmailInput>
                <TextInput
                    label="phone number"
                    title="phone"
                    length="11"
                    placeholder="Enter phone number"
                    defaultValue={credentials.phone}
                    credentialsHandler={credentialsHandler}
                >
                    Phone &emsp;&ensp;
                </TextInput>
                <NumberInput
                    label="rent"
                    title="rent"
                    placeholder="Enter rent amount"
                    length="1"
                    defaultValue={credentials.rent}
                    credentialsHandler={credentialsHandler}
                >
                    Rent&emsp;&emsp;&ensp;
                </NumberInput>
                <div className="d-grid gap-2">
                    <Button variant="primary" onClick={updateHandler}>Update</Button>
                </div>
            </Col>
        );
    }

    const infoView = ()=>{
        return(
            <Col md={4}>
                <p>First Name &emsp;&ensp;: &emsp;{tenantData.first_name}</p>
                <p>Last Name &emsp;&ensp;: &emsp;{tenantData.last_name}</p>
                <p>Phone Num &emsp;: &emsp;{tenantData.phone}</p>
                <p>Email Name &emsp;: &emsp;{tenantData.email}</p>
                <p>Flat Rent &emsp;&emsp;&ensp;: &emsp;{tenantData.rent} &#x9F3;</p>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="sm" onClick={editHandler}>Edit</Button>
                </div>
            </Col>
        );
    }

    return(
        <Layout>
            <title>Tenant Details</title>
            <div className="housesContainer">
                <div className="houseContainer">
                    <h4 className="text-center">Tenant Information</h4>
                    <hr/>
                    <Row className="justify-content-md-center">
                        {edit === true ? editView():infoView()}
                    </Row>
                </div>
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
        </Layout>
    );
}
