import React from 'react';
import { ErrorMessage, FastField } from 'formik';

const Input = ({ type, inputClass, placeholder, name, icon }) => {
    return (
        <div className="mt-8 w-full relative">
            <FastField 
                type={type}
                className={inputClass}
                placeholder={placeholder}
                name={name}
            />
            <i className={`${icon} absolute top-4 right-4 text-slate-600`} />

            <ErrorMessage
                component="span"
                name={name}
                className="text-xs text-red-600 font-semibold"
            />
        </div>
    );
}

export default Input;