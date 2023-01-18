// css
import classes from './card.module.css';

function Card({ children, className, ...restProps }) {
    const cn = className ? [classes.card, className].join(' ') : classes.card;

    return (
        <div 
            className={cn}
            {...restProps}
        >
            {children}
        </div>
    )
}

function CardImg({ className, src, alt = 'Фотография продукта', ...restProps }) {
    const cn = className ? [classes.img, className].join(' ') : classes.img;

    return (
        <div 
            className={cn}
            {...restProps}
        >
            <img 
                src={src} 
                alt={alt} 
            />
        </div>
    )
}

function CardBody({ children, className, ...restProps }) {
    const cn = className ? [classes.body, className].join(' ') : classes.body;

    return (
        <div 
            className={cn}
            {...restProps}
        >
            {children}
        </div>
    )
}

function CardTitle({ className, text, ...restProps }) {
    const cn = className ? [classes.title, className].join(' ') : classes.title;

    return (
        <h2 
            className={cn}
            {...restProps}
        >
            {text}
        </h2>
    )
}

export {
    Card, 
    CardImg, 
    CardBody, 
    CardTitle, 
}