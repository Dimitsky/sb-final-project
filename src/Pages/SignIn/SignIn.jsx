import { useNavigate, NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';

import { Container } from '../../components/Container/Container';
import './signin.css';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';
import { useAuth } from '../../components/Auth/Auth';

function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = values => {
        const api = new Api( {
            baseUrl: BASE_SERVER_URL,
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
            }
        } )

        api.signIn( values.email, values.password )
            .then( result => {
                login( result );
                navigate('/');
            } )
            .catch( error => {
                alert( error.message );
            })
    }

    // TanStack Query
    const mutation = useMutation( {
        mutationFn: handleSubmit, 
    } )

    const formik = useFormik( {
        initialValues: { 
            email: "", 
            password: "", 
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().min(3, 'Слишком короткий!').required('Необходимо заполнить'),
            email: Yup.string().email('Неправильный адрес!').required('Необходимо заполнить'),
        }), 
        onSubmit: mutation.mutate, 
    } );

    return (
        <div className="signin__wrapper">
            <h1 className="signin__logo">DoogFood</h1>
            <Container>
                <h2 className="heading heading--xl signin__heading">
                    С возвращением
                </h2>
                <p className="paragraph signin__paragraph">
                    Если у вас есть аккаунт, то войдите в него, используя свой логин и пароль.
                </p>
                <form 
                    onSubmit={ formik.handleSubmit }
                >
                    <input
                        className="form__input form__input--email signin__input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Электронная почта"
                        onChange={ formik.handleChange }
                        value={ formik.values.email }
                    />
                    { formik.errors.email ? <div className="form__error">{ formik.errors.email }</div> : null }
                    <input
                        className="form__input form__input--lock signin__input"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        onChange={ formik.handleChange }
                        value={ formik.values.password } 
                    />
                    { formik.errors.password ? <div className="form__error">{ formik.errors.password }</div> : null }
                    <button 
                        className="button signin__button"
                        type="submit"
                    >
                        Войти
                    </button>
                    <div className="signin__password-resset-link-wrap">
                        <NavLink 
                            className="button button--text signin__password-resset-link"
                            to="/password-reset"
                        >
                            Забыли пароль
                        </NavLink>
                    </div>
                    <div>
                        <p className="signin__login-wrap">
                            Нет аккаунта?
                            <NavLink className="button button--text signin__login" to="/signup">
                                { " Зарегистрируйтесь" }
                            </NavLink>
                        </p>
                    </div>
                </form>
            </Container>
        </div>
    );
}

export {
    SignIn, 
}