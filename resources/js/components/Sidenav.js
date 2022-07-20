import React from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaHouseUser, FaUsers } from 'react-icons/fa';
import {FcStatistics} from "react-icons/fc";
import {BiLogOutCircle} from 'react-icons/bi';
import { MdApartment } from 'react-icons/md';;
import {BsGearWideConnected} from 'react-icons/bs'
import {NavLink, useNavigate} from 'react-router-dom';

export default function () {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div className="sidenav">
            <h4 className="text-center">Brandname</h4>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <AiFillDashboard /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/houses" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <FaHouseUser /> Houses
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/flats" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <MdApartment /> Flats
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tenants" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <FaUsers /> Tenants
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <BsGearWideConnected/> Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <FcStatistics/> Reports
                    </NavLink>
                </li>
                <li>
                    <div role="button" tabIndex="0" onClick={logout}><BiLogOutCircle/> Logout</div>
                </li>
            </ul>
        </div>
    );
}
