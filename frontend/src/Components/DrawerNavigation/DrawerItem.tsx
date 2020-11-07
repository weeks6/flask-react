import React from "react"
import { NavLink } from "react-router-dom";
import { Ripple } from "Common/ripple";
import './DrawerNavigation.css'

interface Props {
    to: string,
    ripple: boolean
}

export const DrawerItem: React.FC<Props> = ({to, ripple, children}) => {
    return (
        <>
            <NavLink to={to} className="drawer-item" activeClassName="drawer-item__active" onClick={ripple ? Ripple : undefined}>
            {children}
        </NavLink>
        </>
    )
}