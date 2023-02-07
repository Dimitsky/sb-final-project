// react
import { useState } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setVisivibilyFilter } from '../../RTK/slices/visibilityFilterSlice/visibilityFilterSlice';
import { FILTERS } from '../../RTK/slices/visibilityFilterSlice/visibilityFilterSlice';

// react router dom
import { useSearchParams } from 'react-router-dom';

// my comps
import { Button } from '../Button/Button';

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
        case FILTERS.LIKED:
            return data.filter(product => product.likes.includes(userId));
        default:
            return data;
    }
}

function Categories({ children, className, ...restProps }) {
    const cn = className ? [classes.filters, className].join(' ') : classes.filters;

    const filter = useSelector(state => state.visibilityFilter);
    const [ value, setValue ] = useState(filter);
    const dispatch = useDispatch();
    const [ searchParams, setSearchParams ] = useSearchParams();

    // handlers
    // 

    // 
    const handleChange = (e) => {
        setValue(e.target.value);
        dispatch(setVisivibilyFilter(e.target.value));
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()), 
            filter: e.target.value, 
        });
    }

    return (
        <form
            className={cn}
            {...restProps}
        >
            <h3 className={classes.title}>
                Фильтры
            </h3>
            <label className={classes.label}>
                Показать все
                <input 
                    className={classes.sortName}
                    type="radio" 
                    name="filter"
                    value={FILTERS.ALL}
                    checked={value === FILTERS.ALL}
                    onChange={handleChange}
                />
            </label>
            <label className={classes.label}>
                Со скидкой
                <input 
                    className={classes.sortName}
                    type="radio" 
                    name="filter"
                    value={FILTERS.DISCOUNT}
                    checked={value === FILTERS.DISCOUNT}
                    onChange={handleChange}
                />
            </label>
            <label className={classes.label}>
                Новинки
                <input 
                    className={classes.sortName}
                    type="radio" 
                    name="filter"
                    value={FILTERS.NEW}
                    checked={value === FILTERS.NEW}
                    onChange={handleChange}
                />
            </label>
            <label className={classes.label}>
                Понравились
                <input 
                    className={classes.sortName}
                    type="radio" 
                    name="filter"
                    value={FILTERS.LIKED}
                    checked={value === FILTERS.LIKED}
                    onChange={handleChange}
                />
            </label>
        </form>
    )

    // return (
    //     <ul
    //         className={cn}
    //         {...restProps}
    //     >
    //         {children}
    //     </ul>
    // )
}

function CategoriesLink({ children, className, filter, ...restProps }) {
    const dispatch = useDispatch();
    const stateFilter = useSelector(state => state.visibilityFilter);
    const cn = className ? [classes.item, className].join(' ') : classes.item;
    const [ searchParams, setSearchParams ] = useSearchParams();

    // handlers
    const handleOnClick = event => {
        event.preventDefault();
        // При клике на ссылку в состоянии изменяется текущий фильтр. 
        // Название фильтра передается через пропс filter.
        dispatch(setVisivibilyFilter(filter));
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()), 
            filter, 
        });
    }

    return (
        <li className={cn}>
            <Button 
                // Выделить ссылку, которая отвечает за текущий (тот, что в состоянии) фильтр
                className={filter === stateFilter ? [classes.link, classes.active].join(' ') : classes.link}
                variant="link"
                onClick={handleOnClick}
                {...restProps}
            >
                {children}
            </Button>
        </li>
    )
}

export {
    Categories, 
    CategoriesLink, 
    getFilteredProducts, 
}