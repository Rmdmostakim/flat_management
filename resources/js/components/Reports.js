import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {Button, Form,Row, Col, InputGroup, FormControl, Table} from "react-bootstrap";
import {BsFillCaretDownFill} from "react-icons/bs";
import DatePicker from "react-datepicker";
import axios from "axios";
import Url from "../apiurl/Url";
import UserName from "../approutes/UserName";

export default function Reports(){
    const [calendarMonth,setCalendarMonth] = useState(false);
    const [calendarYear,setCalendarYear] = useState(false);
    const [tenants,setTenant] = useState([]);
    const initialValue = {month:new Date(),year:new Date(),phone:'',user:UserName()};
    const [credentials,setCredentials] = useState(initialValue);

    const credentialsHandler= (event) =>{
        const {name,value} = event.target;
        setCredentials({...credentials,[name]:value});
    }

    const filterSubmit = (event) =>{
        event.preventDefault();
        axios.post(Url.reports,credentials)
            .then((response)=>{
                if(response.status === 200){
                    if(response.data.status === 200){
                        setTenant(response.data.tenants);
                    }
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    useEffect(()=>{
        async function fetchData(){
            await axios.post(Url.reports,{user:UserName()})
                .then((response)=>{
                    if(response.status === 200){
                        if(response.data.status === 200){
                            setTenant(response.data.tenants);
                        }
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
        fetchData();
    },[]);

    return(
        <Layout>
            <title>Reports</title>
            <div className="housesContainer">
                <Form onSubmit={filterSubmit}>
                    <Row>
                        <Col md={2}>
                            <Button variant="info" size="sm">
                                Month
                            </Button>
                            <Button variant="secondary" size="sm" onClick={()=>{setCalendarMonth(!calendarMonth)}}>
                                {credentials.month.toLocaleString('default', { month: 'long' })} &ensp;<BsFillCaretDownFill/>
                            </Button>
                            <div style={{ position:"absolute",zIndex:'1000' }}>
                                {calendarMonth && (<DatePicker selected={credentials.month} onChange={(date) => setCredentials({...credentials,['month']:date})} dateFormat="MM/yyyy" showMonthYearPicker inline />)}
                            </div>
                        </Col>
                        <Col md={2}>
                            <Button variant="info" size="sm">
                                Year
                            </Button>
                            <Button variant="secondary" size="sm" onClick={()=>{setCalendarYear(!calendarYear)}}>
                                {credentials.year.getFullYear()} &ensp;<BsFillCaretDownFill/>
                            </Button>
                            <div style={{ position:"absolute",zIndex:'1000' }}>
                                {calendarYear && (<DatePicker selected={credentials.date} onChange={(date) => setCredentials({...credentials,['year']:date})} dateFormat="yyyy" showYearPicker inline />)}
                            </div>
                        </Col>
                        <Col md={3}>
                            <InputGroup className="mb-3" size="sm">
                                <InputGroup.Text id="basic-addon2" className="bg-info">Phone</InputGroup.Text>
                                <FormControl
                                    placeholder="Tenant phone number"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    name="phone"
                                    onChange={credentialsHandler}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={2}>
                            <Button variant="primary" size="sm" type="submit">
                                Filter
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div className="houseContainer mt-4">
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Flat Name</th>
                            <th>Total Bills</th>
                            <th>Due</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tenants.map((data,index)=>{
                            return(
                                <tr key={Math.random()}>
                                    <td>{index+1}</td>
                                    <td>{data.first_name}</td>
                                    <td>{data.last_name}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.flat.flat_name}</td>
                                    <td>{data.payment !== null ? data.payment.total:'--------'}</td>
                                    <td>{data.payment !== null ? data.payment.due:'--------'}</td>
                                    <td>
                                        {data.payment !== null ? <Button variant="success" size="sm">Paid</Button>:<Button variant="danger" size="sm">Unpaid</Button>}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Layout>
    );
}
