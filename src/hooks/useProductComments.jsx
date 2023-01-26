// redux 
import { useSelector } from "react-redux";

// tanstack
import { useMutation } from "@tanstack/react-query";

// my comps
import { Api } from "../components/Api/Api";
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';
import { useParams } from "react-router-dom";

function useProductComments() {
    const token = useSelector(state => state.token);
    const { id: productId } = useParams();

    // handlers
    // 

    //  Получает комментарии для конкретного товара (по id)
    const handleGetComment = () => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL,
            groupId: SERVER_GROUP_NAME,
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            },
        });

        return api.getComment(productId);
    }

    return useMutation({
        mutationFn: handleGetComment, 
    })
}

export {
    useProductComments, 
}