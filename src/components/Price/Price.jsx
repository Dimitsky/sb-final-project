import classes from './Price.module.css';

function Price( { className, price, discount } ) {
    return (
        <div className={ className ? [ classes.wrap, className ].join( ' ' ) : classes.wrap }>
            {
                !discount ? 
                    <span className={ classes.price }>
                        { `${ price }₽` }
                    </span>
                          : 
                    <>
                        <span className={ [ classes.price, classes.discountPrice ].join( ' ' ) }>
                            { `${ price - ( price / 100 * discount ) }₽` }
                        </span>
                        <span className={ [ classes.price, classes.oldPrice ].join( ' ' ) }>
                            { `${ price }₽` }
                        </span>
                    </>
            }
        </div>
    );
}

export {
    Price, 
}