import 'Components/Controls/Select/Select.css'

import React from 'react'

interface OptionProps {
    value: string
}

export const Option: React.FC<OptionProps> = ({value}) => {
    return (
        <>
            <option value={value}>{value}</option>
        </>
    )
} 

export const Select: React.FC = ({children}) => {
    return (
        <>
            <div className="select-body">
                <select>
                    {children}
                </select>
            </div>
        </>
    )
} 