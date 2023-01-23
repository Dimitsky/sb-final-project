// css
import classes from './placeholder.module.css';

function Placeholder({ className, title, text, ...restProps }) {
    const cn = className ? [classes.placeholder, className].join(' ') : classes.placeholder;
    
    return (
        <div
            className={cn}
            {...restProps}
        >
            <h2 className={classes.title}>
                {title}
            </h2>
            <p className={classes.text}>
                {text}
            </p>
        </div>
    )
}

export {
    Placeholder, 
}