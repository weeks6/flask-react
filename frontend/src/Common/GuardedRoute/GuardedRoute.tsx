import { AuthContext } from 'Common/State/AuthContext'
import React, { Component, useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

interface Props {
    path: string,
    rest?: any
}

export const GuardedRoute: React.FC<Props> = ({children, path, ...rest }) => {

    const isAuth = localStorage.getItem('actk')
    
    return (
        <Route {...rest} path={path} render={() => (
            isAuth ? children : <Redirect to='/signin'/>
        )} />
    )
}


    