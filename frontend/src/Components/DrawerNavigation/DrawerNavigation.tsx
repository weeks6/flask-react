import React from 'react'

export const DrawerNavigation: React.FC = ({children}) => {
    return (
        <>
            <div className="drawer">
                {children}
            </div>
        </>
    )
}