// redux
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../../redux/actionsCreators/cartAC';

// my comps
import { BackButton } from '../../components/BackButton/BackButton';
import { LikeButton } from '../../components/LikeBotton/LikeButton';

// my hooks
import { useProduct } from '../../hooks/useProduct';
import { useUser } from '../../hooks/useUser';

// css
import './productpage.css';

function ProductPage() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { data: product, error, status } = useProduct();
    const { data: user } = useUser();

    // handlers
    const handleAddToCart = () => {
        dispatch(addProduct(product._id));
    }
    const handleRemoveFromCart = () => {
        dispatch(removeProduct(product._id));
    }

    if ( status === 'loading') {
        return (
            <div className="container">
                Загрузка...
            </div>
        );
    }

    if ( status === 'error' ) {
        return (
            <div className="container">
                { error.message }
            </div>
        );
    }
    
    return (
        <div className="container">
            <div className="">
                <div className="detailed-card__header">
                    <BackButton />
                    <LikeButton 
                        className="detailed-card__like-btn"
                        productId={product._id}
                        isLiked={product.likes.find( id => id === user._id ) ? true : false}
                    />
                </div>
                <div>
                    <img
                        className="detailed-card__img"
                        src={product.pictures}
                    />
                </div>
                <div className="">
                    <h2 className="">
                        {product.name}
                    </h2>
                    {
                        cart.find(cartProduct => cartProduct.id === product._id) ? 
                            <RemoveProductFromCartButton handler={handleRemoveFromCart} /> : 
                            <AddProductToCartButton handler={handleAddToCart} />
                    }
                </div>
            </div>
        </div>
    );
}

function AddProductToCartButton({handler}) {
    return (
        <button 
            className=""
            type="button"
            onClick={handler}
        >
            Добавить в корзину
        </button>
    )
}

function RemoveProductFromCartButton({handler}) {
    return (
        <button 
            className=""
            type="button"
            onClick={handler}
        >
            Удалить из корзины
        </button>
    )
}

export {
    ProductPage, 
}