// redux
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { replaceAllCart } from '../RTK/slices/cartSlice/cartSlice';

// react query
import { useQuery } from '@tanstack/react-query';

// my comps
import { useProducts } from '../hooks/useProducts';
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useCartProducts() {
    const token = useSelector(state => state.token);
    const cart = useSelector(state => state.cart);
    const { data: products } = useProducts();
    const dispatch = useDispatch();

    // handlers
    const handler = () => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            }
        });

        // Описание данной проверки смотрите в файле useFavorites.jsx
        const newCartList = cart.filter((cartProduct) => products.find((product) => product._id === cartProduct.id));

        if (newCartList.length !== cart.length) {
            dispatch(replaceAllCart(newCartList));
        }

        return api.getProductsByIds(newCartList.map(product => product.id));
    }

    return useQuery({
        queryKey: ['cart'], 
        queryFn: handler, 
        enabled: !!products, 
        cacheTime: 0, 
        onError: (error) => {
            alert(error.message);
        }
    })
}

export {
    useCartProducts, 
}