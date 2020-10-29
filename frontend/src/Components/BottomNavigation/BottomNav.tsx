import React from "react"
import "./BottomNav.css"

interface Props {
    
}

export const BottomNav: React.FC<Props> = ({children}) => {
    return (
        <div className="nav-wrapper">
            {children}
        </div>
    )
}