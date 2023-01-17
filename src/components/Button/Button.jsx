import classes from './button.module.css';

function Button({ children, className, variant, ...restProps }) {
    const cnArr = [classes.button, className];

    switch (variant) {
        case 'outline':
            cnArr.push(classes['outline']);
            break;
    }
        
    const cnStr = cnArr.join(' ');
   
    return (
        <button
            className={cnStr}
            {...restProps}
        >
            {children}
        </button>
    )
}

export {
    Button, 
}