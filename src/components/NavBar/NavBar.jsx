import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../Auth/Auth';
import { useUser } from '../../hooks/useUser';

import { Avatar } from '../../components/Avatar/Avatar';
import classes from './NavBar.module.css';

function NavBar() {
    const [ isOpen, setIsOpen ] = useState( false );
    const { logout } = useAuth();
    const { data: user } = useUser();

    const handleBurger = () => {
        setIsOpen( !isOpen );
    }

    const handleCloseMenu = () => setIsOpen( false );

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
                            className={ classes.link }
                            to="/"
                            onClick={ handleCloseMenu }
                        >
                            <HomeIcon />
                            Домой
                        </NavLink>
                    </li>
                    <li className={ classes.item }>
                        <NavLink 
                            className={ classes.link }
                            to="/profile"
                            onClick={ handleCloseMenu }
                        >
                            <PersonIcon />
                            Профиль
                        </NavLink>
                    </li>
                    <li className={ classes.item }>
                        <button 
                            className={ [ classes.logout, classes.link].join( ' ' ) }
                            type="button"
                            onClick={ () => logout() }
                        >
                            <LogoutIcon />
                            Выйти
                        </button>
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
            viewBox="0 0 16 16">
            <path 
                fillRule="evenodd" 
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path 
                fillRule="evenodd" 
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
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

export {
    NavBar, 
}