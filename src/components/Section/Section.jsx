import classes from './section.module.css';

function Section({ children, className, ...restProps }) {
    const cnArr = className ? [classes.section, className] : [classes.section];

    return (
        <div
            className={cnArr.join(' ')}
            {...restProps}
        >
            {children}
        </div>
    )
}

export {
    Section, 
}