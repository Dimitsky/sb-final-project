import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../components/Auth/Auth';
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useUser() {
    const { auth } = useAuth();

    return useQuery({
        queryKey: ['user'], 
        queryFn: () => {
            const api = new Api({
                baseUrl: BASE_SERVER_URL, 
                groupId: SERVER_GROUP_NAME, 
                headers: {
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${auth}`, 
                }
            });

            return api.getUserData();
        }, 
        enabled: !!auth, 
    });
}

export {
    useUser, 
}