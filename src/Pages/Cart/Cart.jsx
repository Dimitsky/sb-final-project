// react
import { useEffect, useState } from 'react';

// react-router-dom
import { Link } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { chooseProduct, decrementProduct, incrementProduct, removeProduct, clearCart } from '../../RTK/slices/cartSlice/cartSlice';

// react query
import { useQueryClient } from '@tanstack/react-query';

// my comps
import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Inner } from '../../components/Inner/Inner';
import { Counter } from '../../components/Counter/Counter';
import { Header } from '../../components/Header/Header';
import { GlassBox } from '../../components/GlassBox/GlassBox';
import { Button } from '../../components/Button/Button';
import { Price } from '../../components/Price/Price';

// my hooks
import { useCartProducts } from '../../hooks/useCartProducts';

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
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const {data, error, status} = useCartProducts();
    // полная цена / с учетом скидки
    const [price, setPrice] = useState({
        full: 0, 
        discounted: 0, 
    });

    // handlers
    
    // кнопка-пустышка оформления заказа
    const handleOrder = () => {
        // отправляем заказ только выбранных товаров
        console.log(cart.filter(cartProduct => cartProduct.isChoosed));
        console.log(price);
        dispatch(clearCart());
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
        <Wrapper className={classes.wrapper}>
            <Inner>
                <Header />
                <div className={classes.layout}>
                    {
                        !cart.length ? <CartPlaceholder /> : 
                            <>
                                <CartList>
                                    {
                                        data.map(product => (
                                            <CartItem
                                                key={product._id} 
                                                data={product} 
                                                cart={cart}
                                            />
                                        ))
                                    }
                                </CartList>
                                {
                                    // если выбранных товаров нет, то скрыть итоговую цену и кнопку "оформить заказ"
                                    !cart.filter(cartProduct => cartProduct.isChoosed).length ? null : 
                                        <TotalBox 
                                            price={price.full}
                                            discountedPrice={price.discounted}
                                        >
                                            <OrderBtn handler={handleOrder} />
                                        </TotalBox>
                                }       
                            </>
                    }
                </div>
            </Inner>
        </Wrapper>
    );
}

function CartList({ children, className, ...restProps }) {
    const cn = className ? [classes.list, className].join(' ') : classes.list;

    return(
        <ul 
            className={cn}
            {...restProps}
        >
            {children}
        </ul>
    )
}

function CartItem({ children, className, data, cart, ...restProps }) {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const cn = className ? [classes.item, className].join(' ') : classes.item;

    // handlers
    // Отметить товар или снять отметку
    const handleChooseProduct = event => {
        const target = event.target;
        const id = target.id;

        dispatch(chooseProduct(id));
    }
    const handleRemove = (id) => {
        // Удаляем продукт из состояния редакса
        dispatch(removeProduct(id));
        // Обновляем кэш tanStack query, чтобы изменения сразу отобразились у клиента
        queryClient.setQueryData(['cart'], data => data.filter(product => product._id !== id));
    };

    return (
        <li 
            className={cn}
            {...restProps}
        >
            <GlassBox className={classes.cardWrap}>
                {/* тут можем отметить товар */}
                <input 
                    className={classes.chooseProduct} 
                    type="checkbox"
                    name={data._id}
                    id={data._id}
                    checked={cart.find(cartProduct => cartProduct.id === data._id).isChoosed}
                    onChange={handleChooseProduct} 
                />
                {/* карточка товара */}
                <div className={classes.card}>
                    <div className={classes.imgWrap}>
                        <img 
                            className={classes.img}
                            src={data.pictures} 
                            alt="Фотография продукта" 
                        />
                    </div>
                    <div className={classes.body}>
                        <h2 className={classes.name}>
                            {data.name}
                        </h2>
                        <Price
                            className={classes.priceWrap} 
                            price={data.price} 
                            discount={data.discount} 
                        />
                        {/* с помощью Counter клиент может изменять количество конкретного товара */}
                        <Counter 
                            // т.к. клиентский ui зависит от данных в tanStack, а количество, которое пользователь хочет купить,
                            // хранится в redux, то приходится для каждого товара из tanStack искать его количество в состоянии redux'а
                            className={classes.counterWrap}
                            count={cart.find(cartProduct => cartProduct.id === data._id).count}
                            maxCount={data.stock}
                            handlerDecrement={() => dispatch(decrementProduct(data._id))}
                            handlerIncrement={() => dispatch(incrementProduct(data._id))}
                        />
                        <div className={classes.removeBtnWrap}>
                            {/* эта кнопка удаляет товар из корзины (так же товар можно удалить из корзины на странице этого товара) */}
                            <Button
                                className={classes.removeBtn}
                                variant="link"
                                type="button"
                                onClick={() => handleRemove(data._id)}
                            >
                                Удалить
                            </Button>
                        </div>
                    </div>
                </div>
            </GlassBox>
        </li>
    )
}


// выводит итоговую цену без скидки, скидку и цену с учетом скидки
function TotalBox({ children, className, price, discountedPrice }) {
    return (
        <GlassBox className={ className ? [classes.total, className].join(' ') : classes.total}>
            <h3 className={classes.price}>
                Цена: <span className={classes.totalInner}>{price}₽</span>
            </h3>
            <h3 className={classes.discount}>
                Скидка: <span className={classes.totalInner}>-{price - discountedPrice}₽</span>
            </h3>
            <h3 className={classes.discountedPrice}>
                Цена со скидкой: <span className={classes.totalInner}>{discountedPrice}₽</span>
            </h3>
            {children}
        </GlassBox>
    )
}

// кнопка-пустышка для офрмления товара
function OrderBtn({handler}) {
    return (
        <Button
            className={classes.orderBtn}
            onClick={handler}
        >
            Оформить заказ
        </Button>
    )
}

// placeholder для корзины если она пуста
function CartPlaceholder() {
    return (
        <GlassBox className={classes.emptyCart}>
            <h2>Ваша корзина пуста</h2>
            <p>
                Ознакомьтесь с ассортиментом товаров в нашем <Link className={classes.link} to="/">Каталоге</Link>!
            </p>
        </GlassBox>
    )
}

export {
    Cart, 
}