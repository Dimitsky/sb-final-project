// react
import { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setSort , SORT} from '../../RTK/slices/sortSlice/sortSlice';

// react router dom
import { useSearchParams } from 'react-router-dom';

// css
import classes from './SortMenu.module.css';

const getSortedProducts = (products, sort) => {
    switch (sort) {
        case SORT.PRICE_UP:
            return [...products].sort((a, b) => a.price - b.price);
        case SORT.PRICE_DOWN:
            return [...products].sort((a, b) => b.price - a.price);
        case SORT.DISCOUNT_UP:
            return [...products].sort((a, b) => a.discount - b.discount);
        case SORT.DISCOUNT_DOWN:
            return [...products].sort((a, b) => b.discount - a.discount);
        case SORT.DATE_UP:
            return [...products].sort((a, b) => {
                if (a.created_at < b.created_at) return -1
                if (a.created_at > b.created_at) return 1
                if (a.created_at === b.created_at) return 0
            });
        case SORT.DATE_DOWN:
            return [...products].sort((a, b) => {
                if (b.created_at < a.created_at) return -1
                if (b.created_at > a.created_at) return 1
                if (b.created_at === a.created_at) return 0
            });
        default:
            return products
    }
}

function SortMenu({ className,  ...restProps }) {
    const cn = className ? [classes.sort, className].join(' ') : classes.sort;

    const sort = useSelector(state => state.sort);
    const [ value, setValue ] = useState(sort);
    const dispatch = useDispatch();
    const [ searchParams, setSearchParams ] = useSearchParams();

    // handlers
    // 

    // 
    const handleChange = (e) => {
        setValue(e.target.value);
        dispatch(setSort(e.target.value));
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()), 
            sort: e.target.value, 
        });
    }

    return (
        <form
            className={cn}
            {...restProps}
        >
            <h3 className={classes.title}>
                Сортировка 
            </h3>
            <label className={classes.label}>
                Цена по возрастанию
                <input 
                    className={classes.sortName}
                    type="radio" 
                    name="sort"
                    value={SORT.PRICE_UP}
                    checked={value === SORT.PRICE_UP}
                    onChange={handleChange}
                />
            </label>
            <label className={classes.label}>
                Цена по убыванию
                <input 
                    className={classes.sortName}
                    type="radio" 
                    name="sort"
                    value={SORT.PRICE_DOWN}
                    checked={value === SORT.PRICE_DOWN}
                    onChange={handleChange}
                />
            </label>
            <label className={classes.label}>
                Скидка по возрастанию
                <input 
                    className={classes.sortName}
                    type="radio" 
                    name="sort"
                    value={SORT.DISCOUNT_UP}
                    checked={value === SORT.DISCOUNT_UP}
                    onChange={handleChange}
                />
            </label>
            <label className={classes.label}>
                Скидка по убыванию
                <input 
                    className={classes.sortName}
                    type="radio" 
                    name="sort"
                    value={SORT.DISCOUNT_DOWN}
                    checked={value === SORT.DISCOUNT_DOWN}
                    onChange={handleChange}
                />
            </label>
            <label className={classes.label}>
                Дата по возрастанию
                <input 
                    className={classes.sortName}
                    type="radio" 
                    name="sort"
                    value={SORT.DATE_UP}
                    checked={value === SORT.DATE_UP}
                    onChange={handleChange}
                />
            </label>
            <label className={classes.label}>
                Дата по убыванию
                <input 
                    className={classes.sortName}
                    type="radio" 
                    name="sort"
                    value={SORT.DATE_DOWN}
                    checked={value === SORT.DATE_DOWN}
                    onChange={handleChange}
                />
            </label>
        </form>
    )
}

export {
    SortMenu, 
    SORT, 
    getSortedProducts, 
}