// css 
import classes from './GlassBox.module.css';

function GlassBox({ children, className, ...restProps }) {
    const cn = className ? [classes.box, className].join(' ') : classes.box;

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
    GlassBox, 
}