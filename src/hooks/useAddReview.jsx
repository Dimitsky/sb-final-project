// redux
import { useSelector } from 'react-redux';

// react router dom
import { useParams } from "react-router-dom";

// tanstack
import { useMutation, useQueryClient } from '@tanstack/react-query';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useAddReview() {
    const token = useSelector(state => state.token);
    const queryClient = useQueryClient();
    const { id: productId } = useParams();

    // handlers
    // 

    // Отправляет отзыв на сервер 
    const handler = (values) => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            }
        }); 
        const body = {
            text: values.msg, 
            rating: values.rating, 
        }

        return api.addReview(body, productId)
            .then((result) => result)
            .catch((error) => alert(error.message))
    }

    return useMutation({
        mutationFn: handler, 
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews', {id: productId}]);
        }
    })
}

export {
    useAddReview, 
}