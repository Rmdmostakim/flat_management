import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

export default function ReadonlyInput({ children, defaultValue }) {
    const [inputValue] = useState(defaultValue);
    return (
        <InputGroup className="mb-3" size="sm">
            <InputGroup.Text id="basic-addon1">{children}</InputGroup.Text>
            <FormControl type="text" aria-describedby="basic-addon1" value={defaultValue} readOnly />
        </InputGroup>
    );
}
