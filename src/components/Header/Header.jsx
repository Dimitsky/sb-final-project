// css module
import classes from './Header.module.css';

function Header({ className, children, ...restProps }) {
    const cn = className ? [classes.header, className].join(' ') : classes.header;

    return (
        <header 
            className={cn} 
            {...restProps} 
        >
            {children}
        </header>
    );
}

export {
    Header, 
}