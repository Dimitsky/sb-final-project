// react router dom
import { Link } from 'react-router-dom';

// my comps
import { GlassBox } from '../GlassBox/GlassBox';

// css module
import './logo.css';

function Logo( { className, children, ...restProps } ) {
    const cn = (className ? ['logo', className] : ['logo']).join(' ');

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