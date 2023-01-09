// redux
import { useDispatch, useSelector } from 'react-redux';
import { decrementProduct, incrementProduct, removeProduct } from '../../redux/actionsCreators/cartAC';

// react query
import { useQueryClient } from '@tanstack/react-query';

// my comps
import { useCartProducts } from '../../hooks/useCartProducts';
import { Counter } from '../../components/Counter/Counter';

// css module
import classes from './cart.module.css';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const queryClient = useQueryClient();
    const {data: cartProducts, error, status} = useCartProducts();

    // handlers
    const handleRemove = (id) => {
        // Удаляем продукт из состояния редакса
        dispatch(removeProduct(id));
        // Обновляем кэш tanStack query, чтобы изменения сразу отобразились у клиента
        queryClient.setQueryData(['cart'], cartProducts => cartProducts.filter(cartProduct => cartProduct._id !== id));
    };

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

            {
                cartProducts.map(cartProduct => (
                    <div
                        className={classes.card}
                        key={cartProduct._id}
                    >
                        <div className={classes.imgWrap}>
                            <img 
                                className={classes.img}
                                src={cartProduct.pictures} 
                                alt="Фотография продукта" 
                            />
                        </div>
                        <div className={classes.body}>
                            <h2 className={classes.name}>{cartProduct.name}</h2>
                            <span className={classes.price}>{cartProduct.price}₽</span>
                            <Counter 
                                count={cart.find(product => product.id === cartProduct._id).count}
                                maxCount={cartProduct.stock}
                                handlerDecrement={() => dispatch(decrementProduct(cartProduct._id))}
                                handlerIncrement={() => dispatch(incrementProduct(cartProduct._id))}
                            />
                            <div className={classes.btnWrap}>
                                <button
                                    className={classes.removeBtn}
                                    type="button"
                                    onClick={() => handleRemove(cartProduct._id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export {
    Cart, 
}