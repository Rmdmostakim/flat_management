import React from 'react';
import { GoThreeBars } from 'react-icons/go';
import user from '../assets/images/default.png';

export default function Topmenu(props) {
    const { clickHandler } = props;
    return (
        <div className="menu">
            <div className="leftMenu" role="button" tabIndex="0" onClick={clickHandler}>
                <GoThreeBars />
            </div>
            <div className="rightMenu">
                <img src={user} alt="user" />
            </div>
        </div>
    );
}
