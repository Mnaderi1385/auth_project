import React from 'react';
import Input from './Input';

const FormikControls = (props) => {
    switch(props.control) {
        case 'input':
            return <Input { ...props } />
            break;
        default:
            return;
            break;
    };
}

export default FormikControls;
