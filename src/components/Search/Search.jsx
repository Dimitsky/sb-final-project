// react
import { useState } from 'react';

// redux
import { useSelector } from "react-redux";

// react router dom
import { Link } from 'react-router-dom';

// me comps
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';


// css module
import classes from './search.module.css';

function Search({handler}) {
    const [value, setValue] = useState('');
    const [search, setSearch] = useState([]);
    const token = useSelector(state => state.token);

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
        // Чтобы исправить такое поведение, нужно очищать состояние при пустом поле ввода
        console.log(event.target.value, !event.target.value)
        if (!event.target.value) {
            setSearch([]);
            setValue('');
            return
        }

        setValue(event.target.value);
        api.search(event.target.value)
            .then(result => setSearch(result))
            .catch(error => alert(error.message))

        // handler(api.search(event.target.value));
    }
    const handleCloseSearchResult = () => {
        setSearch([]);
        setValue('');
    }

    return (
        <>
            <input
                className={classes.search} 
                type="text" 
                value={value}
                onChange={handleChange}
            />
            {
                !search.length ? null :
                    <ul className={classes.list}>
                        {
                            search.map(product => (
                                <li key={product._id}>
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