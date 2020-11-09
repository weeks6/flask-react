import React, { ComponentProps } from 'react'
import {ReactComponent as AddIcon} from 'Images/Icons/add-24px.svg'

import 'Components/Controls/AddFab.css'
import { Ripple } from 'Common/ripple'


export const AddFab: React.FC<{onClick: any}> = ({onClick}) => {
    return (
        <div>
           <button className="fab_new-item" onClick={onClick}>
                <AddIcon />
            </button> 
        </div>
        
    )
}