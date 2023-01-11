// react router dom
import { useNavigate, NavLink } from 'react-router-dom';

// react query
import { useMutation } from '@tanstack/react-query';

// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// my comps
import './signup.css';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';

function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = values => {
        const api = new Api( {
            baseUrl: BASE_SERVER_URL,
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
            }
        } )
        
        api.signUp( values.email, values.password )
            .then( () => {
                navigate('/signin');
            } )
            .catch( error => {
                alert( error.message );
            })
    }

    const mutation = useMutation( {
        mutationFn: handleSubmit,
    } );

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
        <div className="signup__wrapper">
            <h1 className="signin__logo">DoogFood</h1>
            <div className='container'>
                <h2 className="heading heading--xl signup__heading">
                    Создайте ваш аккаунт
                </h2>
                <form 
                    onSubmit={ formik.handleSubmit }
                >
                    <input
                        className="form__input form__input--email"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Электронная почта"
                        onChange={ formik.handleChange }
                        value={ formik.values.email }
                    />
                    { formik.errors.email ? <div className="form__error">{ formik.errors.email }</div> : null }
                    <input
                        className="form__input form__input--lock"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        onChange={ formik.handleChange }
                        value={ formik.values.password } 
                    />
                    { formik.errors.password ? <div className="form__error">{ formik.errors.password }</div> : null }
                    <button 
                        className="button signup__submit"
                        type="submit"
                    >
                        Отправить
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
                            Есть аккаунт? 
                            <NavLink className="button button--text signin__login" to="/signin">
                                { "Войдите" }
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export {
    SignUp, 
}