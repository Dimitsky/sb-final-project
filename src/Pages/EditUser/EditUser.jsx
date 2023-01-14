import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { useUser } from '../../hooks/useUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';

import './edituser.css';

function EditUser() {
    const { data: user, error, isLoading, isError } = useUser();

     if ( isLoading ) return (
        <div className="container">
            Загрузка...
        </div>
    );

    if ( isError ) return (
        <div className="container">
            { error.message }
        </div>
    );

    return (
        <section className="edit-user">
            <div className="container">
                <div className="">
                    <EditUserForm user={ user }/>
                </div>
            </div>
        </section>
    );
}

function EditUserForm({ user }) {
    const navigate = useNavigate();
    const refSubmitBtn = useRef();
    
    const mutation = useUpdateUser();

    const formik = useFormik({
        initialValues: {
            avatar: user.avatar,
            name: user.name, 
            about: user.about, 
        },
        onSubmit: variables => {
            refSubmitBtn.current.setAttribute( 'disabled', '' );
            mutation.mutate( variables, {
                onSettled: () => {
                    refSubmitBtn.current.removeAttribute( 'disabled' );
                }
            } )
        },
    });

    return (
        <div className='container'>
            <form 
                className='form'
                method="PATCH" 
                onSubmit={ formik.handleSubmit }
            >
                <div className="form__box">
                    <label>Ссылка на аватар</label>
                    <input 
                        name="avatar" 
                        type="text" 
                        placeholder="Введите url аватара"
                        onChange={ formik.handleChange }
                        value={ formik.values.avatar }
                    />
                </div>
                <div className="form__box">
                    <label>Ваше Имя</label>
                    <input 
                        name="name" 
                        type="text" 
                        placeholder="Введите ваше имя" 
                        onChange={ formik.handleChange } 
                        value={ formik.values.name } 
                    />
                </div>
                <div className="form__box" >
                    <label>О вас</label>
                    <input 
                        as="textarea" 
                        name="about" 
                        placeholder="Напишите о себе"
                        onChange={ formik.handleChange }
                        value={ formik.values.about }
                    />
                </div>
                <div className="form__box">
                    <button
                        className="me-3"
                        type="submit"
                        ref={ refSubmitBtn }
                    >
                        Применить
                    </button>
                    <button
                        variant="danger"
                        type="button"
                        onClick={ () => navigate( '/profile' ) }
                    >
                        Отменить</button>
                </div>
            </form>
        </div>
    );
}

export {
    EditUser, 
}