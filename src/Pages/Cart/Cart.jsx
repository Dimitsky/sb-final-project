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

    const {data, error, status} = useCartProducts();

    // handlers
    const handleRemove = (id) => {
        // Удаляем продукт из состояния редакса
        dispatch(removeProduct(id));
        // Обновляем кэш tanStack query, чтобы изменения сразу отобразились у клиента
        queryClient.setQueryData(['cart'], data => data.filter(product => product._id !== id));
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
                data.map(product => (
                    <div
                        className={classes.card}
                        key={product._id}
                    >
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
                            <Counter 
                                count={cart.find(cartProduct => cartProduct.id === product._id).count}
                                maxCount={product.stock}
                                handlerDecrement={() => dispatch(decrementProduct(product._id))}
                                handlerIncrement={() => dispatch(incrementProduct(product._id))}
                            />
                            <div className={classes.btnWrap}>
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
                ))
            }
            {
                !cart.length ? null : 
                    <TotalBox 
                        price={
                            cart.reduce((acc, cartProduct) => {
                                const dataProduct = data.find(product => product._id === cartProduct.id);
                                const price = dataProduct.price;

                                acc += price * cartProduct.count
                                
                                return acc;
                            }, 0)
                        }
                        discountedPrice={
                            cart.reduce((acc, cartProduct) => {
                                const dataProduct = data.find(product => product._id === cartProduct.id);
                                const price = dataProduct.price;
                                const discount = dataProduct.discount || null;

                                acc += discount ? (price - (price / 100 * discount)) * cartProduct.count : price * cartProduct.count;

                                return acc;
                            }, 0)
                        }
                    />
            }
        </div>
    );
}

function TotalBox({className, price, discountedPrice}) {
    return (
        <div className={ className ? [classes.total, className].join(' ') : classes.total}>
            <h2 className={classes.price}>{price}</h2>
            <h2 className={classes.discount}>-{price - discountedPrice}</h2>
            <h2 className={classes.discountedPrice}>{discountedPrice}</h2>
        </div>
    )
}

export {
    Cart, 
}