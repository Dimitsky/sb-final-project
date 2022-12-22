const productIsLiked = ( product, userId ) => product.likes.find( id => id === userId ) ? true : false;
const cutString = ( str, max ) => ( str.slice( 0, max ) + '...' );

export {
    productIsLiked, 
    cutString, 
}