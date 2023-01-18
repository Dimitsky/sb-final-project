// react
import { useEffect, useRef } from 'react';

// css module
import classes from './Counter.module.css';

function Counter( { className, count, maxCount, handlerIncrement, handlerDecrement } ) {
    const DecBtnRef = useRef();
    const IncBtnRef = useRef();

    // handlers
    const handleLess = () => {
        if ( count - 1 < 1 ) return
        if (handlerDecrement && typeof handlerDecrement === 'function') handlerDecrement();
    };

    const handleMore = () => {
        if (count + 1 > maxCount) return;
        if (handlerIncrement && typeof handlerIncrement === 'function') handlerIncrement();
    };

    useEffect(() => {
        if (count - 1 < 1) DecBtnRef.current.setAttribute('disabled', '');
        else DecBtnRef.current.removeAttribute('disabled');

        if (count + 1 > maxCount) IncBtnRef.current.setAttribute('disabled', '');
        else IncBtnRef.current.removeAttribute('disabled');
    })

    return (
        <div className={ className ? [ classes.counter, className ].join( ' ' ) : classes.counter }>
            <button 
                className={ [ classes.button, classes.buttonLess ].join( ' ' ) }
                ref={DecBtnRef}
                onClick={ handleLess }
            >
                <MinusIcon />
            </button>
            <span className={ classes.text }>
                { count }
            </span>
            <button 
                className={ [ classes.button, classes.buttonMore ].join( ' ' ) }
                ref={IncBtnRef}
                onClick={ handleMore }
            >
                <PlusIcon />
            </button>
        </div>
    );
}

function PlusIcon() {
    return (
        <svg 
            className={ [ classes.icon, classes.plus ].join( ' ' ) }
            viewBox="0 0 14 15" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 7.49999C0 6.67156 0.671573 5.99999 1.5 5.99999H12.1829C13.0114 5.99999 13.6829 6.67156 13.6829 7.49999C13.6829 8.32841 13.0114 8.99999 12.1829 8.99999H1.5C0.671573 8.99999 0 8.32841 0 7.49999Z" fill="currentColor"/>
            <path d="M6.84138 15C6.08569 15 5.47309 14.3874 5.47309 13.6317L5.47309 1.36829C5.47309 0.612606 6.08569 3.62117e-08 6.84138 0C7.59707 -3.62117e-08 8.20967 0.612606 8.20967 1.36829L8.20967 13.6317C8.20967 14.3874 7.59707 15 6.84138 15Z" fill="currentColor"/>
        </svg>
    );
}

function MinusIcon() {
    return (
        <svg 
            className={ [ classes.icon, classes.minus ].join( ' ' ) }
            viewBox="0 0 14 3" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect 
                width="13.6829" 
                height="3" 
                rx="1.5" 
                fill="currentColor"/>
        </svg>
    );
}

export {
    Counter, 
}