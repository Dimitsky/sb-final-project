// redux
import { useSelector } from 'react-redux';

// my comps
import { getFullPrice, getDiscountedPrice } from '../utils/utils';

// css
import classes from './total.module.css';

function Total({ className, data, ...restProps }) {
    const cart = useSelector(state => state.cart);
    const cn = className ? [classes.total, className].join(' ') : classes.total;

    const fullPrice = getFullPrice(cart, data);
    const discountedPrice = getDiscountedPrice(cart, data);

    return (
        <div
            className={cn}
            {...restProps}
        >
            <h3 className={classes.price}>
                {'Цена: '}
                <span className={classes.totalInner}>
                    {fullPrice.toFixed(2)}₽
                </span>
            </h3>
            <h3 className={classes.discount}>
                {'Скидка: '}
                <span className={classes.totalInner}>
                    -{(fullPrice - discountedPrice).toFixed(2)}₽
                </span>
            </h3>
            <h3 className={classes.discountedPrice}>
                {'Цена со скидкой: '}
                <span className={classes.totalInner}>
                    {discountedPrice.toFixed(2)}₽
                </span>
            </h3>
        </div>
    )
}

export {
    Total, 
}