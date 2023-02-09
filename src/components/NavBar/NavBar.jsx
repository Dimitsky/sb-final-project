// react
import { useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { removeToken } from '../../RTK/slices/tokenSlice/tokenSlice';

// react router dom
import { NavLink } from 'react-router-dom';

// my hooks
import { useUser } from '../../hooks/useUser';

// my comps
import { Avatar } from '../../components/Avatar/Avatar';
import { IconHouse, IconUser, IconStar, IconLogout } from '../Icon/Icon';

// css
import classes from './NavBar.module.css';

function NavBar() {
    const dispatch = useDispatch();
    const [ isOpen, setIsOpen ] = useState( false );
    const { data: user } = useUser();

    // handlers
    // 

    // Открывает / закрывает мобильное меню 
    const handleBurger = () => {
        setIsOpen( !isOpen );
    }
    // Закрывает мобильное меню 
    const handleCloseMenu = () => setIsOpen( false );
    // Выйти из аккаунта 
    const handleLogout = () => {
        dispatch(removeToken());
    };
    // Выделяет меню соответствующее текущей странице 
    const isActiveLinkHandler = ({ isActive }) => isActive ? [classes.link, classes.linkActive].join(' ') : classes.link;

    return (
        <nav className={ classes.nav }>
            <NavBurger 
                handler={ handleBurger } 
                isExpanded={ isOpen }
            />
            <div className={ isOpen ? [ classes.wrapper, classes.open ].join( ' ' ) : classes.wrapper }>
                <NavLink 
                    className={ classes.user }
                    to="/profile"
                    onClick={ handleCloseMenu }
                >
                    <Avatar 
                        className={ classes.avatar }
                        link={ user?.avatar }
                    />
                    <p className={ classes.name }>
                        { user?.name }
                    </p>
                </NavLink>
                <ul className={ classes.list }>
                    <li className={ classes.item }>
                        <NavLink
                            className={isActiveLinkHandler}
                            to="/"
                            onClick={ handleCloseMenu }
                        >
                            <IconHouse className={classes.icon} />
                            Домой
                        </NavLink>
                    </li>
                    <li className={ classes.item }>
                        <NavLink 
                            className={isActiveLinkHandler}
                            to="/profile"
                            onClick={ handleCloseMenu }
                        >
                            <IconUser className={classes.icon} />
                            Профиль
                        </NavLink>
                    </li>
                    <li className={ classes.item }>
                        <NavLink 
                            className={isActiveLinkHandler}
                            to="/favorites"
                            onClick={ handleCloseMenu }
                        >
                            <IconStar className={classes.icon} />
                            Избранное
                        </NavLink>
                    </li>
                    <li className={ classes.item }>
                        <button 
                            className={classes.logout}
                            type="button"
                            onClick={ handleLogout }
                        >
                            <IconLogout className={[classes.icon, classes.iconLogout].join(' ')} />
                            Выйти
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

function NavBurger( { handler, isExpanded } ) {
    return (
        <button 
            className={ classes.burger }
            aria-expanded={ isExpanded }
            aria-label="Меню"
            onClick={ handler }
        >
            <span className={ classes.line }></span>
        </button>
    );
}

export {
    NavBar, 
}