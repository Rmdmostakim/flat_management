import React from 'react';
import Classes from '../assets/css/Card.module.css';

export default function Card(props) {
    const { numbers, title, children } = props;
    return (
        <div className={Classes.card}>
            <div className={Classes.cardInfo}>
                <p>
                    <span>{children}</span>
                    <span>{numbers}</span>
                </p>
                <h6>{title}</h6>
            </div>
            <div className={Classes.cardIcon}>{children}</div>
        </div>
    );
}
