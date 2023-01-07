import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

import { Api } from '../components/Api/Api';
import { useAuth } from '../components/Auth/Auth';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

function useProduct() {
    const { id: productId } = useParams();
    const { auth } = useAuth();

    const handler = (id) => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${auth}`, 
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