// react
import { useEffect, useState } from 'react';

// redux
import { useSelector } from "react-redux";

// react router dom
import { Link } from 'react-router-dom';

// me comps
import { FormControl } from '../../components/Form/Form';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';
import { useDebounce } from '../../hooks/useDebounce';

// css module
import classes from './search.module.css';

function Search() {
    const [value, setValue] = useState('');
    const [search, setSearch] = useState([]);
    const token = useSelector(state => state.token);
    const debounceValue = useDebounce(value, 500);

    const api = new Api({
        baseUrl: BASE_SERVER_URL, 
        groupId: SERVER_GROUP_NAME, 
        headers: {
            'Content-Type': 'application/json', 
            'authorization': `Bearer ${token}`, 
        }
    });

    // handlers
    const handleChange = event => {
        // Если после первого результата поиска очистить текстовое поле, 
        // то бэкенд пришлет в ответ ВСЕ товары на сервере. 
        // Чтобы исправить такое поведение, нужно очищать состояние при пустом поле ввода. 
        if (!event.target.value) {
            setSearch([]);
            setValue('');
            return
        }

        setValue(event.target.value);
    }
    const handleCloseSearchResult = () => {
        setSearch([]);
        setValue('');
    }

    useEffect(() => {
        if (!debounceValue) return

        api.search(debounceValue)
            .then(result => setSearch(result))
            .catch(error => alert(error.message))
    }, [debounceValue])

    return (
        <>
            <FormControl
                className={classes.search} 
                variant="search"
                type="text" 
                value={value}
                onChange={handleChange}
            />
            {
                !search.length ? null :
                    <ul className={classes.list}>
                        {
                            search.map(product => (
                                <li 
                                    className={classes.item}
                                    key={product._id}
                                >
                                    <Link
                                        className={classes.link}
                                        to={`products/${product._id}`}
                                        onClick={handleCloseSearchResult}
                                    >
                                        {product.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
            }
        </>
    )
}

export {
    Search, 
}