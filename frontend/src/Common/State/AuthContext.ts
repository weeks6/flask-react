import React from 'react'

export interface User {
    id: string
}

export const AuthContext = React.createContext({} as User)
export const AuthProvider = AuthContext.Provider