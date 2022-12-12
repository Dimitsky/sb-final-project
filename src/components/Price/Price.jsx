function Price( { price, discount } ) {
    return (
        discount ? (
            <>
                <h6 className='card-subtitle text-decoration-line-through'>{ price }</h6>
                <h5 className="card-title text-danger">{ price - ( price / 100 * discount ) }</h5>
            </>
        ) : <h5 className="card-title">{ price }</h5>
    );
}

export {
    Price, 
}