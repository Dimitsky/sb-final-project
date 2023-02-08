// react
import { useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// my comps
import { Header } from '../../components/Header/Header';
import { BackButton } from '../../components/BackButton/BackButton';
import { LikeButton } from '../../components/LikeBotton/LikeButton';
import { FavoriteButton } from '../../components/FavoriteButton/FavoriteButton';
import { Badge } from '../../components/Badge/Badge';
import { Price } from '../../components/Price/Price';
import { CartButton } from '../../components/CartButton/CartButton';
import { Reviews, ReviewsForm } from '../../components/Reviews/Reviews';
import { ReviewsInfo } from '../../components/ReviewsInfo/ReviewsInfo';
import { Avatar } from '../../components/Avatar/Avatar';
import { CartLink } from '../../components/CartLink/CartLink';

// my hooks
import { useProduct } from '../../hooks/useProduct';
import { useUser } from '../../hooks/useUser';
import { useProductReviews } from '../../hooks/useProductReviews';
import { Kebab, KebabItem } from '../../components/Kebab/Kebab';
import { ModalEditProduct } from '../../components/ModalEditProduct/ModalEditProduct';
import { ModalDeleteProduct } from '../../components/ModalDeleteProduct/ModalDeleteProduct';

// css
import classes from './DetailProductPage.module.css';

function DetailProductPage() {
    const favorites = useSelector(state => state.favorites);
    const { data: reviews, status: reviewsStatus, reviewsError } = useProductReviews();
    
    const { data: product, error, status: productStatus } = useProduct();
    const { data: user, status: userStatus } = useUser();

    const [ isOpenEditProductModal, setIsOpenEditProductModal ] = useState(false);
    const [ isOpenDeleteProductModal, setIsOpenDeleteProductModal ] = useState(false);

    // render functions
    // 

    // Иногда данные пользователя не успевают загрузиться из-за этого возникает TypeError ошибка, 
    // поэтому нужно отследить статус загрузки данных пользователя. 
    const renderLikeButton = (product) => {
        if (userStatus === 'success' && productStatus === 'success') {
            return (
                <div className={classes.likeWrap}>
                    <LikeButton 
                        className={classes.like}
                        productId={product._id}
                        isLiked={product.likes.find( id => id === user._id ) ? true : false}
                    />
                    <span className={classes.likeText}>
                        {product.likes.length ? product.likes.length : 0}
                    </span>
                </div>
            )
        }
    }

    // handlers
    // 

    // Открыть модальное окно редактирования товара
    const handleOpenEditProductModal = () => {
        setIsOpenEditProductModal(true);
    }

    // Закрыть модальное окно редактирования товара
    const handleCloseEditProductModal = () => {
        setIsOpenEditProductModal(false);
    }

    // Открыть модальное окно редактирования товара
    const handleOpenDeleteProductModal = () => {
        setIsOpenDeleteProductModal(true);
    }

    // Закрыть модальное окно редактирования товара
    const handleCloseDeleteProductModal = () => {
        setIsOpenDeleteProductModal(false);
    }
    
    // Рендер отзывов 
    const renderReviews = () => {
        // Если идет загрузка 
        if (reviewsStatus === 'loading') {
            return (
                <p>
                    Идет загрузка комментариев...
                </p>
            )
        }

        // Если возникла ошибка 
        if (reviewsStatus === 'error') {
            return (
                <p>
                    {reviewsError.message}
                </p>
            )
        }

        // Если ответ успешно получен 
        if (reviewsStatus === 'success') {
            return (
                <>
                    <ReviewsInfo reviews={reviews} />
                    <div className={classes.reviewsWrap}>
                        <Avatar 
                            className={classes.avatar}
                            link={user.avatar}
                        />
                        <ReviewsForm 
                            className={classes.reviewsForm}
                            productId={product._id} 
                        />
                    </div>
                    <Reviews data={reviews} />
                </>
            )
        }
    }

    // Если идет загрузка 
    if ( productStatus === 'loading') {
        return (
            <div className="container">
                Загрузка...
            </div>
        );
    }

    // Если возникла ошибка 
    if ( productStatus === 'error' ) {
        return (
            <div className="container">
                { error.message }
            </div>
        );
    }
    
    // Если ответ успешно получен 
    if (productStatus === 'success' && userStatus === 'success') {
        return (
            <>
                <Header>
                    <BackButton 
                        text="Назад"
                    />
                    <CartLink className={classes.cart} />
                </Header>
                <div className={classes.card}>
                    <div className={classes.top}>
                        {
                            product.author._id === user._id ? (
                                <Kebab 
                                    className={classes.kebab}
                                >
                                    <KebabItem>
                                        <button
                                            onClick={handleOpenEditProductModal}
                                        >
                                            Редактировать
                                        </button>
                                    </KebabItem>
                                    <KebabItem>
                                        <button
                                            onClick={handleOpenDeleteProductModal}
                                        >
                                            Удалить
                                        </button>
                                    </KebabItem>
                                </Kebab>
                            ) : (
                                null
                            )
                        }
                        {/* Кнопка нравится */}
                        {
                            renderLikeButton(product)
                        }
                    </div>
                    <div className={classes.img}>
                        <img 
                            src={product.pictures} 
                            alt="Фотография товара" 
                        />
                        <div className={classes.badgeWrap}>
                            {
                                product.discount ? <Badge text={`-${product.discount}%`} /> : null
                            }
                            {
                                product.tags.includes('new') ? <Badge text={`New`} style={{backgroundColor: 'var(--c-primary)'}} /> : null
                            }
                        </div>
                    </div>
                    <div className={classes.body}>
                        <h2 className={classes.name}>
                            {product.name}
                        </h2>
                        <div className={classes.priceWrap}>
                            <Price 
                                className={classes.price}
                                price={product.price}
                                discount={product.discount}
                            />
                            <span className={classes.wight}>
                                {`за ${product.wight}`}
                            </span>
                            {/* Проверяет наличие товара в магазине */}
                            {
                                product.stock && product.available ? (
                                    <span className={classes.available}>(В наличии)</span>
                                ) : (
                                    <span className={classes.unavailable}>(Закончился)</span>
                                )
                            }
                        </div>
                        <p className={classes.description}>
                            {product.description}
                        </p>
                    </div>
                    <div className={classes.footer}>
                        <FavoriteButton 
                            className={classes.favorites}
                            isFavorite={favorites.includes(product._id)} 
                            productId={product._id}
                            showText={true}
                        />
                        <CartButton 
                            className={classes.cart}
                            productId={product._id} 
                            showText={true}
                        />
                    </div>
                </div>
                    {
                        renderReviews()
                    }
                <ModalEditProduct 
                    isOpen={isOpenEditProductModal} 
                    data={product}
                    closeHandler={handleCloseEditProductModal}
                    submitHandler={handleCloseEditProductModal}
                />
                <ModalDeleteProduct 
                    isOpen={isOpenDeleteProductModal}
                    closeHandler={handleCloseDeleteProductModal}
                    cancelHandler={handleCloseDeleteProductModal}
                    productId={product._id}
                />
            </>
        );
    }
}

export {
    DetailProductPage, 
}