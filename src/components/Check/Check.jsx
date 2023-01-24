// css
import { Card, CardImg, CardBody, CardTitle } from '../Card/Card';
import classes from './check.module.css';

function Check({ className, products, price, ...restProps }) {
    const cn = className ? [classes.check, className].join(' ') : classes.check;

    return (
        <div 
            className={cn}
            {...restProps}
        >
            <h2 className={classes.thx}>
                Спасибо за покупку!
            </h2>
            <ul className={classes.list}>
                {
                    products.map(product => (
                        <li
                            className={classes.item}
                            key={product._id}
                        >
                            <Card>
                                <CardImg 
                                    className={classes.img}
                                    src={product.pictures} 
                                />
                                <CardBody className={classes.body}>
                                    <CardTitle
                                        className={classes.title} 
                                        text={product.name} 
                                    />
                                </CardBody>
                            </Card>
                        </li>
                    ))
                }
            </ul>
            <h3 className={classes.priceWrap}>
                {'Итого: '}
                <span className={classes.price}>
                    {price}₽
                </span>
            </h3>
        </div>
    )
}

export {
    Check, 
}