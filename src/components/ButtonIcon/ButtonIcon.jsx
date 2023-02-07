// react 
import { forwardRef } from 'react';

// css 
import classes from './ButtonIcon.module.css';

function ButtonIconForwardRef({ className, children, ...restProps}, ref) {
    const cn = className ? [classes.button, className].join(' ') : classes.button;

    return (
        <button
            className={cn}
            type="button"
            ref={ref}
            {...restProps}
        >
            {children}
        </button>
    )
}

const ButtonIcon = forwardRef(ButtonIconForwardRef);

export {
    ButtonIcon, 
}