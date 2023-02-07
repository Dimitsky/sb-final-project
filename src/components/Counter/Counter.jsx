// react
import { useEffect, useRef } from 'react';

// my comps
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { IconMinusCircle, IconPlusCircle } from '../../components/Icon/Icon';

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
            <ButtonIcon 
                className={ [ classes.button, classes.buttonLess ].join( ' ' ) }
                ref={DecBtnRef}
                onClick={ handleLess }
            >
                <IconMinusCircle className={classes.minus} />
            </ButtonIcon>
            <span className={ classes.text }>
                { count }
            </span>
            <ButtonIcon 
                className={ [ classes.button, classes.buttonMore ].join( ' ' ) }
                ref={IncBtnRef}
                onClick={ handleMore }
            >
                <IconPlusCircle className={classes.plus} />
            </ButtonIcon>
        </div>
    );
}

export {
    Counter, 
}