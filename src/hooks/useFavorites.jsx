// redux
import { useSelector } from 'react-redux';

// tanstack
import { useQuery } from '@tanstack/react-query';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useFavorites() {
    const token = useSelector(state => state.token);
    const favoritesIds = useSelector(state => state.favorites);

    // handlers
    // 

    // Загружает избранные товары по списку id 
    const handler = () => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'applictation/json', 
                'authorization': `Bearer ${token}`, 
            }
        }); 

        return api.getProductsByIds(favoritesIds)
            .then(result => result)
            .catch(error => alert(error.message));
    }

    return useQuery({
        queryKey: ['favorites'], 
        queryFn: handler, 
    })
}

export {
    useFavorites, 
}