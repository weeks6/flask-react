import React, {useContext} from 'react'
import {AuthContext} from 'Common/State/AuthContext'



export const Projects: React.FC = () => {

    const user = useContext(AuthContext)
    

    return (
        <>
            <div>
                User id is {user.id}
            </div>
        </>
    )
}