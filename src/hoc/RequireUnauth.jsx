import { Navigate } from "react-router-dom";

import { useAuth } from "../components/Auth/Auth";

function RequireUnauth( { children } ) {
    const { auth } = useAuth();

    if ( auth ) return <Navigate to="/profile" />

    return children;
}

export {
    RequireUnauth, 
}