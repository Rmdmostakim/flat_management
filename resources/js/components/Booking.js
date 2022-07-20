import React, {useState} from "react";
import Layout from "./Layout";
import {useNavigate, useParams} from "react-router-dom";
import {Col, Row, Form, Button} from 'react-bootstrap';
import TextInput from "./Form/TextInput";
import EmailInput from "./Form/EmailInput";
import NumberInput from "./Form/NumberInput";
import DateInput from "./Form/DateInput";
import SelectInput from "./Form/SelectInput";
import Encryption from "../helpers/Encryption";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Url from "../apiurl/Url";

export default function Booking(){
    const navigate = useNavigate();
    const {flatId} = useParams();
    const initialValue = {first_name:'',last_name:'',email:'',phone:'',flat_id:Encryption.Decrypt(flatId),rent:'',date:new Date(),billing_type:0,
        gas_single:0,gas_double:0,electricity:0,water:0,garbage:0,security:0,internet:0,dish_antenna:0,service_charge:0,others:0,type:0};
    const [bookingCredentials,setBookingCredentials] = useState(initialValue);
    const credentialsHandler = (name,value) =>{
        setBookingCredentials({...bookingCredentials,[name]:value});
    }
    const billingTypeHandler = () =>{
        if(bookingCredentials.billing_type === 0){
            setBookingCredentials({...bookingCredentials,['billing_type']:1})
        }else{
            setBookingCredentials({...bookingCredentials,['billing_type']:0})
        }
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

    const bookingHandler = (event) =>{
        event.preventDefault();
        axios
            .post(Url.storeTenant, bookingCredentials)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        successMsg(response.data.message);
                        setTimeout(() => navigate('/flats'), 1000);
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

    const view = ()=>{
        return (
            <>
                <NumberInput
                    label="gas (single burner)"
                    title="gas_single"
                    placeholder="Enter gas bill (single burner) amount"
                    length="0"
                    defaultValue={bookingCredentials.gas_single}
                    credentialsHandler={credentialsHandler}
                >
                    Gas <sup>1 Burner</sup>
                </NumberInput>
                <NumberInput
                    label="gas (double burner)"
                    title="gas_double"
                    placeholder="Enter gas bill (double burner) amount"
                    length="0"
                    defaultValue={bookingCredentials.gas_double}
                    credentialsHandler={credentialsHandler}
                >
                    Gas <sup>2 Burner</sup>
                </NumberInput>
                <Row>
                    <Col md={4}>
                        <SelectInput
                            label="Type"
                            selectData={[{id:1,house_name:'Amount'},{id:2,house_name:'Unit'}]}
                            title="type"
                            defaultValue="Select Type"
                            credentialsHandler={credentialsHandler}
                        >
                            Type
                        </SelectInput>
                    </Col>
                    <Col md={8}>
                        <NumberInput
                            label="electricity"
                            title="electricity"
                            placeholder="Enter electricity bill amount"
                            length="0"
                            defaultValue={bookingCredentials.electricity}
                            credentialsHandler={credentialsHandler}
                        >
                            Electricity&ensp;
                        </NumberInput>
                    </Col>
                </Row>
                <NumberInput
                    label="water"
                    title="water"
                    placeholder="Enter water bill amount"
                    length="0"
                    defaultValue={bookingCredentials.water}
                    credentialsHandler={credentialsHandler}
                >
                    Water&emsp;&emsp;
                </NumberInput>
                <NumberInput
                    label="garbage"
                    title="garbage"
                    placeholder="Enter garbage bill amount"
                    length="0"
                    defaultValue={bookingCredentials.garbage}
                    credentialsHandler={credentialsHandler}
                >
                    Garbage&emsp;
                </NumberInput>
                <NumberInput
                    label="internet"
                    title="internet"
                    placeholder="Enter internet bill amount"
                    length="0"
                    defaultValue={bookingCredentials.internet}
                    credentialsHandler={credentialsHandler}
                >
                    Internet &emsp;
                </NumberInput>
                <NumberInput
                    label="dish antenna"
                    title="dish_antenna"
                    placeholder="Enter dish antenna bill amount"
                    length="0"
                    defaultValue={bookingCredentials.dish_antenna}
                    credentialsHandler={credentialsHandler}
                >
                    Dish Ant.&emsp;
                </NumberInput>
                <NumberInput
                    label="security"
                    title="security"
                    placeholder="Enter security bill amount"
                    length="0"
                    defaultValue={bookingCredentials.security}
                    credentialsHandler={credentialsHandler}
                >
                    Security&emsp;&ensp;
                </NumberInput>
                <NumberInput
                    label="service charge"
                    title="service_charge"
                    placeholder="Enter service charge bill amount"
                    length="0"
                    defaultValue={bookingCredentials.service_charge}
                    credentialsHandler={credentialsHandler}
                >
                    Service &emsp;&ensp;
                </NumberInput>
                <NumberInput
                    label="others"
                    title="others"
                    placeholder="Enter others bill amount"
                    length="0"
                    defaultValue={bookingCredentials.service_charge}
                    credentialsHandler={credentialsHandler}
                >
                    Others &emsp;&ensp;
                </NumberInput>
            </>
        );
    };
    return(
        <Layout>
            <title>Flat Booking</title>
            <div className="housesContainer">
                <div className="houseInfo">
                    <h6 className="text-center text-uppercase">Flat Booking Information</h6>
                    <Row className="justify-content-md-center">
                        <Col md={6}>
                            <TextInput
                                label="first name"
                                title="first_name"
                                length="3"
                                placeholder="Enter first name"
                                defaultValue={bookingCredentials.first_name}
                                credentialsHandler={credentialsHandler}
                            >
                                First Name
                            </TextInput>
                            <TextInput
                                label="last name"
                                title="last_name"
                                length="3"
                                placeholder="Enter last name"
                                defaultValue={bookingCredentials.last_name}
                                credentialsHandler={credentialsHandler}
                            >
                                Last Name
                            </TextInput>
                            <EmailInput
                                label="email"
                                title="email"
                                placeholder="Enter email number"
                                defaultValue={bookingCredentials.email}
                                credentialsHandler={credentialsHandler}
                            >
                                Email &emsp;&emsp;
                            </EmailInput>
                            <TextInput
                                label="phone number"
                                title="phone"
                                length="11"
                                placeholder="Enter phone number"
                                defaultValue={bookingCredentials.phone}
                                credentialsHandler={credentialsHandler}
                            >
                                Phone &emsp;&ensp;
                            </TextInput>
                            <NumberInput
                                label="rent"
                                title="rent"
                                placeholder="Enter rent amount"
                                length="1"
                                defaultValue={bookingCredentials.rent}
                                credentialsHandler={credentialsHandler}
                            >
                                Rent&emsp;&emsp;&ensp;
                            </NumberInput>
                            {bookingCredentials.billing_type === 1? view():''}
                            <DateInput
                                placeholder="Enter rent start date"
                                credentialsHandler={credentialsHandler}
                                defaultDate={bookingCredentials.date}
                            >
                                Rent Date
                            </DateInput>
                            <Form className="mb-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Billing type default"
                                    onChange={billingTypeHandler}
                                    checked={bookingCredentials.billing_type === 0? true:false}
                                />
                            </Form>
                            <div className="d-grid gap-2">
                                <Button variant="primary" onClick={bookingHandler}>Confirm Booking</Button>
                            </div>
                        </Col>
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
