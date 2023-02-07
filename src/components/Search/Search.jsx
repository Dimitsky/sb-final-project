// react
import { useEffect, useState } from 'react';
import { useRef } from 'react';

// redux
import { useSelector } from "react-redux";

// react router dom
import { Link } from 'react-router-dom';

// me comps
import { FormControl } from '../../components/Form/Form';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { IconSearch } from '../Icon/Icon';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';
import { useDebounce } from '../../hooks/useDebounce';

// css module
import classes from './search.module.css';

function Search() {
    // Хранит состояние панели поиска (открыто / закрыто) 
    const [isOpen, setIsOpen] = useState(false);

    // Хранит состояние текстового поля поиска 
    const [value, setValue] = useState('');

    // Хранит состояние ответа сервера 
    const [search, setSearch] = useState([]);
    
    // Задержка отправки запросов на сервер 
    const debounceValue = useDebounce(value, 500);

    // 
    const searchInputRef = useRef();

    const token = useSelector(state => state.token);

    // handlers
    // 

    // Обновляет состояние поля поиска 
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

    // Очищает состояния результатов поиска и поля поиска 
    const handleClear = () => {
        setSearch([]);
        setValue('');
        setIsOpen(false);
    }

    // Управляет открытием и закрытием панели поиска 
    const handleToggleSearch = (e) => {
        e.stopPropagation();
        setIsOpen(state => !state);
    }

    // 
    useEffect(() => {
        if (!debounceValue) return

        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            }
        });

        api.search(debounceValue)
            .then(result => setSearch(result))
            .catch(error => alert(error.message))
    }, [debounceValue, token, ])

    // 
    useEffect(() => {
        if (!isOpen) return;

        // Закрывает элемент поиска при нажатии за его границы 
        const handleClose = (e) => {
            if (!e.target.closest('[data-wrapper-search]')) {
                handleClear();
            }
        }

        // При открытии панели поиска, ставим фокус на текстовом поле поиска 
        searchInputRef.current.focus();

        // 
        document.documentElement.addEventListener('click', handleClose);

        // 
        return () => {
            document.documentElement.removeEventListener('click', handleClose);
        }
    }, [isOpen])

    return (
        <>
            <ButtonIcon
                className={classes.buttonSearch}
                aria-label="Открыть меню поиска товаров"
                aria-expanded={isOpen}
                onClick={handleToggleSearch}
                data-button-search
            >
                <IconSearch />
            </ButtonIcon>
            {
                isOpen ? (
                    <div
                        className={classes.wrapper}
                        data-wrapper-search
                    >
                        <FormControl
                            className={classes.search} 
                            variant="search"
                            type="text" 
                            value={value}
                            ref={searchInputRef}
                            onChange={handleChange}
                        />
                        {
                            // Если ответ сервера не пустой, то вывести список найденных товаров 
                            search.length ? (
                                <ul className={classes.list}>
                                    {
                                        search.map(product => (
                                            <li 
                                                className={classes.item}
                                                key={product._id}
                                            >
                                                <Link
                                                    className={classes.link}
                                                    to={`${product._id}`}
                                                    onClick={handleClear}
                                                >
                                                    {product.name}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : (
                                null
                            )
                        }
                    </div>
                ) : (
                    null
                )
            }
        </>
    )
}

export {
    Search, 
}