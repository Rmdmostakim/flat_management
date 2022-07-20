import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

export default function Textinput({
    placeholder,
    label,
    children,
    title,
    credentialsHandler,
    defaultValue,
}) {
    const [valid, setValid] = useState(true);
    const [inputValue, setInputvalue] = useState(defaultValue);
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (value.match(pattern)) {
            setValid(true);
            credentialsHandler(name, value);
        } else {
            setValid(false);
            credentialsHandler(name, '');
        }
        setInputvalue(value);
    };
    return (
        <>
            <InputGroup className="mb-3" size="sm">
                <InputGroup.Text id="basic-addon1">{children}</InputGroup.Text>
                <FormControl
                    type="email"
                    name={title}
                    placeholder={placeholder}
                    aria-label={label}
                    aria-describedby="basic-addon1"
                    onChange={onChangeHandler}
                    onFocus={() => {
                        if (valid === false) {
                            setValid(true);
                        }
                    }}
                    value={inputValue}
                />
            </InputGroup>
            {valid ? (
                ''
            ) : (
                <p
                    className="text-danger text-center"
                    style={{ fontSize: 'x-small', fontWeight: 'bold' }}
                >
                    Enter valid {label.toLowerCase()}
                </p>
            )}
        </>
    );
}
