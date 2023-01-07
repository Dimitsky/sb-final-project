import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useAuth } from '../components/Auth/Auth';
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useUpdateUser() {
    const { auth } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['userUpdate'], 
        mutationFn: variables => {
            const api = new Api( {
                baseUrl: BASE_SERVER_URL, 
                groupId: SERVER_GROUP_NAME, 
                headers: {
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${ auth }`, 
                }
            } );

            return api.updateUserInfo({
                name: variables.name, 
                about: variables.about, 
            })
                .then( () => {
                    return api.updateUserAvatar( {
                        avatar: variables.avatar, 
                    } );
                } )
                .catch( error => {
                    alert( error )
                } )
        },
        onSuccess: () => {        
            queryClient.invalidateQueries( ['user'] );
        },
    });
}

export {
    useUpdateUser, 
}