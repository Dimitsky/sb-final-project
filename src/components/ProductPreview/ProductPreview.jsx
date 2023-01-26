// my comps
import { GlassBox } from '../GlassBox/GlassBox';
import { Link } from 'react-router-dom';
import { LikeButton } from '../LikeBotton/LikeButton';
import { Rating } from '../../components/Rating/Rating';
import { Price } from '../../components/Price/Price';
import { Badge } from '../Badge/Badge';
import { Stock } from '../Stock/Stock';
import { Card, CardBody, CardBodyFooter, CardImg, CardTitle } from '../Card/Card';
import { CartButton } from '../CartButton/CartButton';

// css
import classes from './ProductPreview.module.css';

function ProductPreview( { data: product, user } ) {    
    return (
        <GlassBox className={classes.wrap}>
            <LikeButton 
                className={classes.like}
                productId={product._id}
                isLiked= {product.likes.find( id => id === user._id ) ? true : false}
            />
            <Card className={classes.card}>
                <CardImg 
                    className={classes.img}
                    src={product.pictures}
                />
                <CardBody className={classes.body}>
                    <CardTitle 
                        className={classes.title}
                        text={product.name}
                    />
                    <Rating
                        className={classes.rating} 
                        likes={product.reviews.map(review => review.rating)} 
                    />
                    <div className={classes.priceWrap}>
                        <Price 
                            className={classes.price}
                            price={product.price}
                            discount={product.discount}
                        />
                        <Stock 
                            className={classes.stock}
                            stock={product.stock}
                        />
                    </div>
                    <div className={classes.badgeWrap}>
                        {
                            product.discount ? <Badge text={`-${product.discount}%`} /> : undefined
                        }
                        {
                            product.tags.includes('new') ? <Badge text={`New`} style={{backgroundColor: 'var(--c-primary)'}} /> : undefined
                        }
                    </div>
                    <CardBodyFooter className={classes.linkWrap}>
                        <CartButton 
                            className={classes.cartButton}
                            productId={product._id} 
                        />
                        <Link 
                            className={classes.moreInfo}
                            to={`/${product._id}`}
                        >
                            Подробнее
                        </Link>
                    </CardBodyFooter>
                </CardBody>
            </Card>
        </GlassBox>
    );
}

export {
    ProductPreview, 
}