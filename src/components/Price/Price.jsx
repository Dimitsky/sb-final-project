import classes from './Price.module.css';

function Price({ className, price, discount, singlPrice }) {
    const cn = className ? [classes.wrap, className].join(' ') : classes.wrap;

    // renders (чтобы не использовать тернарный оператор)
    const render = () => {
        if (discount) {
            // Цена после дискаунта и размер скидки 
            if (!singlPrice) {
                return (
                    <div className={[cn, classes.wrapDiscount].join(' ')}>
                        <span className={[classes.price, classes.old].join(' ')}>
                            {`${price}₽`}
                        </span>
                        <span className={[classes.price, classes.discounted].join(' ')}>
                            {`${(price - (price / 100 * discount)).toFixed(2)}₽`}
                        </span>
                    </div>
                )
            // Выводит одну цену после дискаунта 
            } else {
                return (
                    <div className={[cn, classes.wrapDiscount].join(' ')}>
                        <span className={[classes.price, classes.discounted].join(' ')}>
                            {`${(price - (price / 100 * discount)).toFixed(2)}₽`}
                        </span>
                    </div>
                )
            }
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