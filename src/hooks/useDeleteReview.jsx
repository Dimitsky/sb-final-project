// redux
import { useSelector } from 'react-redux';

// tanstack
import { useMutation, useQueryClient } from '@tanstack/react-query';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useDeleteReview() {
    const token = useSelector(state => state.token);
    const queryClient = useQueryClient();

    // handlers
    // 

    // 
    const handler = (variables) => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            }
        });

        return api.deleteReview(variables.productId, variables.reviewId)
    }

    return useMutation({
        mutationFn: handler, 
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['reviews', {id: variables.productId}]);
        }, 
        onError: (error) => {
            alert(error.message);
        }
    })
}

export {
    useDeleteReview, 
}