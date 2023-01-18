// css
import classes from './badge.module.css';

function Badge({ text, className, ...restProps }) {
    const cn = className ? [classes.badge, className].join(' ') : classes.badge;
    
    return (
        <div
            className={cn}
            {...restProps}
        >
            {text}
        </div>
    )
}

export {
    Badge, 
}