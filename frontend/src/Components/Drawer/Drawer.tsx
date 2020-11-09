import React from 'react'
import 'Components/Drawer/Drawer.css'

interface Props {
    active: boolean,
    setDrawer: any
}

export const Drawer: React.FC<Props> = ({active, children, setDrawer}) => {

    return (
        <>
            <div className={active ? 'drawer-body drawer-body__active' : 'drawer-body'}>
                    {children}
            </div>
            <div className={active ? 'drawer drawer__active drawer-background' : 'drawer drawer-background'} onClick={() => {
                setDrawer({active: false})
            }}></div>
        </>
    )
}

interface DrawerTitleProps {
    text: string
}

export const DrawerTitle: React.FC<DrawerTitleProps> = ({text}) => {
    return (
        <>
            <h1 className="drawer-title">{text}</h1>
        </>
    )
}