// redux
import { useSelector } from 'react-redux';

// react query
import { useQuery } from '@tanstack/react-query';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useUser() {
    const token = useSelector(store => store.token);

    return useQuery({
        queryKey: ['user'], 
        queryFn: () => {
            const api = new Api({
                baseUrl: BASE_SERVER_URL, 
                groupId: SERVER_GROUP_NAME, 
                headers: {
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${token}`, 
                }
            });

            return api.getUserData();
        }, 
        enabled: !!token, 
        onError: (error) => {
            alert(error.message)
        }
    });
}

export {
    useUser, 
}