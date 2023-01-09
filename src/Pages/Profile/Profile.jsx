// react
import React from "react";

// redux
import { useDispatch } from 'react-redux';
import { removeToken } from "../../redux/actionsCreators/tokenAC";

// react router dom
import { Link } from 'react-router-dom';

// my comps
import { Avatar } from "../../components/Avatar/Avatar";
import { LS_TOKEN_KEY } from "../../components/consts/consts";

// my hooks
import { useUser } from '../../hooks/useUser';

// css
import './profile.css';

function Profile() {
    const dispatch = useDispatch();
    const { data: user, error, isLoading, isError } = useUser();

    // handlers
    const handleLogout = () => {
        dispatch(removeToken());
        window.localStorage.removeItem(LS_TOKEN_KEY);
    }

    if ( isLoading ) return (
        <div className="container">
            <p>
                Загрузка данных...
            </p>
        </div>
    );

    if ( isError ) return (
        <div className="container">
            <p>
               { error.message }
            </p>
        </div>
    );

    return (
        <section className="profile">
            <div className="container">
                <Avatar 
                    className="profile__avatar"
                    link={ user.avatar }
                />
                <div className="profile__body">
                    <h4 className="profile__title">
                        { user.name }
                    </h4>
                    <p className="">
                        { user.email }
                    </p>
                    <h4 className="profile__title">ID пользователя</h4>
                    <p className="">
                        { user._id }
                    </p>
                    <h4 className="profile__title">Группа</h4>
                    <p className="">
                        { user.group }
                    </p>
                    <h4 className="profile__title">О себе</h4>
                    <p className="">
                        { user.about }
                    </p>
                    <div className="">
                        <Link 
                            className=""
                            to="/profile/edit-user"
                        >
                            Редактировать
                        </Link>
                        <button
                            className=""
                            onClick={ handleLogout }
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export {
    Profile, 
}