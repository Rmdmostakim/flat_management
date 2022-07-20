import React, {useEffect, useState} from 'react';
import {Button, Modal,Row,Col} from 'react-bootstrap';
import Layout from './Layout';
import NumberInput from "./Form/NumberInput";
import SelectInput from "./Form/SelectInput";
import ReadonlyInput from "./Form/ReadonlyInput";
import axios from "axios";
import Url from "../apiurl/Url";
import UserName from "../approutes/UserName";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
    const [settingsModal,setSettingsModal] = useState(false);
    const [settings,setSettings] = useState([]);
    const [settingsEditModal,setSettingsEditModal] = useState(false);
    const initialValue = {gas_single:0,gas_double:0,electricity:0,water:0,garbage:0,
        security:0,internet:0,dish_antenna:0,service_charge:0,others:0,type:1,house_id:''};
    const [settingsCredentials,setSettingsCredential] = useState(initialValue);

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

    const settingsModalClose = () => setSettingsModal(false);
    const settingsModalOpen = () => {
        setSettingsModal(true);
        setSettingsCredential(initialValue);
    };

    const credentialsHandler =(name,value) =>{
        if(name === 'type' && value === '1'){
            setSettingsCredential({...settingsCredentials,[name]:value,['electricity']:0});
        }else{
            setSettingsCredential({...settingsCredentials,[name]:value});
        }
    }

    const settingsSubmitHandler = (event) =>{
        event.preventDefault();
        axios
            .post(Url.settingsStore,settingsCredentials)
            .then((response)=>{
                if(response.status === 200){
                    if(response.data.status === 200){
                        successMsg(response.data.message);
                        setSettingsModal(false);
                    }else{
                        errorMsg(response.data.message);
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

    const settingsEditModalClose = () => setSettingsEditModal(false);
    const settingsEditModalOpen = (data) => {
        setSettingsEditModal(true);
        setSettingsCredential({...settingsCredentials,['gas_single']:data.business.gas_single,['gas_double']:data.business.gas_double,
            ['electricity']:data.business.electricity,['water']:data.business.water,['garbage']:data.business.garbage,['security']:data.business.security,['internet']:data.business.internet,
            ['dish_antenna']:data.business.dish_antenna,['service_charge']:data.business.service_charge,['others']:data.business.others,['type']:data.business.type,['house_id']:data.business.house_id,
            ['house_name']:data.house_name
        });
    }

    const settingsEditHandler = (event) =>{
        event.preventDefault();
        console.log(settingsCredentials);
        axios
            .post(Url.settingsStore,settingsCredentials)
            .then((response)=>{
                if(response.status === 200){
                    if(response.data.status === 200){
                        successMsg('Settings update successfully');
                        setSettingsEditModal(false);
                    }else{
                        errorMsg('Settings update failed');
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

    useEffect(()=>{
        async function fetchData() {
            await axios
                .post(Url.settings,{user:UserName()})
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status === 200) {
                            setSettings(response.data.settings);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchData();
    },[settingsModal,settingsEditModal]);

    const type = [{id:1,house_name:'Amount'},{id:2,house_name:'Unit'}];
    const UnitType = () =>{
        return(
            <NumberInput
                label="electric bill"
                title="electricity"
                placeholder="Enter electric bill amount"
                length="0"
                credentialsHandler={credentialsHandler}
                defaultValue={settingsCredentials.electricity}
            >
                Price
            </NumberInput>
        );
    }

    return (
        <Layout>
            <title>Settings</title>
            <div className="housesContainer">
                <div className="houseCreateBtn">
                    <Button className="btn btn-primary btn-sm mb-3 text-capitalize" onClick={settingsModalOpen}>
                        Add new settings
                    </Button>
                </div>

                <div className="houseContainer">
                    {settings.map((house)=>{
                        if(house.business !=null){
                            return(
                                <div key={Math.random()} className="mb-2">
                                    <div className="mb-2">
                                        <h6 className="btn btn-sm btn-info float-start">{house.house_name}</h6>
                                        <Button variant="primary" className="mx-2" size="sm" onClick={()=>{settingsEditModalOpen(house)}}>
                                            Edit
                                        </Button>
                                    </div>
                                    <div className="bg-black bg-opacity-10 rounded p-2">
                                        <Row>
                                            <Col md={4}>
                                                <Row>
                                                    <Col md={8}>Gas Bill (Single Burner) &emsp; :</Col>
                                                    <Col md={4}>{house.business.gas_single} &#2547;</Col>
                                                </Row>
                                                <Row>
                                                    <Col md={8}>Gas Bill (Double Burner)&emsp;:</Col>
                                                    <Col md={4}>{house.business.gas_double} &#2547;</Col>
                                                </Row>
                                                <Row>
                                                    <Col md={8}>Electricity Bill {house.business.type === 1? '(Amount)':'(Per Unit)'} &emsp;:</Col>
                                                    <Col md={4}>{house.business.electricity} &#2547;</Col>
                                                </Row>
                                                <Row>
                                                    <Col md={8}>Water Bill&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; :</Col>
                                                    <Col md={4}>{house.business.water} &#2547;</Col>
                                                </Row>
                                                <Row>
                                                    <Col md={8}>Garbage Bill &emsp;&emsp;&emsp;&emsp;&emsp;&ensp; :</Col>
                                                    <Col md={4}>{house.business.garbage} &#2547;</Col>
                                                </Row>
                                            </Col>
                                            <Col md={4}>
                                                <Row>
                                                    <Col md={8}>Security Bill &emsp;&ensp;&emsp;&ensp; :</Col>
                                                    <Col md={4}>{house.business.security} &#2547;</Col>
                                                </Row>
                                                <Row>
                                                    <Col md={8}>Internet Bill &emsp;&emsp;&emsp; :</Col>
                                                    <Col md={4}>{house.business.internet} &#2547;</Col>
                                                </Row>
                                                <Row>
                                                    <Col md={8}>Dish Antenna Bill &ensp; :</Col>
                                                    <Col md={4}>{house.business.dish_antenna} &#2547;</Col>
                                                </Row>
                                                <Row>
                                                    <Col md={8}>Service Charge &emsp;&ensp; :</Col>
                                                    <Col md={4}>{house.business.service_charge} &#2547;</Col>
                                                </Row>
                                                <Row>
                                                    <Col md={8}>Others Bill &emsp;&emsp;&emsp;&ensp; :</Col>
                                                    <Col md={4}>{house.business.others} &#2547;</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            {/* Add new settings start */}
            <Modal show={settingsModal} onHide={settingsModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Business Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="gas bill (single burner)"
                                title="gas_single"
                                placeholder="Enter gas bill (single burner) amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.gas_single}
                            >
                                Gas <sup>1 Burner</sup>
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="gas bill(double burner)"
                                title="gas_double"
                                placeholder="Enter gas bill (double burner) amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.gas_double}
                            >
                                Gas <sup>2 Burner</sup>
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SelectInput
                                label="Type"
                                selectData={type}
                                title="type"
                                defaultValue="Select Type"
                                credentialsHandler={credentialsHandler}
                            >
                                Electric <sup>Type</sup>
                            </SelectInput>
                        </Col>
                        <Col md={6}>
                            {settingsCredentials.type === '2'? UnitType():''}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="water bill"
                                title="water"
                                placeholder="Enter water bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.water}
                            >
                                Water Bill
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="garbage bill"
                                title="garbage"
                                placeholder="Enter garbage bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.garbage}
                            >
                                Garbage&ensp;
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="security bill"
                                title="security"
                                placeholder="Enter security bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.security}
                            >
                                Security &ensp;
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="internet bill"
                                title="internet"
                                placeholder="Enter internet bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.internet}
                            >
                                Wifi Bill&emsp;
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="dish antenna bill"
                                title="dish_antenna"
                                placeholder="Enter dish antenna bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.dish_antenna}
                            >
                                Dish Line&nbsp;
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="service charge bill"
                                title="service_charge"
                                placeholder="Enter service charge bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.service_charge}
                            >
                                Services&ensp;
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="others bill"
                                title="others"
                                placeholder="Enter others bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.others}
                            >
                                Others&emsp;
                            </NumberInput>
                        </Col>
                        <Col md={12}>
                            <SelectInput
                                label="House"
                                selectData={settings}
                                title="house_id"
                                defaultValue="Select House"
                                credentialsHandler={credentialsHandler}
                            >
                                House &emsp;
                            </SelectInput>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={settingsModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={settingsSubmitHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Add new settings end */}
            {/* settings edit modal start */}
            <Modal show={settingsEditModal} onHide={settingsEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Business Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="gas bill (single burner)"
                                title="gas_single"
                                placeholder="Enter gas bill (single burner) amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.gas_single}
                            >
                                Gas <sup>1 Burner</sup>
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="gas bill(double burner)"
                                title="gas_double"
                                placeholder="Enter gas bill (double burner) amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.gas_double}
                            >
                                Gas <sup>2 Burner</sup>
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SelectInput
                                label="Type"
                                selectData={type}
                                title="type"
                                defaultValue="Select Type"
                                credentialsHandler={credentialsHandler}
                            >
                                Electric <sup>Type</sup>
                            </SelectInput>
                        </Col>
                        <Col md={6}>
                            {settingsCredentials.type === '2'? UnitType():''}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="water bill"
                                title="water"
                                placeholder="Enter water bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.water}
                            >
                                Water Bill
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="garbage bill"
                                title="garbage"
                                placeholder="Enter garbage bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.garbage}
                            >
                                Garbage&ensp;
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="security bill"
                                title="security"
                                placeholder="Enter security bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.security}
                            >
                                Security &ensp;
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="internet bill"
                                title="internet"
                                placeholder="Enter internet bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.internet}
                            >
                                Wifi Bill&emsp;
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="dish antenna bill"
                                title="dish_antenna"
                                placeholder="Enter dish antenna bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.dish_antenna}
                            >
                                Dish Line&nbsp;
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="service charge bill"
                                title="service_charge"
                                placeholder="Enter service charge bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.service_charge}
                            >
                                Services&ensp;
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <NumberInput
                                label="others bill"
                                title="others"
                                placeholder="Enter others bill amount"
                                length="0"
                                credentialsHandler={credentialsHandler}
                                defaultValue={settingsCredentials.others}
                            >
                                Others&emsp;
                            </NumberInput>
                        </Col>
                        <Col md={12}>
                            <ReadonlyInput defaultValue={settingsCredentials.house_name}>
                                House &emsp;
                            </ReadonlyInput>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={settingsEditModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={settingsEditHandler}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* settings edit modal end */}
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
