import { useState, useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Api } from '../Api/Api';
import { LS_TOKEN_KEY, SERVER_GROUP_NAME, BASE_SERVER_URL } from '../consts/consts';

const AuthContext = createContext( null );

function useAuth() {
    const context = useContext( AuthContext );

    if ( !context ) throw new Error('AuthContext must be used with AuthProvider');

    return context;
}

function AuthProvider( { children } ) {
    const [ auth, setAuth ] = useState( () => {
        const token = window.localStorage.getItem( LS_TOKEN_KEY );
 
        return token ? token : null;
    } );

    const login = ( user, calback ) => {
        setAuth( user.token );
        window.localStorage.setItem( LS_TOKEN_KEY, user.token );

        if ( calback && typeof calback === 'function' ) calback();
    };

    const logout = ( calback ) => {
        setAuth( null );
        window.localStorage.removeItem( LS_TOKEN_KEY );

        if ( calback && typeof calback === 'function' ) calback();
    }

    const api = new Api( {
        baseUrl: BASE_SERVER_URL, 
        groupId: SERVER_GROUP_NAME, 
        headers: {
            'Content-Type': 'application/json', 
            'authorization': `Bearer ${ auth }`, 
        }
    } );

    // TanStack Query
    const { data } = useQuery( { 
        queryKey: [ 'getUserData' ], 
        queryFn: () => api.getUserData() 
    } );

    const userData = data || {};

    return (
        <AuthContext.Provider value={ { auth, login, logout, userData } }>
            { children }
        </AuthContext.Provider>
    );
}

export {
    AuthProvider, 
    useAuth, 
}