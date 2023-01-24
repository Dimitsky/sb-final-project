const productIsLiked = ( likes, userId ) => likes.find( id => id === userId ) ? true : false;
const cutString = ( str, max ) => ( str.slice( 0, max ) + '...' );

// считает полную цену
function getFullPrice(cart, data) {
    return cart.reduce((acc, cartProduct) => {
        // считает только выбранные товары
        if (!cartProduct.isChoosed) return acc;
    
        // найти данные для товара в корзине
        const dataProduct = data.find(product => product._id === cartProduct.id);
        const price = dataProduct.price;
    
        // цена * на количество
        acc += price * cartProduct.count
        
        return acc;
    }, 0)
}

// считает цену с учетом скидки
function getDiscountedPrice(cart, data) {
    return cart.reduce((acc, cartProduct) => {
        // считает только выбранные товары
        if (!cartProduct.isChoosed) return acc;

        // найти данные для товара в корзине
        const dataProduct = data.find(product => product._id === cartProduct.id);
        // цена
        const price = dataProduct.price;
        // скидка (если есть)
        const discount = dataProduct.discount || null;

        // если скидка есть, то от цены отнять скидку и умножить на количество товаров
        // либо просто цена * на количество
        acc += discount ? (price - (price / 100 * discount)) * cartProduct.count : price * cartProduct.count;

        return acc;
    }, 0)
}

export {
    productIsLiked, 
    cutString, 
    getFullPrice, 
    getDiscountedPrice, 
}