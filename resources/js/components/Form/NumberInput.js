import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

export default function NumberInput({
    placeholder,
    label,
    children,
    length,
    title,
    credentialsHandler,
    defaultValue,
}) {
    const [valid, setValid] = useState(true);
    const [inputValue, setInputvalue] = useState(defaultValue);
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        if (value >= length) {
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
                    type="number"
                    placeholder={placeholder}
                    aria-label={label}
                    name={title}
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
