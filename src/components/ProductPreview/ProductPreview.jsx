// my comps
import { GlassBox } from '../GlassBox/GlassBox';
import { Link } from 'react-router-dom';
import { LikeButton } from '../LikeBotton/LikeButton';
import { Rating } from '../../components/Rating/Rating';
import { Price } from '../../components/Price/Price';
import { Badge } from '../Badge/Badge';
import { Card, CardBody, CardImg, CardTitle } from '../Card/Card';

// css
import classes from './productpreview.module.css';

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
                    <span className={classes.price}>
                        {product.price}₽
                    </span>
                    <div className={classes.badgeWrap}>
                        {
                            product.discount ? <Badge text={`-${product.discount}%`} /> : undefined
                        }
                    </div>
                    <Link 
                        className={classes.moreInfo}
                        to={`products/${product._id}`}
                    >
                        Подробнее
                    </Link>
                </CardBody>
            </Card>
        </GlassBox>
    );
}

export {
    ProductPreview, 
}