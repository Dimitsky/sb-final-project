// redux
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../RTK/slices/cartSlice/cartSlice';


// my comps
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { IconCart, IconCartDash } from '../Icon/Icon';

// css
import classes from './CartButton.module.css';

function CartButton({ className, productId, showText = false, ...restProps }) {
    const cn = className ? [classes.button, className] : [classes.button];
    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();

    // handlers
    // 

    // Добавить товар в корзину
    const handleAddToCart = () => {
        dispatch(addToCart(productId));
    }

    // Убрать товар из корзины 
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(productId));
    }

    return (
        <>
            {
                cart.find(cartProduct => cartProduct.id === productId) ? (
                    <ButtonIcon 
                        className={[...cn, classes.delete].join(' ')}
                        {...restProps}
                        aria-label="Убрать из корзины"
                        onClick={handleRemoveFromCart}
                    >
                        <IconCartDash />
                        {
                            showText ? (
                                <span className={classes.text}>Из корзины</span>
                            ) : (
                                null
                            )
                        }
                    </ButtonIcon> 
                ) : (
                    <ButtonIcon 
                        className={[...cn, classes.add].join(' ')}
                        aria-label="Положить в корзину"
                        onClick={handleAddToCart}
                    >
                        <IconCart />
                        {
                            showText ? (
                                <span className={classes.text}>В корзину</span>
                            ) : (
                                null
                            )
                        }
                    </ButtonIcon>
                )
            }
        </>
    )
}

export {
    CartButton, 
}