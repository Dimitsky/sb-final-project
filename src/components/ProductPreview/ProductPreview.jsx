import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { LikeButton } from '../LikeBotton/LikeButton';
import { Rating } from '../../components/Rating/Rating';

function ProductPreview( { data: product, user } ) {    
    return (
        <Card className="card">
            <Card.Img
                className="card__img" 
                variant="top"
                src={product.pictures}
            />
            <LikeButton 
                className="card__like-btn"
                productId={product._id}
                isLiked= {product.likes.find( id => id === user._id ) ? true : false}
            />
            <Card.Body>
                <Card.Title>
                    {product.name}
                </Card.Title>
            </Card.Body>
            <div>
                <Link 
                    className=""
                    to={`products/${product._id}`}
                >
                    Подробнее
                </Link>
            </div>
        </Card>
    );
}

export {
    ProductPreview, 
}