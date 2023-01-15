import classes from './button.module.css';

function Button({ children, className, ...restProps }) {
    return (
        <button
            className={[classes.button, className].join(' ')}
        >
            {children}
        </button>
    )
}

export {
    Button, 
}