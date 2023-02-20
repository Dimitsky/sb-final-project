// react router dom
import { Link } from 'react-router-dom';

// css module
import classes from './Logo.module.css';

function Logo( { className, children, ...restProps } ) {
    const cn = className ? [classes.logo, className].join(' ') : classes.logo;

    return (
        <Link 
            className={cn}
            to="/"
            {...restProps}
        >
            DogFood
        </Link>
    );
}

export {
    Logo, 
}