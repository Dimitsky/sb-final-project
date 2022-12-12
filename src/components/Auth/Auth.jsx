import React from 'react';

import { LS_TOKEN_KEY, LS_USER_ID_KEY } from '../consts/consts';

const AuthContext = React.createContext( null );

function useAuth() {
    const context = React.useContext( AuthContext );

    if ( !context ) throw new Error('AuthContext must be used with AuthProvider');

    return context;
}

function AuthProvider( { children } ) {
    const [ auth, setAuth ] = React.useState( () => {
        const token = window.localStorage.getItem( LS_TOKEN_KEY );

        return token ? token : null;
    } );
    const [ userId, setUserId ] = React.useState( () => {
        const id = window.localStorage.getItem( LS_USER_ID_KEY );

        return id ? id : null;
    } );

    const login = ( user, calback ) => {
        setAuth( user.token );
        window.localStorage.setItem( LS_TOKEN_KEY, user.token );

        setUserId( user.data._id );
        window.localStorage.setItem( LS_USER_ID_KEY, user.data._id );

        if ( calback && typeof calback === 'function' ) calback();
    };

    const logout = ( calback ) => {
        setAuth( null );
        window.localStorage.removeItem( LS_TOKEN_KEY );

        setUserId( null );
        window.localStorage.removeItem( LS_USER_ID_KEY );

        if ( calback && typeof calback === 'function' ) calback();
    }

    return (
        <AuthContext.Provider value={ { auth, login, logout, userId } }>
            { children }
        </AuthContext.Provider>
    );
}

export {
    AuthProvider, 
    useAuth, 
}