import React,{useState,useEffect} from 'react';
import { Badge, Button,Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import axios from "axios";
import Url from '../apiurl/Url';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserName from "../approutes/UserName";
import Encryption from "../helpers/Encryption";
import { BiBuildingHouse } from 'react-icons/bi';
import { FaMapMarkedAlt, FaRulerCombined } from 'react-icons/fa';
import { GiHouse } from 'react-icons/gi';
import NumberInput from './Form/NumberInput';
import TextInput from './Form/TextInput';

export default function Houses() {
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
    // houses modal and form handlers
    const [houseModal, sethouseModal] = useState(false);
    const initialValue = {name:'',address:'',flat_numbers:'',user:UserName()};
    const [houseCredentials, sethouseCredentials] = useState(initialValue);
    const [houses, setHouses] = useState([]);
    const houseCredentialsHandler = (name, value) => {
        sethouseCredentials({ ...houseCredentials, [name]: value });
    };

    const housesubmitHandler = (event) => {
        event.preventDefault();
        if (
            houseCredentials.name.trim().length !== 0 &&
            houseCredentials.address.trim().length !== 0 &&
            houseCredentials.flat_numbers.trim().length !== 0
        ) {
            axios
                .post(Url.storeHouse, houseCredentials)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status === 200) {
                            sethouseModal(false);
                            successMsg(response.data.message);
                            sethouseCredentials(initialValue);
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
    const houseModalHandlerClose = () => sethouseModal(false);
    const houseModalHandlerShow = () =>{
        sethouseCredentials(initialValue);
        sethouseModal(true);
    }

    useEffect(() => {
        async function fetchData() {
            await axios
                .post(Url.getHouses,{user:UserName()})
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status === 200) {
                            setHouses(response.data.houses);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchData();
    }, [houseModal]);


    // house listing
    const house = houses.map((data) => (
        <div className="houseList" key={Math.random()}>
            <div className="btn btn-sm btn-success">{data.house_name}</div>
            <div>
                <Button variant="success" size="sm">
                    Flats{' '}
                    <Badge pill bg="primary">
                        {data.flat_numbers}
                    </Badge>
                </Button>
            </div>
            <div>
                <Button variant="success" size="sm">
                    Booked{' '}
                    <Badge pill bg="primary">
                        {data.flats_count}
                    </Badge>
                </Button>
            </div>
            <div>
                <Link className="btn btn-sm btn-success" to={`/houses/${Encryption.Encrypt(data.id)}`}>
                    Details
                </Link>
            </div>
        </div>
    ));

    return (
        <Layout>
            <title>Houses</title>
            <div className="housesContainer">
                <div className="houseCreateBtn">
                    <Button className="btn btn-primary btn-sm mb-3 text-capitalize" onClick={houseModalHandlerShow}>
                        Add new house
                    </Button>
                </div>

                <div className="houseContainer">
                    {house}
                </div>
            </div>
            {/* House Modal Start */}
            <Modal show={houseModal} onHide={houseModalHandlerClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New House</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextInput
                        label="name"
                        title="name"
                        placeholder="Enter house name"
                        length="5"
                        credentialsHandler={houseCredentialsHandler}
                        defaultValue={houseCredentials.name}
                    >
                        <GiHouse />
                    </TextInput>
                    <TextInput
                        label="address"
                        title="address"
                        placeholder="Enter address"
                        length="5"
                        credentialsHandler={houseCredentialsHandler}
                        defaultValue={houseCredentials.address}
                    >
                        <FaMapMarkedAlt />
                    </TextInput>
                    <NumberInput
                        label="flat numbers"
                        title="flat_numbers"
                        placeholder="Enter number of flats"
                        length="1"
                        credentialsHandler={houseCredentialsHandler}
                        defaultValue={houseCredentials.flat_numbers}
                    >
                        <BiBuildingHouse />
                    </NumberInput>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={houseModalHandlerClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={housesubmitHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* House Modal End */}
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
