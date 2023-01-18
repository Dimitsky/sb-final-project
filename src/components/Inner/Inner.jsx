// css
import classes from './inner.module.css';

function Inner({ children, className, ...restProps }) {
    const cn = className ? [classes.inner, className].join(' ') : classes.inner;

    return (
        <div
            className={cn}
            {...restProps}
        >
            {children}
        </div>
    )
}

export {
    Inner, 
}