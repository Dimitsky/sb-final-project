import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react';

import { useAuth } from '../components/Auth/Auth';
import { Api } from '../components/Api/Api';
import { SERVER_GROUP_NAME, BASE_SERVER_URL } from '../components/consts/consts';

import { FavoritesButton } from '../components/FavoritesButton/FavoritesButton';
import { PageTitle } from '../components/PageTitle/PageTitle';
import { Badge } from '../components/Badge/Badge';
import { Price } from '../components/Price/Price';

function Home() {
    const [ isLoaded, setIsLoaded ] = React.useState( false );
    const [ error, setError ] = React.useState( null );
    const [ products, setproducts ] = React.useState( [] );

    const { auth, userId } = useAuth();
    
    const api = new Api( {
        baseUrl: BASE_SERVER_URL, 
        groupId: SERVER_GROUP_NAME, 
        headers: {
            'Content-Type': 'application/json', 
            'authorization': `Bearer ${auth}`, 
        }
    } );

    const handleLike = ( productId, isLiked ) => {
        if ( isLiked ) {
            api.setProductLike( productId )
                .catch( error => alert( error.message ) )
        } else {
            api.removeProductLike( productId )
                .catch( error => alert( error.message ) )
        }
    }

    React.useEffect( () => {
        api.getProducts()
            .then( result => {
                setIsLoaded( true );
                setproducts( result.products );
            } )
            .catch( error => {
                setError( error );
            } )
    }, [] );

    if ( error ) return (
        <HomeWrap>
            <p>
                { error.message }
            </p>
        </HomeWrap>
    );
    
    if ( !isLoaded ) return (
        <HomeWrap>
            <p>
                Идет загрузка...
            </p>
        </HomeWrap>
    ); 
    
    if ( products ) return (
        <HomeWrap>
            <ul 
                className=" row" 
                style={ { listStyle: 'none', paddingLeft: '0' } }
            >
                {
                    products.map( product => (
                        <li 
                            className="col-6 col-md-4 col-lg-3"
                            key={ product['_id'] }
                        >
                            <div className="card border-0 h-100">
                                <img 
                                    className="card-img-top" 
                                    src={ product.pictures } 
                                    alt={ product.description } 
                                    style={ { height: '150px', objectFit: 'cover' } }
                                />
                                <div className="card-body d-flex flex-column align-items-start">
                                    <FavoritesButton 
                                        isFavorite={ product.likes.includes( userId ) } 
                                        handler={ isLiked => handleLike( product._id, isLiked ) }
                                    />
                                    <Badge 
                                        newProduct={ product.tags.includes( 'new' ) ? 'Новинка' : null }
                                        sale={ product.tags.includes( 'sale' ) ? product.discount : null }
                                    />
                                    <Price 
                                        price={ product.price }
                                        discount={ product.discount }
                                    />
                                    <p className="card-text text-opacity-75">{ product.wight }</p>
                                    <p className="card-text" style={ { maxHeight: '4.5em', overflow: 'hidden' } }>{ product.description }</p>
                                    <button 
                                        className="btn btn-warning mt-auto" 
                                        type="button"
                                    >В корзину</button>
                                </div>
                            </div>
                        </li>
                    ) )
                }
            </ul>
        </HomeWrap>

    );
}

function HomeWrap( { children } ) {
    return (
        <div className="container-fluid">
            <PageTitle title="Домашняя" />
            { children }
        </div>
    );
}

export {
    Home, 
}