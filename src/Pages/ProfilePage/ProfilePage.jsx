// react
import React from 'react';

// redux
import { useDispatch } from 'react-redux';
import { removeToken } from '../../RTK/slices/tokenSlice/tokenSlice';

// react router dom
import { Link } from 'react-router-dom';

// my comps
import { Header } from '../../components/Header/Header';
import { Logo } from '../../components/Logo/Logo';
import { NavBar } from '../../components/NavBar/NavBar';
import { CartLink } from '../../components/CartLink/CartLink';
import { Search } from '../../components/Search/Search';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { IconCart, IconChevron, IconFileAdd, IconLogout, IconStar } from '../../components/Icon/Icon';

// my hooks
import { useUser } from '../../hooks/useUser';

// css
import classes from './ProfilePage.module.css';

function ProfilePage() {
    const dispatch = useDispatch();
    const { data: user, error, status } = useUser();

    // handlers
    // 

    // 
    const handleLogout = () => {
        dispatch(removeToken());
    }

    // Идет загрузка
    if (status === 'loading') return (
        <p>
            Загрузка данных...
        </p>
    );

    // Возникла ошибка
    if (status === 'error') return (
        <p>
            {error.message}
        </p>
    );

    // Данные успешно получены
    if (status === 'success') {
        return (
            <>
                <Header>
                    <NavBar />
                    <Logo className={classes.logo} />
                    <div className={classes.box}>
                        <Search />
                        <CartLink className={classes.cart} />
                    </div>
                </Header>
                <div className={classes.profile}>
                    <div className={classes.top}>
                        <Avatar 
                            className={classes.avatar}
                            link={user.avatar}
                        />
                        <div className={classes.info}>
                            <span className={classes.name}>
                                {user.name}
                            </span>
                            <span className={classes.email}>
                                {user.email}
                            </span>
                            <Link
                                className={classes.edit}
                                to="/profile/edit-user"
                            >
                                Редактировать
                            </Link>
                        </div>
                    </div>
                    <ul className={classes.list}>
                        <li className={classes.item}>
                            <Link
                                className={classes.link}
                                to="/favorites"
                            >
                                <IconStar className={classes.icon} />
                                Избранное
                                <IconChevron 
                                    className={[classes.icon, classes.chevron].join(' ')}
                                />
                            </Link>
                        </li>
                        <li className={[classes.item, classes.br].join(' ')}>
                            <Link
                                className={classes.link}
                                to="/cart"
                            >
                                <IconCart className={classes.icon} />
                                Корзина
                                <IconChevron 
                                    className={[classes.icon, classes.chevron].join(' ')}
                                />
                            </Link>
                        </li>
                        <li className={classes.item}>
                            <Link
                                className={classes.link}
                                to="/add_product"
                            >
                                <IconFileAdd className={classes.icon} />
                                Добавить товар
                                <IconChevron 
                                    className={[classes.icon, classes.chevron].join(' ')}
                                />
                            </Link>
                        </li>
                        <li className={classes.item}>
                            <Link
                                className={classes.link}
                                onClick={handleLogout}
                            >
                                <IconLogout className={[classes.icon, classes.logout].join(' ')} />
                                Выйти
                                <IconChevron 
                                    className={[classes.icon, classes.chevron].join(' ')}
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

export {
    ProfilePage, 
}