import React, { useState } from "react";
import 'Components/Auth/Field.css'

interface Props {
    type: string,
    label?: string,
    value: any,
    notice?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Field: React.FC<Props> = ({type, label, value, onChange, notice}) => {

    return (
        <div className="field">
            <input type={type} className="field-input" value={value} required onChange={e => onChange(e)}/>
            <label className="label-text">{label}</label>
            <span className="field-bar"></span>
            <span className="field-notice">{notice}</span>
        </div>
    )
}