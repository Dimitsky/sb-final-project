import classes from './Container.module.css';

function Container( { children, className } ) {
    return (
        <div className={ className ? [ classes.container, className ].join( ' ' ) : classes.container }>
            { children }
        </div>
    );
}

export {
    Container, 
}