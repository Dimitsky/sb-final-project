import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { Badge } from '../Badge/Badge';
import { Price } from '../Price/Price';
import { LikeButton } from '../LikeBotton/LikeButton';
import classes from './ProductPreview.module.css';

import { Rating } from '../../components/Rating/Rating';

import { useAuth } from '../../components/Auth/Auth';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';
import { productIsLiked, cutString } from '../../components/utils/utils';

const maxNameLength = 40;

function ProductPreview( { data } ) {
    const [ product, setProduct ] = useState( data );
    const { auth, userData } = useAuth();

    const handleLike = isLiked => {
        const api = new Api( {
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${ auth }`, 
            }
        } )

        /*
            Чтобы не дублировать код подписчиков на промисы, выбираем метод в зависимости от состояния кнопки-лайк, 
            а затем подключаем подписчиков.
        */
        const promise = isLiked ? api.setProductLike( product._id ) : api.removeProductLike( product._id );

        promise.then( result => setProduct( result ) )
            .catch( error => {
                alert( error );
            })
    }

    const mutation = useMutation( {
        mutationFn: handleLike, 
    } );

    return (
        <div 
            className={ classes.product }
            id={ product._id }
            href={ `/products/${ product._id }` }
        >
            <div className={ classes.imageWrapper }>
                <img 
                    className={ classes.image } 
                    src={ product.pictures } 
                    alt="Фотография товара" 
                />
                <LikeButton 
                    className={ classes.like }
                    isLiked= { productIsLiked( product, userData ? userData._id : null ) }
                    handler={ mutation.mutate }
                />
                <Link 
                    className={ classes.imageLink }
                    to={ `products/${ product._id }` }
                />
            </div>
            <div className={ classes.body }>
                <Link 
                    className={ [ classes.link, classes.name ].join( ' ' ) }
                    to={ `/products/${ product._id }` }
                >
                    { product.name.length > maxNameLength ? cutString( product.name, maxNameLength ) : product.name }
                </Link>
                <div className={ classes.ratingWrap }>
                    <Rating 
                        ratings={ product.reviews.map( review => review.rating ) }
                    />
                    <span className={ classes.reviewCount }>
                        { `${product.reviews.length} Отзывов` }
                    </span>
                </div>
                <Price 
                    price={ product.price }
                    discount={ product.discount }
                />
                <div className={ classes.badgeWrap }>
                    {
                        product.tags.map( tag => {
                            if ( tag === 'new' ) return ( 
                                <Badge 
                                    key={ tag } 
                                    text={ tag } 
                                    sx={ { backgroundColor: '#71a5de', color: '#fff' } } 
                                />
                            )

                            return (
                                <Badge 
                                    key={ tag } 
                                    text={ tag } 
                                />
                            )
                        } )
                    }
                </div>
            </div>
        </div>
    );
}

export {
    ProductPreview, 
}