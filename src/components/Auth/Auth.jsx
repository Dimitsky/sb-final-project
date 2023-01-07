import { useState, useContext, createContext } from 'react';

import { LS_TOKEN_KEY } from '../consts/consts';

const AuthContext = createContext( null );

function useAuth() {
    const context = useContext( AuthContext );

    if ( !context ) throw new Error('AuthContext must be used with AuthProvider');

    return context;
}

function AuthProvider( { children } ) {
    const [ auth, setAuth ] = useState( () => JSON.parse(localStorage.getItem( LS_TOKEN_KEY )) || null );

    const login = ( token ) => {
        setAuth( token );
        window.localStorage.setItem( LS_TOKEN_KEY, JSON.stringify(token) );
    };

    const logout = () => {
        setAuth( null );
        window.localStorage.removeItem( LS_TOKEN_KEY );
    }

    return (
        <AuthContext.Provider value={ { auth, login, logout } }>
            { children }
        </AuthContext.Provider>
    );
}

export {
    AuthProvider, 
    useAuth, 
}