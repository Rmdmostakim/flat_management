import React, {useEffect, useState} from 'react';
import {Badge, Button, Modal} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiBuildingHouse } from 'react-icons/bi';
import { FaMapMarkedAlt, FaRulerCombined } from 'react-icons/fa';
import { GiHouse } from 'react-icons/gi';
import Layout from './Layout';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import NumberInput from './Form/NumberInput';
import TextInput from './Form/TextInput';
import UserName from "../approutes/UserName";
import Url from '../apiurl/Url';
import Encryption from "../helpers/Encryption";

export default function House() {
    const navigate = useNavigate();
    const {houseId} = useParams();
    const [show,setShow] = useState(false);
    const [house,setHouse] = useState([]);
    const [houseEditModal, sethouseEditModal] = useState(false);
    const [houseCredentials,sethouseCredentials] = useState({});
    const [houseDeleteModal, sethouseDeleteModal] = useState(false);
    const [flats, setFlats] = useState([]);
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

    useEffect(() => {
        async function fetchData() {
            await axios
                .get(Url.showHouse+Encryption.Decrypt(houseId))
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status === 200) {
                            setShow(true);
                            setHouse(response.data.house);
                            setFlats(response.data.house.flats);
                            sethouseCredentials({ ...houseCredentials, ['name']: response.data.house.house_name,
                                ['address']: response.data.house.address,['flat_numbers']: response.data.house.flat_numbers,
                                ['house_id']: response.data.house.id});
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchData();
    }, [show,house,flats,houseId,houseEditModal,houseCredentials]);
    const flatList = flats.map((data) => <li key={Math.random()}>{data.flat_name}</li>);

    /*edit modal*/
    const houseEditModalHandlerClose = () => sethouseEditModal(false);
    const houseEditModalHandlerShow = () =>sethouseEditModal(true);
    /*house edit credentials*/
    const houseCredentialsHandler = (name, value) => {
        sethouseCredentials({ ...houseCredentials, [name]: value });
    };
    const houseUpdateHandler = (event) => {
        event.preventDefault();
        if (
            houseCredentials.name.trim().length !== 0 &&
            houseCredentials.address.trim().length !== 0 &&
            houseCredentials.flat_numbers >= 0
        ) {
            axios
                .put(Url.updateHouse, houseCredentials)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status === 200) {
                            sethouseEditModal(false);
                            successMsg(response.data.message);
                        } else {
                            errorMsg(response.data.message);
                        }
                    }
                })
                .catch((error) => {
                    errorMsg('Failed to connect');
                    console.log(error);
                });
        }
    };
    /*delete modal*/
    const houseDeleteModalClose = () => sethouseDeleteModal(false);
    const houseDeleteModalShow = () => sethouseDeleteModal(true);
    /*delete action*/
    const houseDeleteHandler = (id) =>{
        axios.delete(Url.deleteHouse+Encryption.Decrypt(id))
            .then((response)=>{
                if(response.status === 200){
                    if (response.data.status === 200) {
                        successMsg(response.data.message);
                        setTimeout(() => navigate('/houses'), 1000);
                    }else{
                        errorMsg('House delete failed');
                    }
                }else{
                    errorMsg('Failed to connect');
                }
            })
            .catch((error)=>{
                errorMsg('Failed to connect');
                console.log(error);
            });
    }

    if(show){
        return (
            <Layout>
                <title>House Details</title>
                <div className="housesContainer">
                    <div className="houseBtns">
                        <div className="houseName">
                            <Button className="btn btn-primary btn-sm mb-3 text-capitalize">
                                {house.house_name}
                            </Button>
                        </div>
                        <div className="houseActions">
                            <Button className="btn btn-primary btn-sm mb-3 text-capitalize" onClick={houseEditModalHandlerShow}>
                                Edit
                            </Button>
                            <Button className="btn btn-danger btn-sm mb-3 text-capitalize" onClick={houseDeleteModalShow}>
                                Delete
                            </Button>
                        </div>
                    </div>
                    <div className="houseInfo">
                        <h6 className="text-center">House Information</h6>
                        <div className="tableHeader">
                            <div>Flats Name</div>
                            <div>Address</div>
                        </div>
                        <div className="tableBody">
                            <div className="mt-2 tableInfo">
                                {flatList}
                            </div>
                            <div className="mt-2 text-capitalize">{house.address}</div>
                        </div>
                    </div>
                </div>
                {/* House edit Modal Start */}
                <Modal show={houseEditModal} onHide={houseEditModalHandlerClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>House Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TextInput
                            label="name"
                            title="name"
                            placeholder="Enter house name"
                            length="5"
                            defaultValue={house.house_name}
                            credentialsHandler={houseCredentialsHandler}
                        >
                            <GiHouse />
                        </TextInput>
                        <TextInput
                            label="address"
                            title="address"
                            placeholder="Enter address"
                            length="5"
                            defaultValue={house.address}
                            credentialsHandler={houseCredentialsHandler}
                        >
                            <FaMapMarkedAlt />
                        </TextInput>
                        <NumberInput
                            label="flat numbers"
                            title="flat_numbers"
                            placeholder="Enter number of flats"
                            length="1"
                            defaultValue={house.flat_numbers}
                            credentialsHandler={houseCredentialsHandler}
                        >
                            <BiBuildingHouse />
                        </NumberInput>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={houseEditModalHandlerClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={houseUpdateHandler}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* House edit Modal End */}
                {/*House delete modal start*/}
                <Modal show={houseDeleteModal} onHide={houseDeleteModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-danger">Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure, you want to delete this item? This process can not be undone. </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={houseDeleteModalClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => houseDeleteHandler(Encryption.Encrypt(house.id))}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*House delete modal end*/}
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
    return (
        <Layout>
            <title>House Details</title>
            <div className="housesContainer text-center">
                No data found
            </div>
        </Layout>
    );

}
