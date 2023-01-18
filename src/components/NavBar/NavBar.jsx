// react
import { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../../RTK/slices/tokenSlice/tokenSlice';

// react router dom
import { NavLink } from 'react-router-dom';

// my hooks
import { useUser } from '../../hooks/useUser';

// my comps
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';

// css
import classes from './NavBar.module.css';

function NavBar() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [ isOpen, setIsOpen ] = useState( false );
    const { data: user } = useUser();

    // handlers
    const handleBurger = () => {
        setIsOpen( !isOpen );
    }
    const handleCloseMenu = () => setIsOpen( false );
    const handleLogout = () => {
        dispatch(removeToken());
    };
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
                            <HomeIcon />
                            Домой
                        </NavLink>
                    </li>
                    <li className={ classes.item }>
                        <NavLink 
                            className={isActiveLinkHandler}
                            to="/profile"
                            onClick={ handleCloseMenu }
                        >
                            <PersonIcon />
                            Профиль
                        </NavLink>
                    </li>
                    <li className={ classes.item }>
                        <NavLink 
                            className={isActiveLinkHandler}
                            to="/cart"
                            onClick={ handleCloseMenu }
                        >
                            <CartIcon />
                            Корзина
                            <CartBadge count={cart.length}/>
                        </NavLink>
                    </li>
                    <li className={ classes.item }>
                        <Button 
                            className={ [ classes.logout].join( ' ' ) }
                            variant="outline"
                            type="button"
                            onClick={ handleLogout }
                        >
                            <LogoutIcon />
                            Выйти
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

function PersonIcon() {
    return (
        <svg 
            className={ classes.linkIcon } 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg 
            className={ classes.linkIcon } 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg 
            className={ classes.linkIcon } 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path 
                fillRule="evenodd" 
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path 
                fillRule="evenodd" 
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
    );
}

function CartIcon() {
    return (
        <svg 
            className={ classes.linkIcon } 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
        </svg>
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

function CartBadge({count}) {
    return (
        <span className={classes.cartBadge}>
            {count}
        </span>
    )
}

export {
    NavBar, 
}