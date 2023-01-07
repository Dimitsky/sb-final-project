// redux
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    const token = useSelector(state => state.token);
    const queryClient = useQueryClient();

    const handleLike = isLiked => {
        const api = new Api( {
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${ token }`, 
            }
        } )

        /*
            Чтобы не дублировать код подписчиков на промисы, выбираем метод в зависимости от состояния кнопки-лайк, 
            а затем подключаем подписчиков.
        */
        const promise = isLiked ? api.setProductLike( product._id ) : api.removeProductLike( product._id );

        return promise.then()
    }

    const mutation = useMutation( {
        mutationKey: ['product', {id: product._id}], 
        mutationFn: handleLike, 
        onSuccess: (data) => {
            /*
                Вручную обновляем состояние клиентских данных. 
                Ищем продукт которому мы поставили лайк и заменяем его обновленной версией, которую нам вернул сервер.
            */
            queryClient.setQueryData(['products'], (previous) => 
                previous.map((prevProduct) => 
                    prevProduct._id === product._id ? data : prevProduct
                )
            );
        }
    } );

    return (
        <Card className="card">
            <Card.Img
                className="card__img" 
                variant="top"
                src={product.pictures}
            />
            <LikeButton 
                className="card__like-btn"
                isLiked= { product.likes.find( id => id === user._id ) }
                handler={ mutation.mutate }
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