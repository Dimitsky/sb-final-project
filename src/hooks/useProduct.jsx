// redux
import { useSelector } from "react-redux";

// react query
import { useQuery } from "@tanstack/react-query";

// react router dom
import { useParams } from "react-router-dom";

// me comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useProduct() {
    const { id: productId } = useParams();
    const token = useSelector(state => state.token);

    const handler = (id) => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            }
        });

        return api.getProduct(id);
    }
    
    return useQuery({
        queryKey: ['products', {id: productId}], 
        queryFn: () => handler(productId), 
    });
}


export {
    useProduct, 
}