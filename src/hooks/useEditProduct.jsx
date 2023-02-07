// redux 
import { useSelector } from 'react-redux';

// tanstack
import { useMutation, useQueryClient } from '@tanstack/react-query';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useEditProduct(productId) {
    const token = useSelector(state => state.token);
    const queryClient = useQueryClient();

    // handlers
    // 

    // Добавляет товар на сервер 
    const handler = (data) => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            }
        });

        return api.editProduct(data, productId)
    }

    return useMutation({
        mutationFn: handler, 
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        }
    })
}

export {
    useEditProduct, 
}