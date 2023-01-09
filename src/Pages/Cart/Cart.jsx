// my comps
import { useCartProducts } from '../../hooks/useCartProducts';

function Cart() {
    const {data: cartProducts, error, status} = useCartProducts();

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
                        key={cartProduct._id}
                    >
                        <h2>{cartProduct.name}</h2>
                    </div>
                ))
            }
        </div>
    );
}

export {
    Cart, 
}