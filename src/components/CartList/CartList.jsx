// my comps
import { GlassBox } from '../../components/GlassBox/GlassBox';
import { CartItem } from '../../components/CartItem/CartItem';

// css
import classes from './cartlist.module.css';

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
                        <GlassBox>
                            <CartItem
                                key={product._id} 
                                data={product} 
                            />
                        </GlassBox>
                    </li>
                ))
            }
        </ul>
    )
}

export {
    CartList, 
}