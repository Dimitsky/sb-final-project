// redux
import { useSelector } from 'react-redux';

// react query
import { useQuery } from '@tanstack/react-query';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useProducts() {
    const token = useSelector(state => state.token);

    return useQuery({
        queryKey: ['products'], 
        queryFn: () => {
            const api = new Api({
                baseUrl: BASE_SERVER_URL, 
                groupId: SERVER_GROUP_NAME, 
                headers: {
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${token}`, 
                }
            })

            return api.getProducts()
                .then(result => result.products)
        }
    })
}

export {
    useProducts, 
}