// css
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
                            <div className={classes.card}>
                                <div className={classes.img}>
                                    <img 
                                        src={product.pictures} 
                                        alt="Фотография товара" 
                                    />
                                </div>
                                <div className={classes.body}>
                                    <h2 className={classes.name}>
                                        {product.name}
                                    </h2>
                                </div>
                            </div>
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