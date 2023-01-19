import classes from './button.module.css';

function Button({ children, className, variant, ...restProps }) {
    const cnArr = [classes.button, className];

    switch (variant) {
        case 'outline':
            cnArr.push(classes['outline']);
            break;
        case 'link':
            cnArr.push(classes['link']);
            break;
        case 'danger':
            cnArr.push(classes['danger']);
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