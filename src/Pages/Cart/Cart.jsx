// redux
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { removeProduct } from '../../redux/actionsCreators/cartAC';

// react query
import { useQueryClient } from '@tanstack/react-query';

// my comps
import { useCartProducts } from '../../hooks/useCartProducts';

// css module
import classes from './cart.module.css';

function Cart() {
    const dispatch = useDispatch();
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
                            <button
                                className={classes.removeBtn}
                                type="button"
                                onClick={() => handleRemove(cartProduct._id)}
                            >
                                Удалить
                            </button>
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