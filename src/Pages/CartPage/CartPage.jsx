// react 
import { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../RTK/slices/cartSlice/cartSlice';

// react-router-dom
import { Link } from 'react-router-dom';

// my comps
import { Header } from '../../components/Header/Header';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartLink } from '../../components/CartLink/CartLink';
import { Logo } from '../../components/Logo/Logo';
import { Placeholder } from '../../components/Placeholder/Placeholder';
import { CartList } from '../../components/CartList/CartList';
import { Total } from '../../components/Total/Total';
import { Order } from '../../components/Order/Order';
import { Check } from '../../components/Check/Check';

// my hooks
import { useCartProducts } from '../../hooks/useCartProducts';

// css module
import classes from './CartPage.module.css';

// Заголовок и текст для плейсхолдера, если корзина будет пуста
const placeholderTitle = 'Ваша корзина пуста';
const placeholderText = <>Ознакомьтесь с ассортиментом товаров в нашем <Link className={classes.link} to="/">Каталоге!</Link></>

function CartPage() {
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
        <>
            <Header>
                <BackButton text="Назад" />
                <Logo />
                <CartLink />
            </Header>
            {
                // Если корзина пуста и заказ не оформлен, то вывести плейсхолдер, иначе список товаров
                // Второе условие нужно, чтобы при пустой корзине и оформленном заказе вывести чек
                !cart.length && order.status === 'not placed' ? (
                    <Placeholder 
                        title={placeholderTitle}
                        text={placeholderText}
                    />
                ) : (
                    // если заказ оформлен, то вывести чек, иначе вывести корзину и виджет оформления заказа
                    order.status === 'processed' ? (
                        <Check 
                            products={order.products}
                            price={order.price}
                        />
                    ) : (
                        <>
                            <CartList 
                                data={data}

                            />
                            {
                                // все товары в корзине отмечены «не выбрано», то спрятать виджет оформления заказа
                                cart.every(cartProduct => !cartProduct.isChoosed) ? (
                                    null
                                ) : (
                                    <div className={classes.totalWrap}>
                                        <Total 
                                            className={classes.total}
                                            data={data} 
                                        />
                                        <Order 
                                            className={classes.order}
                                            data={data} 
                                            onClick={handleOrder}
                                        />
                                    </div>
                                )
                                     
                            }
                        </>
                    )
                )
            }
        </>
    );
}

export {
    CartPage, 
}