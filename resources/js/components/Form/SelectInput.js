import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function SelectInput({
    label,
    children,
    title,
    credentialsHandler,
    selectData,
    defaultValue,
}) {
    const [valid, setValid] = useState(true);
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        if (value.trim().length >= 0 && value !== defaultValue) {
            setValid(true);
            credentialsHandler(name, value);
        } else {
            setValid(false);
            credentialsHandler(name, '');
        }
    };
    return (
        <>
            <InputGroup className="mb-3" size="sm">
                <InputGroup.Text id="basic-addon1">{children}</InputGroup.Text>
                <Form.Select name={title} onChange={onChangeHandler}>
                    <option>{defaultValue}</option>
                    {selectData.map((data) => (
                        <option value={data.id} key={data.id}>
                            {data.house_name}
                        </option>
                    ))}
                </Form.Select>
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
