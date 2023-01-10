// react
import { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { chooseProduct, decrementProduct, incrementProduct, removeProduct } from '../../redux/actionsCreators/cartAC';

// react query
import { useQueryClient } from '@tanstack/react-query';

// my comps
import { useCartProducts } from '../../hooks/useCartProducts';
import { Counter } from '../../components/Counter/Counter';

// css module
import classes from './cart.module.css';

// считает полную цену
function getFullPrice(cart, data) {
    return cart.reduce((acc, cartProduct) => {
        // считает только выбранные товары
        if (!cartProduct.isChoosed) return acc;
    
        // найти данные для товара в корзине
        const dataProduct = data.find(product => product._id === cartProduct.id);
        const price = dataProduct.price;
    
        // цена * на количество
        acc += price * cartProduct.count
        
        return acc;
    }, 0)
}

// считает цену с учетом скидки
function getDiscountedPrice(cart, data) {
    return cart.reduce((acc, cartProduct) => {
        // считает только выбранные товары
        if (!cartProduct.isChoosed) return acc;

        // найти данные для товара в корзине
        const dataProduct = data.find(product => product._id === cartProduct.id);
        // цена
        const price = dataProduct.price;
        // скидка (если есть)
        const discount = dataProduct.discount || null;

        // если скидка есть, то от цены отнять скидку и умножить на количество товаров
        // либо просто цена * на количество
        acc += discount ? (price - (price / 100 * discount)) * cartProduct.count : price * cartProduct.count;

        return acc;
    }, 0)
}

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const queryClient = useQueryClient();
    const {data, error, status} = useCartProducts();
    // полная цена / с учетом скидки
    const [price, setPrice] = useState({
        full: 0, 
        discounted: 0, 
    });

    // handlers
    // 
    const handleRemove = (id) => {
        // Удаляем продукт из состояния редакса
        dispatch(removeProduct(id));
        // Обновляем кэш tanStack query, чтобы изменения сразу отобразились у клиента
        queryClient.setQueryData(['cart'], data => data.filter(product => product._id !== id));
    };
    // Отметить товар или снять отметку
    const handleChooseProduct = event => {
        const target = event.target;
        const id = target.id;

        dispatch(chooseProduct(id));
    }
    // кнопка-пустышка оформления заказа
    const handleOrder = () => {
        // отправляем заказ только выбранных товаров
        console.log(cart.filter(cartProduct => cartProduct.isChoosed));
        console.log(price);
    }

    useEffect(() => {
        // если пришли данные с бэка
        if (!data) return;

        // обновить итоговые цены
        setPrice({
            full: getFullPrice(cart, data), 
            discounted: getDiscountedPrice(cart, data), 
        })
        // cart в зависимости нужен, чтобы пересчитывать итоговую цену, 
        // когда пользователь изменяет количество товаров
    }, [data, cart]);

    if (status === 'loading') return (
        <div className="container">
            Загрузка...
        </div>
    )

    if (status === 'error') return (
        <div className="container">
            {error.message}
        </div>
    )

    return (
        <div className="container">
            <ul className={classes.list}>
                {
                    data.map(product => (
                        <li 
                            className={classes.item}
                            key={product._id}
                        >
                            {/* тут можем отметить товар */}
                            <input 
                                className={classes.chooseProduct} 
                                type="checkbox"
                                name={product._id}
                                id={product._id}
                                checked={cart.find(cartProduct => cartProduct.id === product._id).isChoosed}
                                onChange={handleChooseProduct} 
                            />
                            {/* карточка товара */}
                            <div className={classes.card}>
                                <div className={classes.imgWrap}>
                                    <img 
                                        className={classes.img}
                                        src={product.pictures} 
                                        alt="Фотография продукта" 
                                    />
                                </div>
                                <div className={classes.body}>
                                    <h2 className={classes.name}>{product.name}</h2>
                                    <span className={classes.price}>{product.price}₽</span>
                                    {/* с помощью Counter клиент может изменять количество конкретного товара */}
                                    <Counter 
                                        // т.к. клиентский ui зависит от данных в tanStack, а количество, которое пользователь хочет купить,
                                        // хранится в redux, то приходится для каждого товара из tanStack искать его количество в состоянии redux'а
                                        count={cart.find(cartProduct => cartProduct.id === product._id).count}
                                        maxCount={product.stock}
                                        handlerDecrement={() => dispatch(decrementProduct(product._id))}
                                        handlerIncrement={() => dispatch(incrementProduct(product._id))}
                                    />
                                    <div className={classes.btnWrap}>
                                        {/* эта кнопка удаляет товар из корзины (так же товар можно удалить из корзины на странице этого товара) */}
                                        <button
                                            className={classes.removeBtn}
                                            type="button"
                                            onClick={() => handleRemove(product._id)}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            {
                // если выбранных товаров нет, то скрыть итоговую цену и кнопку "оформить заказ"
                !cart.filter(cartProduct => cartProduct.isChoosed).length ? null : 
                    <div className={classes.orderWrap}>
                        <TotalBox 
                            price={price.full}
                            discountedPrice={price.discounted}
                        />
                        <OrderBtn handler={handleOrder} />
                    </div>
            }
        </div>
    );
}

// выводит итоговую цену без скидки, скидку и и цену с учетом скидки
function TotalBox({className, price, discountedPrice}) {
    return (
        <div className={ className ? [classes.total, className].join(' ') : classes.total}>
            <h2 className={classes.price}>Цена: {price}₽</h2>
            <h2 className={classes.discount}>Скидка: -{price - discountedPrice}₽</h2>
            <h2 className={classes.discountedPrice}>Цена со скидкой: {discountedPrice}₽</h2>
        </div>
    )
}

// кнопка-пустышка для офрмления товара
function OrderBtn({handler}) {
    return (
        <button
            className={classes.orderBtn}
            onClick={handler}
        >
            Оформить заказ
        </button>
    )
}

export {
    Cart, 
}