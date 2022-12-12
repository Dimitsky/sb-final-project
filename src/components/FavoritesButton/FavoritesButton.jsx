import React from 'react';

function FavoritesButton( { isFavorite = false, handler } ) {
    const [ state, setState ] = React.useState( isFavorite );

    const handleOnClick = () => {
        setState( !state );

        if ( handler && typeof handler === 'function' ) handler( !state );
    }

    return (
        <button 
            className="btn position-absolute top-0 end-0 fs-3 p-1 lh-1" 
            type="button"
            onClick={ handleOnClick }
        >
            {
                state ? <i className="bi bi-heart-fill text-danger"></i> : <i className="bi bi-heart"></i>
            }
        </button>
    );
}

export {
    FavoritesButton, 
}