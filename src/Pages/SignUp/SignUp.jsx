// react router dom
import { useNavigate, NavLink } from 'react-router-dom';

// react query
import { useMutation } from '@tanstack/react-query';

// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// my comps
import { Header } from '../../components/Header/Header';
import { Logo } from '../../components/Logo/Logo';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';

// css
import classes from './Signup.module.css';

function Signup() {
    const navigate = useNavigate();

    const handleSubmit = values => {
        const api = new Api( {
            baseUrl: BASE_SERVER_URL,
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
            }
        } )
        
        return api.signUp( values.email, values.password );
    }

    const mutation = useMutation( {
        mutationFn: handleSubmit, 
        onSuccess: () => {
            navigate('/signin');
        }, 
        onError: (error) => {
            alert(error.message);
        }
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
        <>
            <Header className={classes.header}>
                <Logo />
            </Header>
            <div className={classes.signin}>
                <h2 className={classes.title}>
                    Впервые у нас?
                </h2>
                <p className={classes.text}>
                    Зарегистрируйте новый аккаунт и получите доступ к нашему каталогу.
                </p>
                <form 
                    className={classes.form}
                    onSubmit={ formik.handleSubmit }
                >
                    <label className={classes.label}>
                        Электронная почта
                        <input
                            className={classes.input}
                            variant="email"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Введите ваш email"
                            onChange={ formik.handleChange }
                            value={ formik.values.email }
                        />
                        { formik.errors.email ? <div data-error>{ formik.errors.email }</div> : null }
                    </label>
                    <label className={classes.label}>
                        Пароль
                        <input
                            className={classes.input}
                            variant="password"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Введите ваш пароль"
                            onChange={ formik.handleChange }
                            value={ formik.values.password } 
                        />
                        { formik.errors.password ? <div data-error>{ formik.errors.password }</div> : null }
                    </label>
                    <div className={classes.buttonWrap}>
                        <button 
                            className={classes.submit}
                            type="submit"
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                    <p className={classes.noPass}>
                        {'Есть аккаунта? '}
                        <NavLink 
                            className={classes.signup} 
                            to="/signin"
                        >
                            { "Войдите" }
                        </NavLink>
                    </p>
                </form>
            </div>
        </>
    );
}

export {
    Signup, 
}