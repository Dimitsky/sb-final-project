import React from "react";
import { Link, useLocation } from 'react-router-dom';

import { Container } from "../../components/Container/Container";
import { Header } from '../../components/Header/Header';
import { NavBar } from '../../components/NavBar/NavBar';
import { Avatar } from "../../components/Avatar/Avatar";
import classes from './Profile.module.css';
import { Api } from '../../components/Api/Api';
import { useAuth } from '../../components/Auth/Auth';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';

function Profile() {
    const location = useLocation();

    const [ isLoaded, setIsLoaded ] = React.useState( false );
    const [ error, setError ] = React.useState( null );
    const [ data, setData ] = React.useState( null );

    const { auth, logout } = useAuth();

    const api = new Api( {
        baseUrl: BASE_SERVER_URL, 
        groupId: SERVER_GROUP_NAME, 
        headers: {
            'Content-Type': 'application/json', 
            'authorization': `Bearer ${ auth }`
        }
    } );

    const handleLogout = () => logout();

    React.useEffect( () => {
        api.getUserData()
            .finally( () => {
                setIsLoaded( true );
            } )
            .then( result => {
                setData( result );
            } )
            .catch( error => {
                setError( error );
            } )
    }, [] );

    if ( !isLoaded ) return (
        <Container>
            <p>
                Загрузка данных...
            </p>
        </Container>
    );

    if ( error ) return (
        <Container>
            <p>
               { error.message }
            </p>
        </Container>
    );

    if ( !error ) return (
        <>
            <section className={ classes.intro }>
                <Container>
                    <Avatar 
                        className={ classes.avatar }
                        link={ data.avatar }
                    />
                    <h3 className={ classes.title }>
                        { data.name }
                    </h3>
                    <p className={ classes.email }>
                        { data.email }
                    </p>
                </Container>
            </section>
            <section className={ classes.info }>
                <Container>
                    <div className={ [ classes.panel, classes.panelInfo ].join( ' ' ) }>
                        <h3 className={ classes.subtitle }>ID пользователя</h3>
                        <p className={ classes.text }>
                            { data._id }
                        </p>
                        <h3 className={ classes.subtitle }>Группа</h3>
                        <p className={ classes.text }>
                            { data.group }
                        </p>
                        <h3 className={ classes.subtitle }>О себе</h3>
                        <p className={ classes.text }>
                            { data.about }
                        </p>
                        <Link 
                            className={ classes.edit }
                            to="/profile/edit-user"
                            state={ { from: location.pathname, data: data } }
                        >
                            Редактировать
                        </Link>
                    </div>
                    <div className={ [ classes.panel, classes.panelInfo ].join( ' ' ) }>
                        <button
                            className={ classes.logout }
                            onClick={ handleLogout }
                        >
                            Выйти
                        </button>
                    </div>
                </Container>
            </section>
        </>
    );
}

export {
    Profile, 
}