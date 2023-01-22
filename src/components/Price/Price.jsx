import classes from './Price.module.css';

function Price({ className, price, discount }) {
    const cn = className ? [classes.wrap, className].join(' ') : classes.wrap;

    // renders (чтобы не использовать тернарный оператор)
    const render = () => {
        if (discount) {
            return (
                <div className={[cn, classes.wrapDiscount].join(' ')}>
                    <span className={[classes.price, classes.discountPrice].join(' ')}>
                        {`${price - (price / 100 * discount)}₽`}
                    </span>
                    <span className={[classes.price, classes.oldPrice].join(' ')}>
                        {`${price}₽`}
                    </span>
                </div>
            )
        } else {
            return (
                <div className={cn}>
                    <span className={classes.price}>
                        {`${price}₽`}
                    </span>
                </div>
            )
        }
    }
    
    return render();
}

export {
    Price, 
}