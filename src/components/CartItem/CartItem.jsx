// redux
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, toggle, remove } from '../../RTK/slices/cartSlice/cartSlice';

// tanstack
import { useQueryClient } from '@tanstack/react-query';

// my comps
import { Card, CardImg, CardBody, CardTitle } from '../Card/Card';
import { Price } from '../Price/Price';
import { Counter } from '../Counter/Counter';
import { Button } from '../Button/Button';

// css
import classes from './cartitem.module.css';

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
        dispatch(remove(data._id));
        // Обновляем кэш tanStack query, чтобы изменения сразу отобразились у клиента
        queryClient.setQueryData(['cart'], queryData => queryData.filter(product => product._id !== data._id));
    }

    return (
            <Card 
                className={cn}
                {...restProps}
            >
                {/* тут можем отметить товар */}
                <input 
                    className={classes.chooseProduct} 
                    type="checkbox"
                    name={data._id}
                    id={data._id}
                    checked={cart.find(cartProduct => cartProduct.id === data._id).isChoosed}
                    onChange={handleToggle} 
                />
                {/* Изображение товара */}
                <CardImg 
                    className={classes.img}
                    src={data.pictures}
                />
                <CardBody>
                    {/* Заголовок товара */}
                    <CardTitle 
                        className={classes.name}
                        text={data.name} 
                    />
                    {/* Выводит цену товара (если есть скидка, то выводится две цены – со скидкой и без) */}
                    <Price
                        className={classes.price} 
                        price={data.price} 
                        discount={data.discount} 
                    />
                    {/* с помощью Counter клиент может изменять количество конкретного товара */}
                    <Counter 
                        // т.к. клиентский ui зависит от данных в tanStack, а количество, которое пользователь хочет купить,
                        // хранится в redux, то приходится для каждого товара из tanStack искать его количество в состоянии redux'а
                        className={classes.counter}
                        count={cart.find(cartProduct => cartProduct.id === data._id).count}
                        maxCount={data.stock}
                        handlerDecrement={handleDecrement}
                        handlerIncrement={handleIncrement}
                    />
                    <div className={classes.removeBtnWrap}>
                        {/* эта кнопка удаляет товар из корзины (так же товар можно удалить из корзины на странице этого товара) */}
                        <Button
                            className={classes.removeBtn}
                            variant="link"
                            type="button"
                            onClick={handleRemove}
                        >
                            Удалить
                        </Button>
                    </div>
                </CardBody>
            </Card>
    )
}

export {
    CartItem, 
}