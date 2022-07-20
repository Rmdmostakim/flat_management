import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BiBuildingHouse } from 'react-icons/bi';
import { FaRulerCombined } from 'react-icons/fa';
import { GiHouse } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import NumberInput from './Form/NumberInput';
import SelectInput from './Form/SelectInput';
import TextInput from './Form/TextInput';
import Layout from './Layout';
import Url from '../apiurl/Url';
import UserName from "../approutes/UserName";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Encryption from "../helpers/Encryption";

export default function Flats() {
    const [flats, setFlats] = useState([]);
    const [flatModal, setFlatModal] = useState(false);
    const initialValue = { name: '', size: '', house_id: 'Select House' };
    const [flatCredentials, setFlatCrendential] = useState(initialValue);
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
                .post(Url.getFlats,{user:UserName()})
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status === 200) {
                            setFlats(response.data.flats);
                        }
                    }
                })
                .catch();
        }
        fetchData();
    }, [flatModal]);

    const flatmodalShow = () =>{
        setFlatCrendential(initialValue);
        setFlatModal(true)
    };
    const flatModalClose = () => setFlatModal(false);
    const flatCredentialsHandler = (name, value) => {
        setFlatCrendential({ ...flatCredentials, [name]: value });
    };
    const flatsubmitHandler = (event) => {
        event.preventDefault();
        if (
            flatCredentials.name.trim().length !== 0 &&
            flatCredentials.size.trim().length !== 0 &&
            flatCredentials.house_id !== 0
        ) {
            axios
                .post(Url.storeFlat, flatCredentials)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status === 200) {
                            setFlatModal(false);
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

    return (
        <Layout>
            <title>Flats</title>
            <div className="flatsContainer">
                <div className="flatCreateBtn">
                    <Button
                        className="btn btn-primary btn-sm mb-3 text-capitalize"
                        onClick={flatmodalShow}
                    >
                        Add new flat
                    </Button>
                </div>

                <div className="flatContainer">
                    {flats.map((data) => (
                        <div key={Math.random()} className="mb-2">
                            <div className="p-1 text-uppercase fw-bold">{data.house_name}</div>
                            {data.flats.map((flat) => (
                                <div className="flatList" key={flat.id}>
                                    <div className="btn btn-sm btn-success">{flat.flat_name}</div>
                                    <div>
                                        {flat.booked === 1 ? (
                                            <Button variant="secondary" size="sm">
                                                Booked
                                            </Button>
                                        ) : (
                                            <Link className="btn btn-sm btn-success" to={`/flats/booking/${Encryption.Encrypt(flat.id)}`}>
                                                Book Now
                                            </Link>
                                        )}
                                    </div>
                                    <div>
                                        <Link className="btn btn-sm btn-success" to={`/flats/${Encryption.Encrypt(flat.id)}`}>
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            {/* Flat Modal Start */}
            <Modal show={flatModal} onHide={flatModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Flat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextInput
                        label="name"
                        title="name"
                        placeholder="Enter flat name"
                        length="2"
                        defaultValue={flatCredentials.name}
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
                    <SelectInput
                        label="House Name"
                        selectData={flats}
                        title="house_id"
                        defaultValue="Select House"
                        credentialsHandler={flatCredentialsHandler}
                    >
                        <GiHouse />
                    </SelectInput>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={flatModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={flatsubmitHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Flat Modal End */}
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
