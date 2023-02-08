// redux
import { useSelector } from 'react-redux';

// react query
import { useQuery } from '@tanstack/react-query';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useProducts() {
    const token = useSelector(state => state.token);

    // handlers
    // 

    // Управляет загрузкой всех продуктов с сервера 
    const handler = () => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            }
        })

        return api.getProducts()
    }

    return useQuery({
        queryKey: ['products'], 
        queryFn: handler, 
        onError: (error) => {
            alert(error.message)
        }
    })
}

export {
    useProducts, 
}