// redux
import { useSelector } from 'react-redux';

// react query
import { useQueryClient, useMutation } from '@tanstack/react-query';

// react router dom
import { useNavigate } from 'react-router-dom';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useUpdateUser() {
    const token = useSelector(state => state.token);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['userUpdate'], 
        mutationFn: values => {
            const api = new Api( {
                baseUrl: BASE_SERVER_URL, 
                groupId: SERVER_GROUP_NAME, 
                headers: {
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${ token }`, 
                }
            } );

            return api.updateUserInfo({
                name: values.name, 
                about: values.about, 
            })
                .then(() => {
                    return api.updateUserAvatar( {
                        avatar: values.avatar, 
                    } );
                })
                .then(() => navigate('/profile'))
                .catch(error => {
                    alert( error )
                })
        },
        onSuccess: () => {        
            queryClient.invalidateQueries(['user']);
        },
    });
}

export {
    useUpdateUser, 
}