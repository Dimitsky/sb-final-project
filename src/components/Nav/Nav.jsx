import React from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';

function Nav() {
    const { auth, logout } = useAuth();

    const handleLogout = event => {
        event.preventDefault();
        logout();
    }

    return (
        <nav>
            <ul>
                { auth ? <li><Link to="/">Главная</Link></li> : null }
                {/* { auth ? <li><Link to="/catalog">Каталог</Link></li> : null } */}
                {/* { auth ? <li><Link to="/cart">Корзина</Link></li> : null } */}
                {/* { auth ? <li><Link to="/favourites">Избранное</Link></li> : null } */}
                { auth ? <li><Link to="/profile">Профиль</Link></li> : null }
                { !auth ? <li><Link to="/signin">Войти</Link></li> : null }
                { !auth ? <li><Link to="/signup">Зарегистрироваться</Link></li> : null }
                { auth ? <li><button className="btn btn-danger" onClick={ handleLogout }><i className="bi bi-box-arrow-right"></i> Выйти</button></li> : null }
            </ul>
        </nav>
    );
}

export {
    Nav, 
}