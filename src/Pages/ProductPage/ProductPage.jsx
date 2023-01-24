// redux
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../../RTK/slices/cartSlice/cartSlice';

// my comps
import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Inner } from '../../components/Inner/Inner';
import { Header } from '../../components/Header/Header';
import { GlassBox } from '../../components/GlassBox/GlassBox';
import { Card, CardBody, CardImg, CardTitle, CardText } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { BackButton } from '../../components/BackButton/BackButton';
import { LikeButton } from '../../components/LikeBotton/LikeButton';
import { Rating } from '../../components/Rating/Rating';
import { Badge } from '../../components/Badge/Badge';
import { Price } from '../../components/Price/Price';

// my hooks
import { useProduct } from '../../hooks/useProduct';
import { useUser } from '../../hooks/useUser';

// css
import classes from './productpage.module.css';

function ProductPage() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    
    const { data: product, error, status } = useProduct();
    const { data: user } = useUser();

    // handlers
    const handleAddToCart = () => {
        dispatch(add(product._id));
    }
    const handleRemoveFromCart = () => {
        dispatch(remove(product._id));
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
                                <LikeButton 
                                    className={classes.like}
                                    productId={product._id}
                                    isLiked={product.likes.find( id => id === user._id ) ? true : false}
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
                        {
                            cart.find(cartProduct => cartProduct.id === product._id) ? 
                                <RemoveProductFromCartButton handler={handleRemoveFromCart} /> : 
                                <AddProductToCartButton handler={handleAddToCart} />
                        }
                    </GlassBox>
                </div>
            </Inner>
        </Wrapper>
    );
}

function AddProductToCartButton({handler}) {
    return (
        <Button 
            className={classes.addBtn}
            type="button"
            onClick={handler}
        >
            Добавить в корзину
        </Button>
    )
}

function RemoveProductFromCartButton({handler}) {
    return (
        <Button 
            className={classes.removeBtn}
            variant="danger"
            type="button"
            onClick={handler}
        >
            Удалить из корзины
        </Button>
    )
}

export {
    ProductPage, 
}