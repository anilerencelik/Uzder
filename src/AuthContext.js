import React, {useState, createContext} from 'react'

export const AuthContext = createContext()

export const AuthProvider = props => {
    const [apiToken, setApiToken] = useState('')

    return(
        <AuthContext.Provider value={[apiToken, setApiToken]} >
            {props.children}
        </AuthContext.Provider>
    )

}