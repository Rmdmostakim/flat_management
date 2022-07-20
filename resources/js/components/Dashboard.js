import React, {useEffect, useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import { BiBuildingHouse } from 'react-icons/bi';
import { GiFamilyHouse, GiMoneyStack } from 'react-icons/gi';
import { RiUserFollowFill } from 'react-icons/ri';
import Classes from '../assets/css/Dashboard.module.css';
import Card from './Card';
import Layout from './Layout';
import axios from "axios";
import Url from "../apiurl/Url";
import UserName from "../approutes/UserName";

export default function Dashboard() {
    const [dashboardData,setDashboardData] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            await axios.post(Url.dashboard,{user:UserName()})
                .then((response)=>{
                    if(response.status === 200){
                        setDashboardData(response.data);
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
        fetchData();
    },[])

    return (
        <Layout>
            <title>Home</title>
            <div className={Classes.dashboard}>
                <Row>
                    <Col md={3}>
                        <Card title="Total Houses" numbers={dashboardData.house}>
                            <GiFamilyHouse />
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card title="Total Flats" numbers={dashboardData.flat}>
                            <BiBuildingHouse />
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card title="Total Tenants" numbers={dashboardData.tenant}>
                            <RiUserFollowFill />
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card title="Paid Tenants" numbers={dashboardData.paid}>
                            <GiMoneyStack />
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
}
