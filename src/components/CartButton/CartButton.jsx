// redux
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../RTK/slices/cartSlice/cartSlice';


// my comps
import { Button } from '../Button/Button';

// css
import classes from './CartButton.module.css';

function CartButton({ className, productId, ...restProps }) {
    const cn = className ? [classes.button, className].join(' ') : classes.button;

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
                cart.find(cartProduct => cartProduct.id === productId) ? 
                    <Button 
                        className={cn}
                        {...restProps}
                        variant="outline"
                        type="button"
                        onClick={handleRemoveFromCart}
                    >
                        В корзине
                    </Button> :
                    <Button 
                        className={cn}
                        {...restProps}
                        type="button"
                        onClick={handleAddToCart}
                    >
                        В корзину
                    </Button>
            }
        </>
    )
}

export {
    CartButton, 
}