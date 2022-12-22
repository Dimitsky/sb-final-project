import { useEffect, useState, useRef } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';

import { Container } from '../../components/Container/Container';
import classes from './EditUser.module.css';
import { useAuth } from '../../components/Auth/Auth';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME} from '../../components/consts/consts';

function EditUser() {
    const [ editData, setEditData ] = useState( {} );
    const refNameInput = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const from = location.state ? location.state.from : null;

    useEffect( () => {
        refNameInput.current.focus();
        setEditData( {
            avatar: data.avatar, 
            name: data.name, 
            about: data.about, 
        } )
    }, [] );

    /*
        На страницу редактирования нужно перейти из страницы профиля, 
        чтобы передать из нее загруженные данные пользователя и не загружать их повторно на странице редактирования
    */
    if ( !from ) return <Navigate to="/profile" />

    const data = location.state.data;

    const handleCancel = () => navigate( '/profile' );
    const handleSubmit = event => {
        event.preventDefault();
        event.target.setAttribute( 'disabled', '' );

        const api = new Api( {
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${ auth }`
            }
        } );
        
        api.updateUserAvatar( { avatar: editData.avatar } )
            .then( () => {
                return api.updateUserInfo( { name: editData.name, about: editData.about } );
            } )
            .then( () => {
                navigate( '/profile' );
            } )
            .catch( error => {
                alert( error );
                event.target.removeAttribute( 'disabled' );
            } );
    }
    const handleInput = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        setEditData( prevData => {
            return {
                ...prevData, 
                [ name ]: value, 
            }
        } );
    }

    return (
        <section className={ classes.intro }>
            <Container>
                <div className={ classes.panel }>
                    <form method="PATCH">
                        <div className={ classes.box }>
                            <label 
                                className={ classes.label }
                                htmlFor="avatar"
                            >
                                Ссылка на аватар
                            </label>
                            <input 
                                className={ classes.input }
                                name="avatar" 
                                id="avatar" 
                                type="text" 
                                defaultValue={ data.avatar }
                                onInput={ handleInput }
                            />
                        </div>
                        <div className={ classes.box }>
                            <label 
                                className={ classes.label }
                                htmlFor="name"
                            >
                                Имя
                            </label>
                            <input 
                                className={ classes.input }
                                name="name" 
                                id="name" 
                                type="text" 
                                defaultValue={ data.name }
                                ref={ refNameInput }
                                onInput={ handleInput }
                            />
                        </div>
                        <div className={ classes.box }>
                            <label 
                                className={ classes.label }
                                htmlFor="about"
                            >
                                Обо мне
                            </label>
                            <textarea 
                                className={ classes.textarea }
                                name="about" 
                                id="about" 
                                defaultValue={ data.about }
                                onInput={ handleInput }
                            ></textarea>
                        </div>
                        <div className={ [ classes.box, classes.buttonWrapper ].join( ' ' ) }>
                            <button
                                className={ classes.button }
                                type="submit"
                                onClick={ handleSubmit }
                            >
                                Применить
                            </button>
                            <button
                                className={ classes.button }
                                type="button"
                                onClick={ handleCancel }
                            >
                                Отменить
                            </button>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
}

export {
    EditUser, 
}