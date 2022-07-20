import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Houses from '../components/Houses';
import House from '../components/House'
import Flats from '../components/Flats';
import Login from '../components/Login';
import Registration from "../components/Registration";
import PrivateRoutes from "./PrivateRoutes";
import UserAuth from "./UserAuth";
import Flat from "../components/Flat";
import Settings from "../components/Settings";
import Booking from "../components/Booking";
import Tenants from "../components/Tenants";
import Tenant from "../components/Tenant";
import Payments from "../components/Payments";
import SuperLogin from "../components/SuperLogin";
import Superadmin from "../components/Superadmin";
import SuperadminAuth from "../approutes/SuperadminAuth";
import SuperRoutes from "./SuperRoutes";
import Resetpass from "../components/Resetpass";
import Reports from "../components/Reports";

export default function Approutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PrivateRoutes><Dashboard /></PrivateRoutes>
                } />
                <Route path="/houses" element={
                    <PrivateRoutes><Houses /></PrivateRoutes>
                } />
                <Route path="/houses/:houseId" element={
                    <PrivateRoutes><House /></PrivateRoutes>
                } />
                <Route path="/flats" element={
                    <PrivateRoutes><Flats /></PrivateRoutes>
                } />
                <Route path="/flats/:flatId" element={
                    <PrivateRoutes><Flat /></PrivateRoutes>
                } />
                <Route path="/flats/booking/:flatId" element={
                    <PrivateRoutes><Booking /></PrivateRoutes>
                } />
                <Route path="/tenants" element={
                    <PrivateRoutes><Tenants /></PrivateRoutes>
                } />
                <Route path="/tenants/:tenantId" element={
                    <PrivateRoutes><Tenant /></PrivateRoutes>
                } />
                <Route path="tenants/payments/:tenantId" element={
                    <PrivateRoutes><Payments /></PrivateRoutes>
                } />
                <Route path="/settings" element={
                    <PrivateRoutes><Settings /></PrivateRoutes>
                } />
                <Route path="/reports" element={
                    <PrivateRoutes><Reports /></PrivateRoutes>
                } />

                <Route path="/super-admin/login" element={SuperadminAuth()?<Navigate to="/super-admin"/>:<SuperLogin/>} />
                <Route path="/super-admin" element={<SuperRoutes>
                    <Superadmin/>
                </SuperRoutes>}/>

                <Route path="/login" element={UserAuth()? <Navigate to='/'/>:<Login />} />
                <Route path="/registration" element={UserAuth()? <Navigate to='/'/>:<Registration/>} />
                <Route path="/reset-password" element={<Resetpass/>}/>
            </Routes>
        </BrowserRouter>
    );
}
