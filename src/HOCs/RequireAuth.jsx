// redux
import { useSelector } from 'react-redux';

// react router dom
import { Navigate } from 'react-router-dom';

function RequireAuth( { children } ) {
    const token = useSelector(state => state.token);

    if (!token) return <Navigate to="/signin" />;

    return children;
}

export {
    RequireAuth, 
}