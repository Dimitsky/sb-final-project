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
import { Form, FormControl, FormBox } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { GlassBox } from '../../components/GlassBox/GlassBox';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';

// css
import classes from './signin.module.css';

function SignIn() {
    const dispatch = useDispatch();
    
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
                dispatch(setToken(result.token));
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
        <div className={classes.section}>
            <GlassBox>
                <h1 className={classes.title}>DoogFood</h1>
                <h2 className={classes.subtitle}>
                    С возвращением
                </h2>
                <p className={classes.text}>
                    Если у вас есть аккаунт, то войдите в него, используя свой логин и пароль.
                </p>
                <Form 
                    onSubmit={ formik.handleSubmit }
                >
                    <FormBox>
                        <FormControl
                            className={classes.input}
                            variant="email"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Электронная почта"
                            onChange={ formik.handleChange }
                            value={ formik.values.email }
                        />
                        { formik.errors.email ? <div className={classes.error}>{ formik.errors.email }</div> : null }
                    </FormBox>
                    <FormBox>
                        <FormControl
                            className={classes.input}
                            variant="password"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            onChange={ formik.handleChange }
                            value={ formik.values.password } 
                        />
                        { formik.errors.password ? <div className={classes.error}>{ formik.errors.password }</div> : null }
                    </FormBox>
                    <FormBox>
                        <Button 
                            className={classes.submit}
                            type="submit"
                        >
                            Войти
                        </Button>
                    </FormBox>
                    <NavLink 
                        className={classes.resetPass}
                        to="/password-reset"
                    >
                        Забыли пароль
                    </NavLink>
                    <p className={classes.noPass}>
                        {'Нет аккаунта? '}
                        <NavLink 
                            className={classes.signup} 
                            to="/signup"
                        >
                            { "Зарегистрируйтесь" }
                        </NavLink>
                    </p>
                </Form>
            </GlassBox>
        </div>
    );
}

export {
    SignIn, 
}