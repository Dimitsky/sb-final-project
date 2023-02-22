// redux
import { useDispatch } from 'react-redux';
import { setToken } from '../../RTK/slices/tokenSlice/tokenSlice';

// react router dom
import { NavLink } from 'react-router-dom';

// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// react query
import { useMutation } from '@tanstack/react-query';

// my comps
import { Header } from '../../components/Header/Header';
import { Logo } from '../../components/Logo/Logo';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';

// css
import classes from './Signin.module.css';

function Signin() {
    const dispatch = useDispatch();
    
    const handleSubmit = values => {
        const api = new Api( {
            baseUrl: BASE_SERVER_URL,
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
            }
        } )

        return api.signIn(values.email, values.password);
    }

    // TanStack Query
    const mutation = useMutation( {
        mutationFn: handleSubmit, 
        onSuccess: (result) => {
            dispatch(setToken(result.token));
        }, 
        onError: (error) => {
            alert(error.message);
        }
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
        <>
            <Header className={classes.header}>
                <Logo />
            </Header>
            <div className={classes.signin}>
                <h2 className={classes.title}>
                    С возвращением
                </h2>
                <p className={classes.text}>
                    Если у вас есть аккаунт, то войдите в него, используя свой логин и пароль.
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
                            Войти
                        </button>
                    </div>
                    <p className={classes.noPass}>
                        {'Нет аккаунта? '}
                        <NavLink 
                            className={classes.signup} 
                            to="/signup"
                        >
                            { "Зарегистрируйтесь" }
                        </NavLink>
                    </p>
                </form>
            </div>
        </>
    );
}

export {
    Signin, 
}