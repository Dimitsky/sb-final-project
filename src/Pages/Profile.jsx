import React from "react";

import { Api } from '../components/Api/Api';
import { useAuth } from '../components/Auth/Auth';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';
import { PageTitle } from '../components/PageTitle/PageTitle';

function Profile() {
    const [ isLoaded, setIsLoaded ] = React.useState( false );
    const [ error, setError ] = React.useState( null );
    const [ data, setData ] = React.useState( null );

    const [ editMode, setEditMode ] = React.useState( false );
    const [ editData, setEditData ] = React.useState( {} );

    const { auth } = useAuth();

    const api = new Api( {
        baseUrl: BASE_SERVER_URL, 
        groupId: SERVER_GROUP_NAME, 
        headers: {
            'Content-Type': 'application/json', 
            'authorization': `Bearer ${ auth }`
        }
    } );

    const handleInput = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        setEditData( prev => {
            return {
                ...prev, 
                ...{
                    [ name ]: value, 
                }
            }
        } )
    }

    const handleOnClickEditBtn = () => {
        setEditMode( !editMode );
        setEditData( {
            avatar: data.avatar, 
            name: data.name, 
            about: data.about,
        } );
    }

    const handleSubmitEditedData = () => {
        Promise.all( [
            api.updateUserAvatar( { 
                avatar: editData.avatar 
            } ),
            api.updateUserInfo( {
                name: editData.name, 
                about: editData.about, 
            } ) 
        ] )
        .then( results => {
            results.forEach( result => setData( result ) );
            setEditMode( false );
        })
        .catch( error => alert( error ) )
    }

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
        <ProfileWrap>
            <p>
                Загрузка данных...
            </p>
        </ProfileWrap>
    );

    if ( error ) return (
        <ProfileWrap>
            <p>
               { error.message }
            </p>
        </ProfileWrap>
    );

    if ( !error ) return (
        <ProfileWrap>
            <div className="card border-0">
                {
                    editMode ? 
                        <input 
                            className="form-control"
                            name="avatar"
                            type="url"
                            defaultValue={ data.avatar }
                            onInput={ handleInput }
                        /> : 
                        <img 
                            className="card-img-top" 
                            src={ data.avatar } 
                            alt="Аватар пользователя" 
                        />
                }
                <div className="card-body">
                    <div className="mb-3">
                        <h6 className="card-subtitle mb-1">
                            Имя
                        </h6>
                        <p className="card-text">
                            { 
                                editMode ? 
                                    <input 
                                        className="form-control" 
                                        name="name" 
                                        type="text" 
                                        defaultValue={ data.name } 
                                        onInput={ handleInput }
                                    /> : 
                                    data.name 
                            }
                        </p>
                    </div>
                    <div className="mb-3">
                        <h6 className="card-subtitle mb-1">
                            Электронная почта
                        </h6>
                        <p className="card-text">
                            { data.email }
                        </p>
                    </div>
                    <div className="mb-3">
                        <h6 className="card-subtitle mb-1">
                            Обо мне
                        </h6>
                        <p className="card-text">
                            { 
                                editMode ? 
                                    <textarea 
                                        className="form-control"
                                        name="about"
                                        defaultValue={ data.about }
                                        onInput={ handleInput }
                                    /> : 
                                    data.about 
                            }
                        </p>
                    </div>
                    <div>
                        <button 
                            type={ editMode ? "submit" : "button"}
                            // for={ editMode ? "" : null }
                            onClick={ handleOnClickEditBtn }
                        >
                            { editMode ? "Отмена" : "Править" }
                        </button>
                        { editMode ? <button type="button" onClick={ handleSubmitEditedData }>Применить</button> : null }
                    </div>
                </div>
            </div>
        </ProfileWrap>
    );
}

function ProfileWrap( { children } ) {
    return (
        <div className="container-fluid">
            <PageTitle title={ "Профиль" } />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                    { children }
                </div>
            </div>
        </div>
    );
}

export {
    Profile, 
}