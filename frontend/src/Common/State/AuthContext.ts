import React from 'react'

export interface User {
    email: string,
    name: string
}

export let AuthContext = React.createContext({} as User)
export const AuthProvider = AuthContext.Provider