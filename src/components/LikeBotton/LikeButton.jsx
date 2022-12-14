// redux
import { useSelector } from 'react-redux';

// react query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// my comps
import { Api } from '../Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../consts/consts';

// css
import classes from './LikeButton.module.css';

function LikeButton( { className, productId, isLiked } ) {
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
            queryClient.setQueryData(['products'], (previous) => 
                previous.map((prevProduct) => 
                    prevProduct._id === productId ? data : prevProduct
                )
            );
            queryClient.setQueryData(['products', {id: productId}], () => data);
        }
    } );

    return (
        <button 
            className={ className ? [ classes.like, className ].join( ' ' ) : classes.like }
            type="button"
            aria-label="Поставить лайк товару"
            onClick={ mutation.mutate }
        >
            <svg 
                className={ !isLiked ? classes.icon : [ classes.icon, classes.liked ].join( ' ' ) }  
                viewBox="0 0 19 18" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M1.32781 8.57962C0.381934 5.62651 1.48736 2.25116 4.58768 1.2524C6.2185 0.72613 8.01857 1.03643 9.37435 2.05635C10.657 1.06463 12.5231 0.729656 14.1522 1.2524C17.2525 2.25116 18.365 5.62651 17.42 8.57962C15.9479 13.2605 9.37435 16.8659 9.37435 16.8659C9.37435 16.8659 2.84932 13.3152 1.32781 8.57962Z" 
                    fill="currentColor" 
                    stroke="white" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}

export {
    LikeButton, 
}