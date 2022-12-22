import { Children } from 'react';
import classes from './Badge.module.css';

const defaultStyle = {
    backgroundColor: '#ff5e5b', 
    color: '#fff', 
}

function Badge( { text, sx = defaultStyle } ) {
    return (
        <span 
            className={ [ classes.badge ].join( ' ' ) }
            style={ sx }
        >
            { text }
        </span>
    );
}

export {
    Badge, 
}