// redux
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

import { Badge } from '../Badge/Badge';
import { Price } from '../Price/Price';
import { LikeButton } from '../LikeBotton/LikeButton';

import { Rating } from '../../components/Rating/Rating';

import { useAuth } from '../../components/Auth/Auth';
import { useUser } from '../../hooks/useUser';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';
import { Container } from 'react-bootstrap';

const maxNameLength = 40;

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