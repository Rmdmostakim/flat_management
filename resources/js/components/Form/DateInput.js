import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateInput({ placeholder, children, defaultDate, credentialsHandler }) {
    const onChangeHandler = (date) => {
        credentialsHandler('date', date);
    };
    return (
        <div className="mb-3 d-flex">
            <div
                style={{
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    backgroundColor: '#e9ecef',
                    border: '1px solid rgb(0 0 0 / 24%)',
                    borderRadius: '4px',
                    maxWidth: '300px',
                }}
            >
                {children}
            </div>
            <div>
                <DatePicker
                    selected={defaultDate}
                    placeholderText={placeholder}
                    onChange={onChangeHandler}
                />
            </div>
        </div>
    );
}
