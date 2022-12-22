import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { Container } from '../../components/Container/Container';
import { Header } from '../../components/Header/Header';
import { BackButton } from '../../components/BackButton/BackButton';
import { LikeButton } from '../../components/LikeBotton/LikeButton';
import { Price } from '../../components/Price/Price';

import classes from './ProductPage.module.css';
import starIcon from '../../img/star-medium.svg';
import deliveryIcon from '../../img/delivery.svg';
import separatorIcon from '../../img/separator.svg';

import { Api } from '../../components/Api/Api';
import { useAuth } from '../../components/Auth/Auth';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';
import { productIsLiked } from '../../components/utils/utils';

function ProductPage() {
    const [ isLoaded, setIsLoaded ] = useState( false );
    const [ error, setError ] = useState( null );
    const [ product, setProduct ] = useState( {} );

    const { id: productId } = useParams();
    const { auth, userData } = useAuth();

    // handlers
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

    useEffect( () => {
        const options = {
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${ auth }`, 
            }
        };
        const api = new Api( options );

        api.getProduct( productId )
            .finally( () => setIsLoaded( true ) )
            .then( result => setProduct( result ) )
            .catch( error => {
                setError( error );
                alert( error );
            } );
    }, [] );

    if ( !isLoaded ) {
        return (
            <Container>
                Загрузка...
            </Container>
        );
    }

    if ( error ) {
        return (
            <Container>
                { error.message }
            </Container>
        );
    }
    
    return (
        <Container>
            <Header>
                <BackButton />
                <LikeButton 
                    className={ classes.like }
                    isLiked={ productIsLiked( product, userData ? userData._id : null ) }
                    handler={ handleLike }
                />
            </Header>
            <section className={ classes.imageWrapper }>
                <div className={ classes.pictureWrapper }>
                    <img 
                        className={ classes.picture } 
                        src={ product.pictures } 
                        alt={ `Фотография ${ product.name }` } 
                    />
                </div>
                <Tags tags={ product.tags } />
                <h2 className={ classes.name }>
                    { product.name }
                </h2>
                <div className={ classes.counterWrap }>
                    <Price 
                        className={ classes.price }
                        price={ product.price }
                        discount={ product.discount }
                    />
                </div>
                <div className={ classes.reviewWrapper }>
                    <div className={ classes.reviewBox }>
                        <img 
                            className={ classes.reviewIcon } 
                            src={ starIcon } 
                            alt="Иконка рейтинга"
                        />
                        <p className={ classes.reviewCount }>
                            { `${ ( product.reviews.reduce( ( acc, review ) => acc + review.rating, 0 ) / ( product.reviews.length ? product.reviews.length : 1 ) ).toFixed(1) } (${ product.reviews.length } оценок)` }
                        </p>
                    </div>
                    <div className={ classes.reviewBox } style={ { flexBasis: '20px' } }>
                        <img 
                            className={ classes.separator }
                            src={ separatorIcon } 
                            alt="" 
                            aria-hidden="true"
                        />
                    </div>
                    <div className={ classes.reviewBox }>
                        <img 
                            className={ classes.reviewIcon } 
                            src={ deliveryIcon }
                            alt="Иконка доставки" 
                        />
                        <p className={ classes.deliveryText }>
                            БЕСПЛАТНАЯ ДОСТАВКА
                        </p>
                    </div>
                </div>
                <p className={ classes.description }>
                    { product.description }
                </p>
                <button className={ classes.button }>
                    ДОБАВИТЬ В КОРЗИНУ
                </button>
            </section>
            
        </Container>
    );
}

function Tags( { tags } ) {
    return (
        <>
            {
                tags.map( tag => <a className={ classes.tag } href={ `/category/${ tag }` } key={ tag }>{ tag }</a> )
            }
        </>
    );
}

export {
    ProductPage, 
}