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
    const cnArr = [classes.control, className];

    switch (variant) {
        case 'email':
            cnArr.push(classes.email);

            break;
        case 'password':
            cnArr.push(classes.password);
            
            break;
        case 'avatar':
            cnArr.push(classes.avatar);
            
            break;
        case 'name':
            cnArr.push(classes.name);
            
            break;
    }

    const cnStr = cnArr.join(' ');

    return (
        <input 
            className={cnStr}   
            {...restProps} 
        />
    )
}

function FormTextarea({ children, className, ...restProps }) {
    const cnArr = [classes.textarea, className, classes.about];
    const cnStr = cnArr.join(' ');

    return (
        <textarea
            className={cnStr}
            {...restProps}
        >
            {children}
        </textarea>
    )
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
    FormTextarea, 
}