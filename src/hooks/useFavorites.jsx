// redux
import { useSelector } from 'react-redux';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useFavorites(Ids) {
    const token = useSelector(state => state.favorites);

    // handlers
    // 

    // 
    const handleFavorites = () => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'applictation/json', 
                'authorization': `Bearer ${token}`, 
            }
        }); 
    }
}

export {
    useFavorites, 
}