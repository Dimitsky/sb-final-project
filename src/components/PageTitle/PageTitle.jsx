function PageTitle( { children, title } ) {
    return (
        <h1 className="mb-4 text-center">
            <>
                { title }
                { children }
            </>
        </h1>
    );
}

export {
    PageTitle, 
}