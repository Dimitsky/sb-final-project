// css 
import classes from './glassbox.module.css';

function GlassBox({ children, className, ...restProps }) {
    return (
        <div 
            className={[classes.box, className].join(' ')}
            {...restProps}
        >
            {children}
        </div>
    )
}

function GlassBoxImg({ children, className, ...restProps }) {
    return (
        <div
            className={[classes.img, className].join(' ')}
            {...restProps}
        >
            {children}
        </div>
    )
}

export {
    GlassBox, 
    GlassBoxImg, 
}