// redux
import { useSelector } from 'react-redux';

// react query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// my comps
import { Api } from '../Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../consts/consts';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { IconHeart } from '../Icon/Icon'; 

// css
import classes from './LikeButton.module.css';

function LikeButton( { className, productId, isLiked } ) {
    const cn = className ? [classes.like, className] : [classes.like];
    const token = useSelector(state => state.token);
    const queryClient = useQueryClient();

    // handlers
    const handleClick = () => {
        const api = new Api( {
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${ token }`, 
            }
        } )

        /*
            Чтобы не дублировать код подписчиков на промисы, выбираем метод в зависимости от состояния кнопки-лайк, 
            а затем подключаем подписчиков.
        */
        const promise = isLiked ? api.removeProductLike( productId ) : api.setProductLike( productId );

        return promise.then()
    }

    const mutation = useMutation( {
        mutationKey: ['products', {id: productId}], 
        mutationFn: handleClick, 
        onSuccess: (data) => {
            /*
                Вручную обновляем состояние клиентских данных. 
                Ищем продукт которому мы поставили лайк и заменяем его обновленной версией, которую нам вернул сервер.
            */
            queryClient.setQueryData(['products'], (previous) => {
                // Если мы сразу по ссылке загрузим детальную страницу (в этом случае не будут загружены все продукты с ключом [‘product’]),
                // то при попытке изменить список товаров по ключу [‘product’], произойдет ошибка TypeError, 
                // тк еще не были загружены все товары (они загружаются только на главной странице) 
                if (!previous) return

                return previous.map((prevProduct) => 
                    prevProduct._id === productId ? data : prevProduct
                )
            }
            );
            queryClient.setQueryData(['products', {id: productId}], () => data);
        }
    } );

    return (
        <ButtonIcon 
            className={isLiked ? [...cn, classes.active].join(' ') : [...cn].join(' ')}
            aria-label="Поставить лайк товару"
            onClick={mutation.mutate}
        >
            <IconHeart />
        </ButtonIcon>
    );
}

export {
    LikeButton, 
}