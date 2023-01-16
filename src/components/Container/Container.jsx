import classes from './Container.module.css';

function Container( { children, className, ...restProps } ) {
    return (
        <div 
            className={ className ? [ classes.container, className ].join( ' ' ) : classes.container }
            {...restProps}
        >
            { children }
        </div>
    );
}

export {
    Container, 
}