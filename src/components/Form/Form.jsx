import classes from './form.module.css';

function Form({ children, className, ...restProps }) {
    return (
        <form
            className={[classes.form, className].join(' ')} 
            {...restProps}
        >
            {children}
        </form>
    )
}

function FormControl({ variant = 'text', className, ...restProps }) {
    switch (variant) {
        case 'email':
            return (
                <input 
                    className={[classes.control, classes.email, className].join(' ')}    
                    {...restProps} 
                />
            )
        case 'password':
            return (
                <input 
                    className={[classes.control, classes.password, className].join(' ')}    
                    {...restProps} 
                />
            )
    }
}

function FormBox({ children, className, ...restProps }) {
    return (
        <div 
            className={[classes.box, className].join(' ')}
            {...restProps}
        >
            {children}
        </div>
    )
}

export {
    Form, 
    FormControl, 
    FormBox, 
}