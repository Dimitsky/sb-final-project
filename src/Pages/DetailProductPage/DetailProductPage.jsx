// react
import { useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// my comps
import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Inner } from '../../components/Inner/Inner';
import { Header } from '../../components/Header/Header';
import { GlassBox } from '../../components/GlassBox/GlassBox';
import { Card, CardBody, CardImg, CardTitle, CardText } from '../../components/Card/Card';
import { BackButton } from '../../components/BackButton/BackButton';
import { LikeButton } from '../../components/LikeBotton/LikeButton';
import { FavoriteButton } from '../../components/FavoriteButton/FavoriteButton';
import { Rating } from '../../components/Rating/Rating';
import { Badge } from '../../components/Badge/Badge';
import { Price } from '../../components/Price/Price';
import { CartButton } from '../../components/CartButton/CartButton';
import { Reviews, ReviewsForm } from '../../components/Reviews/Reviews';
import { Button } from '../../components/Button/Button';

// my hooks
import { useProduct } from '../../hooks/useProduct';
import { useUser } from '../../hooks/useUser';
import { useProductReviews } from '../../hooks/useProductReviews';

// css
import classes from './DetailProductPage.module.css';

function DetailProductPage() {
    const favorites = useSelector(state => state.favorites);
    const { data: reviews, status: reviewsStatus, reviewsError } = useProductReviews();
    
    const { data: product, error, status } = useProduct();
    const { data: user, status: userStatus } = useUser();

    // render functions
    // 

    // Иногда данные пользователя не успевают загрузиться из-за этого возникает TypeError ошибка, 
    // поэтому нужно отследить статус загрузки данных пользователя. 
    const renderLikeButton = (product) => {
        if (userStatus === 'success') {
            return (
                <LikeButton 
                    className={classes.like}
                    productId={product._id}
                    isLiked={product.likes.find( id => id === user._id ) ? true : false}
                />
            )
        }
    }

    // Рендер отзывов  
    const renderReviews = () => {
        if (reviewsStatus === 'loading') {
            return (
                <GlassBox>
                    Идет загрузка комментариев...
                </GlassBox>
            )
        }

        if (reviewsStatus === 'error') {
            return (
                <GlassBox>
                    {reviewsError.message}
                </GlassBox>
            )
        }

        if (reviewsStatus === 'success') {
            return (
                <>
                    <GlassBox>
                        <ReviewsForm 
                            productId={product._id} 
                        />
                    </GlassBox>
                    <GlassBox>
                        <Reviews data={reviews} />
                    </GlassBox>
                </>
            )
        }
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
        <Wrapper className={classes.wrapper}>
            <Inner className={classes.inner}>
                <Header />
                <div className={classes.layout}>
                    <GlassBox>
                        <Card className={classes.card}>
                            <div className={classes.top}>
                                <BackButton />
                                <Rating 
                                    className={classes.rating}
                                    likes={product.reviews.map(review => review.rating)}
                                />
                                {
                                    renderLikeButton(product)
                                }
                                <FavoriteButton 
                                    className={classes.favorites}
                                    isFavorite={favorites.includes(product._id)} 
                                    productId={product._id}
                                />
                            </div>
                            <CardImg 
                                className={classes.img}
                                src={product.pictures}
                            >
                                <div className={classes.badgeWrap}>
                                    {
                                        product.discount ? <Badge text={`-${product.discount}%`} /> : undefined
                                    }
                                </div>
                            </CardImg>
                            <CardBody className={classes.body}>
                                <CardTitle 
                                    className={classes.title}
                                    text={product.name}
                                />
                                <div className={classes.priceWrap}>
                                    <Price 
                                        className={classes.price}
                                        price={product.price}
                                        discount={product.discount}
                                    />
                                    <CardText 
                                        className={classes.weight} 
                                        text={`за ${product.wight}`}
                                    />
                                </div>
                                <CardText 
                                    className={classes.description} 
                                    text={product.description}
                                />
                            </CardBody>
                        </Card>
                    </GlassBox>
                    <GlassBox className={classes.btnWrap}>
                        <CartButton productId={product._id} />
                    </GlassBox>
                    {
                        renderReviews()
                    }
                </div>
            </Inner>
        </Wrapper>
    );
}

export {
    DetailProductPage, 
}