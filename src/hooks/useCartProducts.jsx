// redux
import { useSelector } from 'react-redux/es/exports';

// react query
import { useQuery } from '@tanstack/react-query';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useCartProducts() {
    const token = useSelector(state => state.token);
    const cart = useSelector(state => state.cart);

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

        return api.getProductsByIds(cart.map(product => product.id));
    }

    return useQuery({
        queryKey: ['cart'], 
        queryFn: handler, 
        cacheTime: 0, 
    })
}

export {
    useCartProducts, 
}