// css 
import classes from './SoldOut.module.css';

function SoldOut({ className, ...restProps }) {
    const cn = className ? [classes.soldOut, className].join(' ') : classes.soldOut;

    return (
        <div 
            className={cn}
            {...restProps}
        >
            <span className={classes.text}>
                sold out
            </span>
        </div>
    )
}

export {
    SoldOut, 
}