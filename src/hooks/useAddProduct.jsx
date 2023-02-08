// redux 
import { useSelector } from 'react-redux';

// tanstack
import { useMutation, useQueryClient } from '@tanstack/react-query';

// react router dom
import { useNavigate } from 'react-router-dom';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useAddProduct() {
    const token = useSelector(state => state.token);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // handlers
    // 

    // Управляет добавлением товара на сервер  
    const handler = (data) => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            }
        });

        return api.addProduct(data)
    }

    return useMutation({
        mutationFn: handler, 
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            navigate('/');
        }, 
        onError: (error) => {
            alert(error.message);
        }
    })
}

export {
    useAddProduct, 
}