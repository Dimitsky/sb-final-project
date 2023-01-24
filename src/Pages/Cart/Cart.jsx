// react 
import { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../RTK/slices/cartSlice/cartSlice';

// react-router-dom
import { Link } from 'react-router-dom';

// my comps
import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Inner } from '../../components/Inner/Inner';
import { Header } from '../../components/Header/Header';
import { GlassBox } from '../../components/GlassBox/GlassBox';
import { Placeholder } from '../../components/Placeholder/Placeholder';
import { CartList } from '../../components/CartList/CartList';
import { Total } from '../../components/Total/Total';
import { Order } from '../../components/Order/Order';
import { Check } from '../../components/Check/Check';

// my hooks
import { useCartProducts } from '../../hooks/useCartProducts';

// css module
import classes from './cart.module.css';

// Заголовок и текст для плейсхолдера, если корзина будет пуста
const placeholderTitle = 'Ваша корзина пуста';
const placeholderText = <>Ознакомьтесь с ассортиментом товаров в нашем <Link className={classes.link} to="/">Каталоге!</Link></>

function Cart() {
    // Состояние я использовал для вывода чека после оформление заказа. 
    // Processed означает, что заказ оформлен. Not placed значит еще нет. 
    // В зависимости от этого статуса компонент рендерит разные части интерфейса, 
    // а так же использует данные из состояния для вывода чека после покупки 
    const [order, setOrder] = useState({
        status: 'not placed', 
    });
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { data, error, status } = useCartProducts();

    // handlers
    // 

    // После оформления обновить состояние (чтобы вывести чек) и очистить корзину
    const handleOrder = (price, products) => {
        setOrder({
            status: 'processed', 
            price, 
            products, 
        });

        dispatch(clearCart());
    }
    
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
                        // Если корзина пуста и заказ не оформлен, то вывести плейсхолдер, иначе список товаров
                        // Второе условие нужно, чтобы при пустой корзине и оформленном заказе вывести чек
                        !cart.length && order.status === 'not placed' ? 
                            <GlassBox className={classes.placeholderWrap}>
                                <Placeholder 
                                    title={placeholderTitle}
                                    text={placeholderText}
                                />
                            </GlassBox> :
                            // если заказ оформлен, то вывести чек, иначе вывести корзину и виджет оформления заказа
                            order.status === 'processed' ? 
                                <GlassBox className={classes.check}>
                                    <Check 
                                        products={order.products}
                                        price={order.price}
                                    />
                                </GlassBox> : 
                                <>
                                    <CartList 
                                        data={data}

                                    />
                                    {
                                        // все товары в корзине отмечены «не выбрано», то спрятать виджет оформления заказа
                                        cart.every(cartProduct => !cartProduct.isChoosed) ? 
                                            null : 
                                            <GlassBox className={classes.totalWrap}>
                                                <Total data={data} />
                                                <Order 
                                                    data={data} 
                                                    onClick={handleOrder}
                                                />
                                            </GlassBox>
                                    }
                                </>
                    }
                </div>
            </Inner>
        </Wrapper>
    );
}

export {
    Cart, 
}