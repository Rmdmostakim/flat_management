import React, {useEffect, useRef, useState} from 'react';
import {Row, Col, Button, Container} from "react-bootstrap";
import axios from "axios";
import Url from "../apiurl/Url";
import Layout from "./Layout";
import {BsFillCaretDownFill} from "react-icons/bs";
import DatePicker from "react-datepicker";
import ReadonlyInput from "./Form/ReadonlyInput";
import NumberInput from "./Form/NumberInput";
import SelectInput from "./Form/SelectInput";
import {useNavigate, useParams} from "react-router-dom";
import Encryption from "../helpers/Encryption";
import {useReactToPrint} from "react-to-print";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Payments() {
    const navigate = useNavigate();
    const {tenantId} = useParams();
    const componentRef = useRef();
    const [paid,setPaid] = useState(false);
    const [calendar,setCalender] = useState(false);
    const [tenantData,setTenantData] = useState([]);
    const [flatData,setFlatData] = useState([]);
    const [houseData,setHouseData] = useState([]);
    const [prePaymentData,setPrePaymentData] =useState([]);
    const [currentPaymentData,setCurrentPaymentData] = useState([]);
    const [businessSettings,setBusinessSettings] = useState([]);
    const initialValue = {gas_type:0,gas:'',pre_due:'0',pre_reading:'0',cur_reading:'0',electricity:'',electricUnit:'',paid:'',date:new Date()};
    const [credentials,setCredentials] = useState(initialValue);
    const [paymentSuccess,setPaymentSuccess] = useState(false);

    const credentialsHandler = (name,value) =>{
        setCredentials({...credentials,[name]:value});
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

    useEffect(()=>{
        async function fetchData(){
            await axios.post(Url.payments+Encryption.Decrypt(tenantId),credentials)
                .then((response)=>{
                    if(response.status === 200){
                        if(response.data.status === 200){
                            setTenantData(response.data.tenant);
                            setFlatData(response.data.flat);
                            setHouseData(response.data.flat.house);
                            setPrePaymentData(response.data.prePayment);
                            if(response.data.paid === true){
                                setPaid(true);
                                setCurrentPaymentData(response.data.currentPayment);
                            }else{
                                setPaid(false);
                                setBusinessSettings(response.data.settings);
                            }
                        }
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
        fetchData();
    },[credentials.date,tenantId,paymentSuccess]);

    const gasBill = () =>{
        if(credentials.gas_type === '1'){
            return(
                <ReadonlyInput defaultValue={businessSettings.gas_single}>
                    Gas Bill
                </ReadonlyInput>
            )
        }
        if(credentials.gas_type === '2'){
            return(
                <ReadonlyInput defaultValue={businessSettings.gas_double}>
                    Gas Bill
                </ReadonlyInput>
            )
        }
        return null;
    }

    const usedUnit = () =>{
        let unit = 0;
        if(prePaymentData !==null){
            unit = Number(credentials.cur_reading) - Number(prePaymentData.meter_reading);
        }else{
            unit = Number(credentials.cur_reading) - Number(credentials.pre_reading);
        }
        return unit;
    }

    const totalElectricBill = () =>{
        return usedUnit()*businessSettings.electricity;
    }

    const totalPayableBill = () =>{
        let totalBill = Number(businessSettings.water)+Number(businessSettings.garbage)+Number(businessSettings.security)+Number(businessSettings.internet)+Number(businessSettings.dish_antenna)
            +Number(businessSettings.service_charge)+Number(businessSettings.others)+Number(tenantData.rent);
        if(credentials.gas_type === '1'){
            totalBill += Number(businessSettings.gas_single);
        }
        if(credentials.gas_type === '2'){
            totalBill += Number(businessSettings.gas_double);
        }
        if(tenantData.billing_type === 0){
            if(businessSettings.type === 1){
                totalBill += Number(credentials.electricity);
            }
            if(businessSettings.type === 2){
                totalBill += totalElectricBill();
            }
        }
        if(tenantData.billing_type === 1){
            if(businessSettings.type === 1){
                totalBill += Number(businessSettings.electricity);
            }
            if(businessSettings.type === 2){
                totalBill += totalElectricBill();
            }
        }
        if(prePaymentData !== null){
            totalBill += Number(prePaymentData.due);
        }
        if(credentials.pre_due !== '' && credentials.pre_due !== null && credentials.pre_due !== '0' && credentials.pre_due !==0){
            totalBill += Number(credentials.pre_due);
        }
        return totalBill;
    }

    const dueCalculation = () =>{
        return totalPayableBill()-Number(credentials.paid);
    }

    const electricCustom = () =>{
        if(businessSettings.type === 1){
            return(
                <ReadonlyInput defaultValue={businessSettings.electricity}>Electric Bill</ReadonlyInput>
            )
        }
        if(businessSettings.type === 2){
            return(
                <div className='border border-light border-2 rounded p-2'>
                    <h6>Electricity Bill</h6>
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            {prePaymentData !==null ?
                                (<ReadonlyInput defaultValue={prePaymentData.meter_reading}>
                                    Pre. Reading
                                </ReadonlyInput>):
                                (<NumberInput
                                    label="Pre Reading"
                                    title="pre_reading"
                                    length="1"
                                    placeholder="pre reading"
                                    credentialsHandler={credentialsHandler}
                                    defaultValue={credentials.pre_reading}
                                >
                                    Pre. Reading
                                </NumberInput>)
                            }
                        </Col>
                        <Col md={6}>
                            <NumberInput
                                label="Current Reading"
                                title="cur_reading"
                                credentialsHandler={credentialsHandler}
                                placeholder="current reading"
                                length="1"
                                defaultValue={credentials.cur_reading}
                            >
                                Cur. Reading
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <ReadonlyInput defaultValue={businessSettings.electricity}>Elec. Bill <sup>Unit</sup></ReadonlyInput>
                        </Col>
                        <Col md={4}>
                            <ReadonlyInput defaultValue={usedUnit()}>
                                Used<sup>Unit</sup>
                            </ReadonlyInput>
                        </Col>
                        <Col md={4}>
                            <ReadonlyInput defaultValue={totalElectricBill()}>Total</ReadonlyInput>
                        </Col>
                    </Row>
                </div>

            );
        }
    }

    const electricDefault = () =>{
        if(businessSettings.type === 1){
            return (
                <NumberInput
                    label="electric bill"
                    title="electricity"
                    length="1"
                    placeholder="Enter electricity bill amount"
                    defaultValue={credentials.electricity}
                    credentialsHandler={credentialsHandler}
                >
                    Electric Bill
                </NumberInput>
            );
        }
        if(businessSettings.type === 2){
            return(
                <div className='border border-light border-2 rounded p-2'>
                    <h6>Electricity Bill</h6>
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            {prePaymentData !==null ?
                                (<ReadonlyInput defaultValue={prePaymentData.meter_reading}>
                                    Pre. Reading
                                </ReadonlyInput>):
                                (<NumberInput
                                    label="Pre Reading"
                                    title="pre_reading"
                                    length="1"
                                    placeholder="pre reading"
                                    credentialsHandler={credentialsHandler}
                                    defaultValue={credentials.pre_reading}
                                >
                                    Pre. Reading
                                </NumberInput>)
                            }
                        </Col>
                        <Col md={6}>
                            <NumberInput
                                label="Current Reading"
                                title="cur_reading"
                                credentialsHandler={credentialsHandler}
                                placeholder="current reading"
                                length="1"
                                defaultValue={credentials.cur_reading}
                            >
                                Cur. Reading
                            </NumberInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <ReadonlyInput defaultValue={businessSettings.electricity}>Elec. Bill <sup>Unit</sup></ReadonlyInput>
                        </Col>
                        <Col md={4}>
                            <ReadonlyInput defaultValue={usedUnit()}>
                                Used<sup>Unit</sup>
                            </ReadonlyInput>
                        </Col>
                        <Col md={4}>
                            <ReadonlyInput defaultValue={totalElectricBill()}>Total</ReadonlyInput>
                        </Col>
                    </Row>
                </div>

            );
        }
    }

    const commonComponents = () =>{
        return(
            <>
                <Col md={6}>
                    <ReadonlyInput defaultValue={tenantData.first_name}>
                        First Name
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={tenantData.last_name}>
                        Last Name
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={tenantData.phone}>
                        Phone&emsp;&emsp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={tenantData.email}>
                        Email &emsp;&emsp;
                    </ReadonlyInput>
                </Col>
                <Col md={6}>
                    <ReadonlyInput defaultValue={flatData.flat_name}>
                        Flat Name
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={houseData.house_name}>
                        House&emsp;&ensp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={tenantData.rent}>
                        Flat Rent&ensp;
                    </ReadonlyInput>
                </Col>
            </>
        );
    }

    const unpaidComponent = () =>{
        return (
            <>
                <Col md={6}>
                    <ReadonlyInput defaultValue={businessSettings.water}>
                        Water Bill
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={businessSettings.garbage}>
                        Garbage&ensp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={businessSettings.security}>
                        Security&emsp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={businessSettings.internet}>
                        Internet&emsp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={businessSettings.dish_antenna}>
                        Dish Line&ensp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={businessSettings.service_charge}>
                        Service &emsp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={businessSettings.others}>
                        Others &emsp;
                    </ReadonlyInput>
                    {prePaymentData !== null? <ReadonlyInput defaultValue={prePaymentData.due}>Pre. Due&ensp;</ReadonlyInput>:<NumberInput title="pre_due" defaultValue={credentials.pre_due} label="Previous Due" placeholder="Pre. due" length="0" credentialsHandler={credentialsHandler}>Pre. Due</NumberInput>}
                </Col>
                <Col md={6}>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <SelectInput
                                label="gas bill type"
                                title="gas_type"
                                defaultValue="Select Type"
                                selectData={[{id:1,house_name:'Single Burner'},{id:2,house_name:'Double Burner'}]}
                                credentialsHandler={credentialsHandler}
                            >
                                Gas <sup>Type</sup>
                            </SelectInput>
                        </Col>
                        <Col md={6}>
                            {credentials.gas_type !== 0 ? gasBill():null}
                        </Col>
                    </Row>
                    {tenantData.billing_type === 0 ? electricDefault(): electricCustom()}
                    <ReadonlyInput defaultValue={totalPayableBill()}>
                        Total Bill&ensp;
                    </ReadonlyInput>
                    <NumberInput
                        label="payment"
                        defaultValue={credentials.paid}
                        length="1"
                        placeholder="Enter payment amount"
                        credentialsHandler={credentialsHandler}
                        title="paid"
                    >
                        Payment&ensp;
                    </NumberInput>
                    <ReadonlyInput defaultValue={dueCalculation()}>
                        Due&emsp;&emsp;&ensp;
                    </ReadonlyInput>
                </Col>
            </>
        )
    }

    const paidComponent = () =>{
        return(
            <>
                <Col md={6}>
                    <ReadonlyInput defaultValue={currentPaymentData.gas}>
                        Gas Bill&emsp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={currentPaymentData.electricity}>
                        Electricity
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={currentPaymentData.water}>
                        Water Bill
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={currentPaymentData.garbage}>
                        Garbage&ensp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={currentPaymentData.security}>
                        Security&emsp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={currentPaymentData.internet}>
                        Internet&emsp;
                    </ReadonlyInput>
                </Col>
                <Col md={6}>
                    <ReadonlyInput defaultValue={currentPaymentData.dish_antenna}>
                        Dish Line&ensp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={currentPaymentData.service}>
                        Service &emsp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={currentPaymentData.others}>
                        Others &emsp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={currentPaymentData.total}>
                        Total Bill&ensp;
                    </ReadonlyInput>
                    <ReadonlyInput defaultValue={currentPaymentData.due}>
                        Due&emsp;&emsp;&ensp;
                    </ReadonlyInput>
                </Col>
            </>
        );
    }

    const invoiceListing = () =>{
        return(
            <div className="invoice">
                <div className="titles">
                    <p className="text-center">{houseData.house_name}</p>
                    <p className="text-center text-capitalize">{houseData.address}</p>
                    <p className="text-center text-capitalize">{flatData.flat_name}</p>
                </div>
                <div className="information">
                    <p>Name &emsp;&emsp;&emsp; : {tenantData.first_name+' '+tenantData.last_name}</p>
                    <p>Phone &emsp;&emsp;&emsp; : {tenantData.phone}</p>
                    <p>Flat Rent &emsp;&emsp; : {tenantData.rent} &#x9F3;</p>
                    <p>Gas Bill&emsp;&emsp;&emsp; : {currentPaymentData.gas} &#x9F3;</p>
                    <p>Electric Bill&emsp;&emsp;: {currentPaymentData.electricity} &#x9F3;</p>
                    <p>Water Bill&emsp;&emsp;&ensp;: {currentPaymentData.water} &#x9F3;</p>
                    <p>Garbage Bill &emsp;: {currentPaymentData.garbage} &#x9F3;</p>
                    <p>Security Bill &emsp;: {currentPaymentData.security} &#x9F3;</p>
                    <p>Internet Bill &emsp; : {currentPaymentData.internet} &#x9F3;</p>
                    <p>Dish Line &emsp;&emsp; : {currentPaymentData.dish_antenna} &#x9F3;</p>
                    <p>Others Bill &emsp;&emsp;: {currentPaymentData.others} &#x9F3;</p>
                    <p>Payable Bills &emsp;: {currentPaymentData.total} &#x9F3;</p>
                    <p>Paid Amount &emsp;: {currentPaymentData.paid} &#x9F3;</p>
                    <p>Due &emsp;&emsp;&emsp;&emsp;&emsp;: {currentPaymentData.due} &#x9F3;</p>
                </div>
                <div style={{position:'relative',left:'50%',bottom:'5%'}}>
                    <p>Authority Signature</p>
                </div>
            </div>
        );
    }

    const invoice = () =>{
        return (
            <div ref={componentRef}>
                <Row className="m-2">
                    <Col>{invoiceListing()}</Col>
                    <Col>{invoiceListing()}</Col>
                </Row>
            </div>
        );
    }
    // print handler
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [print,setPrint] = useState(false);

    const printer = () =>{
        setPrint(true);
        setTimeout(() => handlePrint(), 1000);
        setTimeout(() => setPrint(false), 1000);
    }

    const credentialsSetup = () =>{
        let data = {
            tenant_id: tenantData.id,
            water: businessSettings.water,
            garbage: businessSettings.garbage,
            security: businessSettings.security,
            internet: businessSettings.internet,
            dish_antenna: businessSettings.dish_antenna,
            service: businessSettings.service_charge,
            others: businessSettings.others,
            rent: tenantData.rent,
            paid: credentials.paid,
            due: dueCalculation(),
            total:totalPayableBill(),
            meter_reading: credentials.cur_reading,
        };
        if(credentials.gas_type === '1'){
            data = {...data,gas:businessSettings.gas_single}
        }else if(credentials.gas_type === '2'){
            data = {...data,gas:businessSettings.gas_double}
        }else{
            data = {...data,gas:0}
        }
        if(businessSettings.type === 1){
            if(tenantData.billing_type === 1){
                data = {...data,electricity:businessSettings.electricity}
            }else{
                data = {...data,electricity:credentials.electricity}
            }
        }else if(businessSettings.type === 2){
            data = {...data,electricity:totalElectricBill()}
        }
        return data;
    }

    const paymentSubmit = () =>{
        axios.post(Url.storePayment,credentialsSetup())
            .then((response)=>{
                if(response.status === 200){
                    if(response.data.status === 200){
                        successMsg(response.data.message);
                        setPaymentSuccess(true);
                    }else{
                        errorMsg(response.data.message);
                    }
                }else{
                    errorMsg("Connection lost");
                }
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    return (
        <Layout>
            <title>Payments</title>
            <div className="housesContainer">
                <div className="houseInfo">
                    <h6 className="text-center text-uppercase">Payments Information</h6>
                    <Row className="justify-content-md-center">
                        <Col md={12}>
                            <Row>
                                <Col md={6}>
                                    <Button variant="primary" size="sm" onClick={()=>{setCalender(!calendar)}}>
                                        {credentials.date.getMonth()+1+'/'+credentials.date.getFullYear()} &ensp;<BsFillCaretDownFill/>
                                    </Button>
                                    {calendar && (<DatePicker selected={credentials.date} onChange={(date) => setCredentials({...credentials,['date']:date})} dateFormat="MM/yyyy" showMonthYearPicker inline />)}
                                </Col>
                                <Col md={6} className="text-end">
                                    {paid === true? <Button variant="success" size="sm">Paid</Button>:<Button variant="danger" size="sm">Unpaid</Button> }
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center mt-2 mb-2">
                                <Col md={12}>
                                    <Row className="justify-content-center border border-secondary border-2 rounded p-2 mb-1">
                                        {commonComponents()}
                                    </Row>
                                    <Row className="justify-content-center border border-secondary border-2 rounded p-2">
                                        {!paid && unpaidComponent()}
                                        {paid && paidComponent()}
                                    </Row>
                                </Col>
                            </Row>
                            {paid === true?
                                (<div className="d-grid gap-2"><Button variant="primary" size="sm" onClick={printer}>Print</Button></div>):
                                (<div className="d-grid gap-2"><Button variant="primary" size="sm" onClick={paymentSubmit}>Save</Button></div>)
                            }
                        </Col>
                    </Row>
                </div>
            </div>
            {print === true ? <div style={{display:'none'}}>{invoice()}</div>:''}
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
