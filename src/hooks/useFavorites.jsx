// redux
import { useDispatch, useSelector } from 'react-redux';
import { replaceAllFavorites } from '../RTK/slices/favoritesSlice/favoritesSlice';

// tanstack
import { useQuery } from '@tanstack/react-query';

// my comps
import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';

// my hooks
import { useProducts } from '../hooks/useProducts';

function useFavorites() {
    const token = useSelector(state => state.token);
    const favoritesIds = useSelector(state => state.favorites);
    const { data: products } = useProducts();
    const dispatch = useDispatch();

    // handlers
    // 

    // Загружает избранные товары по списку id 
    const handleFavorites = () => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'applictation/json', 
                'authorization': `Bearer ${token}`, 
            }
        }); 

        // Перед запросом на сервер, необходимо проверить список избранного на предмет удаленных продуктов. 
        // Если добавить товар в избранное, а потом удалить его с сервера, то при запросе списка избранного, 
        // возникнет ошибка 404. Поэтому, нужно проверить, что все ид в списке избранного есть на сервере. 
        // Для этого, мы загружаем все продукты, а затем ищем отсутствующие товары на сервере и удаляем их из избранного. 
        const newFavoritesIds = favoritesIds.filter((favoriteId) => products.find((product) => product._id === favoriteId));

        // Если из избранного были удалены какие то товары, то обновляем список в редаксе. 
        if (favoritesIds.length !== newFavoritesIds) {
            dispatch(replaceAllFavorites(newFavoritesIds));
        }

        return api.getProductsByIds(newFavoritesIds);
    }

    return useQuery({
        queryKey: ['favorites'], 
        queryFn: handleFavorites, 
        enabled: !!products, 
        onError: (error) => {
            alert(error.message)
        }
    })
}

export {
    useFavorites, 
}