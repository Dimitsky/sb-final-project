// css
import classes from './Card.module.css';

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

function CardImg({ children, className, src, alt = 'Фотография продукта', ...restProps }) {
    const cn = className ? [classes.img, className].join(' ') : classes.img;

    return (
        <div 
            className={cn}
            {...restProps}
        >
            {children}
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

function CardBodyHeader({ children, className, ...restProps }) {
    const cn = className ? [classes.bodyHeader, className].join(' ') : classes.bodyHeader;

    return (
        <div 
            className={cn}
            {...restProps}
        >
            {children}
        </div>
    )
}

function CardBodyFooter({ children, className, ...restProps }) {
    const cn = className ? [classes.bodyFooter, className].join(' ') : classes.bodyFooter;

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

function CardText({ className, text, ...restProps }) {
    const cn = className ? [classes.text, className].join(' ') : classes.text;

    return (
        <p 
            className={cn}
            {...restProps}
        >
            {text}
        </p>
    )
}

export {
    Card, 
    CardImg, 
    CardBody, 
    CardBodyHeader, 
    CardBodyFooter, 
    CardTitle, 
    CardText, 
}