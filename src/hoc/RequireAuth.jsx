import { Navigate } from 'react-router-dom';

import { useAuth } from '../components/Auth/Auth';

function RequireAuth( { children } ) {
    const { auth } = useAuth();

    if ( !auth ) return <Navigate to="/signin" />;

    return children;
}

export {
    RequireAuth, 
}