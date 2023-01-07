import React from "react";
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Avatar } from "../../components/Avatar/Avatar";
import { useAuth } from '../../components/Auth/Auth';
import { useUser } from '../../hooks/useUser';

import './profile.css';

function Profile() {
    const { logout } = useAuth();
    const { data: user, error, isLoading, isError } = useUser();

    if ( isLoading ) return (
        <Container>
            <p>
                Загрузка данных...
            </p>
        </Container>
    );

    if ( isError ) return (
        <Container>
            <p>
               { error.message }
            </p>
        </Container>
    );

    return (
        <section className="profile">
            <Container 
                className="profile__container"
                fluid
            >
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
                            className="btn btn-primary me-3"
                            to="/profile/edit-user"
                        >
                            Редактировать
                        </Link>
                        <Button
                            className=""
                            variant="danger"
                            onClick={ logout }
                        >
                            Выйти
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export {
    Profile, 
}