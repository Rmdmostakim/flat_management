import React, {useEffect, useState} from 'react';
import {Badge, Button, Modal} from 'react-bootstrap';
import Layout from './Layout';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Url from '../apiurl/Url';
import Encryption from "../helpers/Encryption";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from "./Form/TextInput";
import {BiBuildingHouse} from "react-icons/bi";
import NumberInput from "./Form/NumberInput";
import {FaRulerCombined} from "react-icons/fa";
import SelectInput from "./Form/SelectInput";
import {GiHouse} from "react-icons/gi";
import ReadonlyInput from "./Form/ReadonlyInput";

export default function House() {
    const navigate = useNavigate();
    const {flatId} = useParams();
    const [show,setShow] = useState(false);
    const [flat, setFlat] = useState([]);
    const [house,setHouse] = useState([]);
    const [flatCredentials, setFlatCrendential] = useState({flat_name:'',size:'',flat_id:''});
    const [flatEditModal,setFlatEditModal] = useState(false);
    const [flatDeleteModal,setFlatDeleteModal] = useState(false);

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
                .get(Url.showFlat+Encryption.Decrypt(flatId))
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status === 200) {
                            setShow(true);
                            setFlat(response.data.flat);
                            setHouse(response.data.flat.house);
                            setFlatCrendential({ ...flatCredentials, ['flat_name']: response.data.flat.flat_name,
                                ['size']: response.data.flat.size, ['flat_id']: response.data.flat.id,
                                ['house_name']:response.data.flat.house.house_name});
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchData();
    }, [flatId,flatEditModal]);

    const flatEditModalClose = () => setFlatEditModal(false);
    const flatEditModalOpen = () => setFlatEditModal(true);

    const flatCredentialsHandler = (name,value) =>{
        setFlatCrendential({ ...flatCredentials, [name]: value });
    }

    const flatUpdateHnadler= (event) => {
        event.preventDefault();
        if (
            flatCredentials.flat_name.trim().length !== 0 &&
            flatCredentials.size.trim().length !== 0 &&
            flatCredentials.flat_id !== 0
        ) {
            axios
                .put(Url.updateFlat, flatCredentials)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status === 200) {
                            setFlatEditModal(false);
                            successMsg(response.data.message);
                        } else {
                            errorMsg(response.data.message);
                        }
                    }else{
                        errorMsg('Failed to connect');
                    }
                })
                .catch((error) => {
                    errorMsg('Failed to connect');
                    console.log(error);
                });
        }
    };

    const flatDeleteModalClose = () => setFlatDeleteModal(false);
    const flatDeleteModalOpen = () => setFlatDeleteModal(true);
    const flatDeleteHandler = (id) =>{
        axios.delete(Url.deleteFlat+Encryption.Decrypt(id))
            .then((response)=>{
                if(response.status === 200){
                    if (response.data.status === 200) {
                        successMsg(response.data.message);
                        setTimeout(() => navigate('/flats'), 1000);
                    }else{
                        errorMsg('Flat delete failed');
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
                <title>Flat Details</title>
                <div className="housesContainer">
                    <div className="houseBtns">
                        <div className="houseName">
                            <Button className="btn btn-primary btn-sm mb-3 text-capitalize">
                                {flat.flat_name}
                            </Button>
                        </div>
                        <div className="houseActions">
                            <Button className="btn btn-primary btn-sm mb-3 text-capitalize" onClick={flatEditModalOpen}>
                                Edit
                            </Button>
                            <Button className="btn btn-danger btn-sm mb-3 text-capitalize" onClick={flatDeleteModalOpen}>
                                Delete
                            </Button>
                        </div>
                    </div>
                    <div className="houseInfo">
                        <h6 className="text-center">Flat Information</h6>
                        <div className="tableHeader">
                            <div>House Name</div>
                            <div>Address</div>
                            <div>Flat Size</div>
                            <div>Booked</div>
                        </div>
                        <div className="tableBody">
                            <div className="mt-2 tableInfo">{house.house_name}</div>
                            <div className="mt-2 text-capitalize">{house.address}</div>
                            <div className="mt-2 text-capitalize">{flat.size}</div>
                            <div className="mt-2 text-capitalize">{flat.booked === 1 ? 'Booked':'------'}</div>
                        </div>
                    </div>
                </div>
                {/* Flat Modal Start */}
                <Modal show={flatEditModal} onHide={flatEditModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Flat Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TextInput
                            label="Flat Name"
                            title="flat_name"
                            placeholder="Enter flat name"
                            length="2"
                            defaultValue={flatCredentials.flat_name}
                            credentialsHandler={flatCredentialsHandler}
                        >
                            <BiBuildingHouse />
                        </TextInput>
                        <NumberInput
                            label="flat size"
                            title="size"
                            placeholder="Enter flat size in sqr.feet"
                            length="1"
                            defaultValue={flatCredentials.size}
                            credentialsHandler={flatCredentialsHandler}
                        >
                            <FaRulerCombined />
                        </NumberInput>
                        <ReadonlyInput defaultValue={flatCredentials.house_name}><GiHouse/></ReadonlyInput>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={flatEditModalClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={flatUpdateHnadler}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Flat Modal End */}
                {/*flat delete modal start*/}
                <Modal show={flatDeleteModal} onHide={flatDeleteModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-danger">Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure, you want to delete this item?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={flatDeleteModalClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => flatDeleteHandler(Encryption.Encrypt(flat.id))}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*flat delete modal end*/}
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
            <title>Flat Details</title>
            <div className="housesContainer text-center">
                No data found
            </div>
        </Layout>
    );

}
