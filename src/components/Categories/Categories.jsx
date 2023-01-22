// redux
import { useSelector, useDispatch } from 'react-redux';
import { setVisivibilyFilter } from '../../RTK/slices/visibilityFilterSlice/visibilityFilterSlice';
import { FILTERS } from '../../RTK/slices/visibilityFilterSlice/visibilityFilterSlice';

// css
import classes from './categories.module.css';

// Возвращает отфильтрованный массив продуктов
// Id Пользователя нужен, чтобы вычислить, поставил ли пользователь лайк текущему продукту.
const getFilteredProducts = (data, filter, userId) => {
    switch (filter) {
        case FILTERS.DISCOUNT:
            return data.filter(product => product.discount);
        case FILTERS.NEW: 
            return data.filter(product => product.tags.includes('new'));
        case FILTERS.FAVOURITES:
            return data.filter(product => product.likes.includes(userId));
        default:
            return data;
    }
}

function Categories({ children, className, ...restProps }) {
    const cn = className ? [classes.list, className].join(' ') : classes.list;

    return (
        <ul
            className={cn}
            {...restProps}
        >
            {children}
        </ul>
    )
}

function CategoriesLink({ children, className, filter, ...restProps }) {
    const dispatch = useDispatch();
    const stateFilter = useSelector(state => state.visibilityFilter);
    const cn = className ? [classes.item, className].join(' ') : classes.item;

    // handlers
    const handleOnClick = event => {
        event.preventDefault();
        // При клике на ссылку в состоянии изменяется текущий фильтр. 
        // Название фильтра передается через пропс filter.
        dispatch(setVisivibilyFilter(filter));
    }

    return (
        <li className={cn}>
            <a 
                // Выделить ссылку, которая отвечает за текущий (тот, что в состоянии) фильтр
                className={filter === stateFilter ? [classes.link, classes.active].join(' ') : classes.link}
                href="#"
                onClick={handleOnClick}
                {...restProps}
            >
                {children}
            </a>
        </li>
    )
}

export {
    Categories, 
    CategoriesLink, 
    getFilteredProducts, 
}