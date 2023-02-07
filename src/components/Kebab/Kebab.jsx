// react
import { useEffect, useState } from 'react';

// my comps
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { IconKebab } from '../Icon/Icon';

// css
import classes from './Kebab.module.css';

function Kebab({ className, children, onClickHandler, ...restProps }) {
    const cn = className ? [classes.kebab, className].join(' ') : classes.kebab;

    const [ isOpen, setIsOpen ] = useState(false);

    // handlers
    // 

    // 
    const handleOnClick = () => {
        setIsOpen(!isOpen);

        if (onClickHandler && typeof onClickHandler === 'function') onClickHandler();
    }

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            if (!e.target.closest('[data-kebab]')) setIsOpen(false);
        }

        window.document.documentElement.addEventListener('click', handler);

        return () => {
            window.document.documentElement.removeEventListener('click', handler);
        }
    }, [isOpen]);

    return (
        <div
            className={cn}
            {...restProps}
            data-kebab
        >
            <ButtonIcon
                className={classes.button}
                aria-label="Меню"
                onClick={handleOnClick}
                >
                <IconKebab />
            </ButtonIcon>
            <ul 
                className={classes.list}
                aria-expanded={isOpen}
            >
                {children}
            </ul>
        </div>
    )
}

function KebabItem({ className, children, ...restProps }) {
    const cn = className ? [classes.item, className].join(' ') : classes.item;

    return (
        <li
            className={cn}
            {...restProps}
        >
            {children}
        </li>
    )
}

export {
    Kebab, 
    KebabItem, 
}