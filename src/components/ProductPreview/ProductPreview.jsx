// react
import { useState } from 'react';

// my comps
import { Link } from 'react-router-dom';
import { LikeButton } from '../LikeBotton/LikeButton';
import { Price } from '../../components/Price/Price';
import { Badge } from '../Badge/Badge';
import { CartButton } from '../CartButton/CartButton';
import { Kebab, KebabItem } from '../Kebab/Kebab';
import { ModalEditProduct } from '../ModalEditProduct/ModalEditProduct';
import { ModalDeleteProduct } from '../ModalDeleteProduct/ModalDeleteProduct';
import { SoldOut } from '../SoldOut/SoldOut';

// my hooks
import { useUser } from '../../hooks/useUser';

// css
import classes from './ProductPreview.module.css';

function ProductPreview( { data: product } ) {
    const [ isOpenKebab, setIsOpenKebab ] = useState(false);
    const [ isOpenEditProductModal, setIsOpenEditProductModal ] = useState(false);
    const [ isOpenDeleteProductModal, setIsOpenDeleteProductModal ] = useState(false);
    const { data: user, error, status } = useUser();

    // handlers
    // 

    // Открыть модальное окно редактирования товара
    const handleOpenEditProductModal = () => {
        handleCloseKebab();
        setIsOpenEditProductModal(true);
    }

    // Закрыть модальное окно редактирования товара
    const handleCloseEditProductModal = () => {
        setIsOpenEditProductModal(false);
    }

    // Открыть модальное окно редактирования товара
    const handleOpenDeleteProductModal = () => {
        handleCloseKebab();
        setIsOpenDeleteProductModal(true);
    }

    // Закрыть модальное окно редактирования товара
    const handleCloseDeleteProductModal = () => {
        setIsOpenDeleteProductModal(false);
    }

    // Открывает кебаб
    const handleOpenKebab = () => {
        setIsOpenKebab(true);
    }

    // Закрывает кебаб
    const handleCloseKebab = () => {
        setIsOpenKebab(false);
    }

    // Если идет загрузка 
    if (status === 'loading') {
        return (
            <p>
                Идет загрузка комментариев...
            </p>
        )
    }

    // Если возникла ошибка 
    if (status === 'error') {
        return (
            <p>
                {error.message}
            </p>
        )
    }

    // Если ответ успешно получен 
    if (status === 'success') {
        return (
            <>
                <div className={classes.card}>
                    {/* {product.created_at} */}
                    <div className={classes.badgeWrap}>
                        {
                            product.discount ? <Badge text={`-${product.discount}%`} /> : null
                        }
                        {
                            product.tags.includes('new') ? <Badge text={`New`} style={{backgroundColor: 'var(--c-primary)'}} /> : null
                        }
                    </div>
                    <Link 
                        className={classes.img}
                        to={`/${product._id}`}
                    >
                        <img 
                            src={product.pictures} 
                            alt="Фотография товара" 
                        />
                        {
                            product.available ? (
                                null 
                            ) : (
                                <SoldOut />
                            )
                        }
                    </Link>
                    <div className={classes.body}>
                        <Link
                            className={classes.linkWrap}
                            to={`/${product._id}`}
                        >
                            <h4 className={classes.name}>
                                {product.name}
                            </h4>
                        </Link>
                        {
                            product.author._id === user._id ? (
                                <Kebab 
                                    className={classes.kebab}
                                    onClick={handleOpenKebab}
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
                        <p className={classes.description}>
                            {product.description}
                        </p>
                    </div>
                    <footer className={classes.footer}>
                        <Price 
                            className={classes.price}
                            price={product.price}
                            discount={product.discount}
                        />
                        <LikeButton 
                            className={classes.like}
                            productId={product._id}
                            isLiked={product.likes.find( id => id === user._id ) ? true : false}
                        />
                        <CartButton 
                            className={classes.cart}
                            productId={product._id}
                            disabled={product.available ? null : true}
                        />
                    </footer>
                </div>
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
    ProductPreview, 
}