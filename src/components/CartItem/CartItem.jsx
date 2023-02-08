// redux
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, toggle, removeFromCart } from '../../RTK/slices/cartSlice/cartSlice';

// tanstack
import { useQueryClient } from '@tanstack/react-query';

// my comps
import { Price } from '../Price/Price';
import { Counter } from '../Counter/Counter';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { Badge } from '../Badge/Badge';
import { SoldOut } from '../SoldOut/SoldOut';

// css
import classes from './cartitem.module.css';
import { IconTrash } from '../Icon/Icon';

function CartItem({ className, data, ...restProps }) {
    const cn = className ? [classes.card, className].join(' ') : classes.card;

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const queryClient = useQueryClient();

    // handlers
    // 

    // Отметить товар, либо снять отметку
    const handleToggle = () => {
        dispatch(toggle(data._id));
    }

    // Уменьшить количество товара в корзине 
    const handleDecrement = () => {
        dispatch(decrement(data._id));
    }

    // Увеличить количество товара в корзине 
    const handleIncrement = () => {
        dispatch(increment(data._id));
    }

    // Удалить товар из корзины
    const handleRemove = () => {
        // Удаляем продукт из состояния редакса
        dispatch(removeFromCart(data._id));
        // Обновляем кэш tanStack query, чтобы изменения сразу отобразились у клиента
        queryClient.setQueryData(['cart'], queryData => queryData.filter(product => product._id !== data._id));
    }

    return (
            <div 
                className={cn}
                {...restProps}
            >
                <div className={classes.badgeWrap}>
                    {
                        data.discount ? <Badge text={`-${data.discount}%`} /> : null
                    }
                    {
                        data.tags.includes('new') ? <Badge text={`New`} style={{backgroundColor: 'var(--c-primary)'}} /> : null
                    }
                </div>
                {/* Изображение товара */}
                <div className={classes.img}>
                    <img
                        src={data.pictures} 
                        alt="Фотография продукта" 
                    />
                    {
                        data.available ? (
                            null
                        ) : (
                            <SoldOut className={classes.soldOut} />
                        )
                    }
                </div>
                <div className={classes.body}>
                    {/* Заголовок товара */}
                    <h2 className={classes.name}>
                        {data.name}
                    </h2>
                    <p className={classes.description}>
                        {data.description}
                    </p>
                    {/* эта кнопка удаляет товар из корзины (так же товар можно удалить из корзины на странице этого товара) */}
                    <ButtonIcon
                        className={classes.remove}
                        variant="link"
                        type="button"
                        aria-label="Удалить"
                        onClick={handleRemove}
                    >
                        <IconTrash />
                    </ButtonIcon>
                </div>
                <div className={classes.footer}>
                    {/* тут можем отметить товар */}
                    <input 
                        className={classes.chooseProduct} 
                        type="checkbox"
                        name={data._id}
                        id={data._id}
                        checked={
                            data.available ? (
                                cart.find(cartProduct => cartProduct.id === data._id).isChoosed
                            ) : (
                                false
                            )
                        }
                        disabled={data.available ? null : true}
                        onChange={handleToggle} 
                    />
                    {
                        data.available ? (
                            <Counter 
                                // т.к. клиентский ui зависит от данных в tanStack, а количество, которое пользователь хочет купить,
                                // хранится в redux, то приходится для каждого товара из tanStack искать его количество в состоянии redux'а
                                className={classes.counter}
                                count={cart.find(cartProduct => cartProduct.id === data._id).count}
                                maxCount={data.stock}
                                handlerDecrement={handleDecrement}
                                handlerIncrement={handleIncrement}
                            />
                        ) : (
                            null
                        )
                    }
                    {/* Выводит цену товара (если есть скидка, то выводится две цены – со скидкой и без) */}
                    <Price
                        className={classes.price} 
                        price={data.price * cart.find(cartProduct => cartProduct.id === data._id).count} 
                        discount={data.discount} 
                        singlPrice={true}
                    />
                </div>
            </div>
    )
}

export {
    CartItem, 
}