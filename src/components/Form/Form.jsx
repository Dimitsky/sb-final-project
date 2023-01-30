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
        case 'search':
            cnArr.push(classes.search);
            
            break;

        default:
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

function FormFiveStarRating({ className, value, handler }) {
    return (
        <div className={classes.rating}>
            <input 
                className={classes.radio}
                type="radio"
                id="five_star"
                name="rating"
                checked={value === "5"}
                value="5"
                onChange={handler}
            />
            <label htmlFor="five_star">
                <StarIcon />
            </label>
            <input 
                className={classes.radio}
                type="radio"
                id="four_star"
                name="rating"
                checked={value === "4"}
                value="4"
                onChange={handler}
            />
            <label htmlFor="four_star">
                <StarIcon />
            </label>
            <input 
                className={classes.radio}
                type="radio"
                id="three_star"
                name="rating"
                checked={value === "3"}
                value="3"
                onChange={handler}
            />
            <label htmlFor="three_star">
                <StarIcon />
            </label>
            <input 
                className={classes.radio}
                type="radio"
                id="two_star"
                name="rating"
                checked={value === "2"}
                value="2"
                onChange={handler}
            />
            <label htmlFor="two_star">
                <StarIcon />
            </label>
            <input 
                className={classes.radio}
                type="radio"
                id="one_star"
                name="rating"
                checked={value === "1"}
                value="1"
                onChange={handler}
            />
            <label htmlFor="one_star">
                <StarIcon />
            </label>
        </div>
    )
}

function StarIcon() {
    return (
        <svg 
            className={classes.starIcon} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" stroke="white" strokeWidth="1" />
        </svg>
    )
}

export {
    Form, 
    FormControl, 
    FormBox, 
    FormTextarea, 
    FormFiveStarRating, 
}