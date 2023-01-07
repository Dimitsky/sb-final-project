// redux
import { useSelector } from 'react-redux';

// react router dom
import { Navigate } from "react-router-dom";

function RequireUnauth( { children } ) {
    const token = useSelector(state => state.token);

    if ( token ) return <Navigate to="/profile" />

    return children;
}

export {
    RequireUnauth, 
}