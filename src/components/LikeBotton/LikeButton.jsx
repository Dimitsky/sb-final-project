import { useState } from 'react';
import classes from './LikeButton.module.css';

function LikeButton( { className, handler, isLiked } ) {
    const [ state, setState ] = useState( isLiked );

    /*
        У кнопки собственное состояние, а логика работы с сервером находится в родительском компоненте. 
        Передача состояния кнопки происходит с помощью механизма поднятия состояния. 
        Благодаря отделению логики работы с сервером и внутреннего состояния, эту кнопку можно использовать не только
        для управления лайками в продуктах, но и в, например, комментариях или других компонентах где нужна кнопка-лайк. 
    */
    const handleClick = () => {
        setState( !state );
        if ( handler && typeof handler === 'function' ) handler( !state );
    }

    return (
        <button 
            className={ className ? [ classes.like, className ].join( ' ' ) : classes.like }
            type="button"
            aria-label="Поставить лайк товару"
            onClick={ handleClick }
        >
            <svg 
                className={ !state ? classes.icon : [ classes.icon, classes.liked ].join( ' ' ) }  
                viewBox="0 0 19 18" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M1.32781 8.57962C0.381934 5.62651 1.48736 2.25116 4.58768 1.2524C6.2185 0.72613 8.01857 1.03643 9.37435 2.05635C10.657 1.06463 12.5231 0.729656 14.1522 1.2524C17.2525 2.25116 18.365 5.62651 17.42 8.57962C15.9479 13.2605 9.37435 16.8659 9.37435 16.8659C9.37435 16.8659 2.84932 13.3152 1.32781 8.57962Z" 
                    fill="currentColor" 
                    stroke="white" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}

export {
    LikeButton, 
}