import classes from  './Avatar.module.css';

// 
const stringAvatar = name => {
    const [ first, second ] = name.split( ' ' );
    let res = first[ 0 ];

    res += second ? second[ 0 ] : '';

    return res.toUpperCase();
}

function Avatar( { className, link, name = "User Avatar", alt = "User avatar", sx} ) {
    return (
        <>
            <div 
                className={ [classes.avatar, className].join( ' ' ) }
                style={ { backgroundColor: '#ff5e5b', color: '#fff', ...sx } }
            >
                { 
                    link ? <img 
                        className={ classes.img } 
                        src={ link } 
                        alt={ alt }
                    />
                        : stringAvatar( name )
                }
            </div>
        </>
    );
}

export {
    Avatar, 
}