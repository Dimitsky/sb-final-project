import { Link } from 'react-router-dom';
import { LikeButton } from '../LikeBotton/LikeButton';
import { Rating } from '../../components/Rating/Rating';

function ProductPreview( { data: product, user } ) {    
    return (
        <div className="card">
            <img
                className="card__img" 
                src={product.pictures}
            />
            <LikeButton 
                className="card__like-btn"
                productId={product._id}
                isLiked= {product.likes.find( id => id === user._id ) ? true : false}
            />
            <div>
                <h2>
                    {product.name}
                </h2>
            </div>
            <div>
                <Link 
                    className=""
                    to={`products/${product._id}`}
                >
                    Подробнее
                </Link>
            </div>
        </div>
    );
}

export {
    ProductPreview, 
}