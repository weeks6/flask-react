import React, { useState } from "react";
import 'Components/Auth/Field.css'

interface Props {
    type: string,
    label?: string,
    value: any,
    changeHandle: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Field: React.FC<Props> = ({type, label, value, changeHandle}) => {


    return (
        <div className="field">
            <label htmlFor={`inputField${type}${label}`} className="field-label">{label}</label>
            <input type={type} value={value} name={`inputField${type}${label}`} className="field-input" onChange={e => changeHandle(e)}/>             
        </div>
    )
}