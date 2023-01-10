// css module
import classes from './Header.module.css';

function Header( { className, children } ) {
    const cn = className ? [ classes.header, className ].join( ' ' ) : classes.header;

    return (
        <header className={ cn }>
            { children }
        </header>
    );
}

export {
    Header, 
}