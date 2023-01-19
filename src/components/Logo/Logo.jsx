// react router dom
import { Link } from 'react-router-dom';

// my comps
import { GlassBox } from '../GlassBox/GlassBox';

// css module
import classes from './logo.module.css';

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