// redux
import { useSelector } from 'react-redux';

// tanstack
import { useMutation, useQueryClient } from '@tanstack/react-query';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useDeleteProduct(productId) {
    const token = useSelector(state => state.token);
    const queryClient = useQueryClient();

    // handlers
    // 

    // Управляет удалением продукта 
    const handler = () => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            }
        });

        return api.deleteProduct(productId);
    }

    return useMutation({
        mutationFn: handler, 
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        }
    })
}

export {
    useDeleteProduct, 
}