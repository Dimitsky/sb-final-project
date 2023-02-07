// redux
import { useSelector } from 'react-redux';

// react router dom 
import { Link } from 'react-router-dom';

// my comps
import { IconCart } from '../Icon/Icon';

// css 
import classes from './CartLink.module.css';

function CartLink({ className, children, ...restProps }) {
    const cn = className ? [classes.link, className].join(' ') : classes.link;

    const cart = useSelector(state => state.cart);

    return (
        <Link
            className={cn}
            to="/cart"
            {...restProps}
        >
            <IconCart className={classes.icon} />
            {cart.length}
        </Link>
    )
}

export {
    CartLink, 
}