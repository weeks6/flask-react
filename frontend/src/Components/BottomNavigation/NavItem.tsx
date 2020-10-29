import React from "react"
import { NavLink } from "react-router-dom"
import "./BottomNav.css"
import { Ripple } from "Common/ripple"

interface Props {
    to: string
    ripple?: boolean
}

export const NavItem: React.FC<Props> = ({to, ripple, children}) => {
    return (
        <NavLink to={to} className="navlink" activeClassName="navlink-active" onClick={ripple ? Ripple : undefined}>
            {children}
        </NavLink>
    )
}