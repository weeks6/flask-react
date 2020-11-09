import React from "react";
import 'Components/Controls/TextField/TextField.css'

interface Props {
    name?: string,
    onChange?: any,
    onBlur?: any,
    type?: string,
    label?: string,
    value?: any,
    notice?: string,
    required?: boolean,
}

export const TextField: React.FC<Props> = ({type, label, value, required, notice, name, onBlur, onChange}) => {

    return (
        <div className="field">
            <input type={type} className="field-input" value={value} required={required} name={name} onBlur={onBlur} onChange={onChange}/>
            <label className="label-text">{label}</label>
            <span className="field-bar"></span>
            <span className="field-notice">{notice}</span>
        </div>
    )
}