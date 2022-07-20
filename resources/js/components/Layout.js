import React, { useState } from 'react';
import Sidenav from './Sidenav';
import Topmenu from './Topmenu';

export default function Layout(props) {
    const { children } = props;
    const [open, setOpen] = useState(true);
    const sidenavHandler = () => {
        setOpen(!open);
    };
    return (
        <div className="layoutContainer bg-dark">
            {open ? <Sidenav /> : ''}
            <div className={open ? 'topnav' : 'topnavCollapse'}>
                <Topmenu clickHandler={sidenavHandler} />
                <div className={open ? 'serviceContainer' : 'serviceContainerCollapse'}>
                    {children}
                </div>
            </div>
        </div>
    );
}
