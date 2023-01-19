// css
import classes from './wrapper.module.css';

function Wrapper({ children, className, ...restProps }) {
    const cn = className ? [classes.wrapper, className].join(' ') : classes.wrapper;

    return (
        <div
            className={cn}
            data-wrapper 
            {...restProps}
        >
            {children}
        </div>
    )
}

export {
    Wrapper, 
}