// redux
import { useSelector } from 'react-redux';

// my comps
import { getDiscountedPrice } from '../utils/utils';

// css
import classes from './order.module.css';

// кнопка-пустышка для офрмления товара
function Order({ className, onClick, data, ...restProps }) {
    const cn = className ? [classes.order, className].join(' ') : classes.order;

    const cart = useSelector(state => state.cart);

    // handlers
    // 

    // Высчитывает итоговую цену, заказанные товары и «поднимает» свое состояние наверх 
    const handleOnClick = () => {
        const discountedPrice = getDiscountedPrice(cart, data).toFixed(2);
        // Оформляет только выбранные товары
        const selectedProducts = data.filter(product => {
            const cartProduct = cart.find(cartProduct => cartProduct.id === product._id);
            
            return cartProduct.isChoosed;
        });
        
        if (typeof onClick === 'function') onClick(discountedPrice, selectedProducts);
    }

    return (
        <button
            className={cn}
            onClick={handleOnClick}
        >
            Оформить заказ
        </button>
    )
}

export {
    Order, 
}