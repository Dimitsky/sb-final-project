function Badge( { newProduct, sale } ) {
    return (
        <div className="card-tags d-flex flex-column align-items-start position-absolute top-0 start-0">
            { newProduct ? <span className="badge text-bg-danger mb-1">{ newProduct }</span> : null }
            { sale ? <span className="badge text-bg-info">-{ sale }%</span> : null }
        </div>
    );
}

export {
    Badge, 
}