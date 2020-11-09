import { AuthContext } from 'Common/State/AuthContext'
import React, { useContext } from 'react'

export const Profile: React.FC = () => {

    const user = useContext(AuthContext)

    return (
        <>
            <p>Profile</p>
            <p>your user name is {user.name}</p>
        </>
    )
}