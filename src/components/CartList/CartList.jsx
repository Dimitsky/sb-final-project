// my comps
import { CartItem } from '../../components/CartItem/CartItem';

// css
import classes from './CartList.module.css';

function CartList({ className, data, ...restProps }) {
    const cn = className ? [classes.list, className].join(' ') : classes.list;

    return (
        <ul 
            className={cn}
            {...restProps}
        >
            {
                data.map(product => (
                    <li 
                        key={product._id}
                        className={classes.item}
                    >
                        <CartItem
                            key={product._id} 
                            data={product} 
                        />
                    </li>
                ))
            }
        </ul>
    )
}

export {
    CartList, 
}