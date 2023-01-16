// react router dom
import { useNavigate, NavLink } from 'react-router-dom';

// react query
import { useMutation } from '@tanstack/react-query';

// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// my comps
import { Form, FormControl, FormBox } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { GlassBox } from '../../components/GlassBox/GlassBox';
import { Api } from '../../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../../components/consts/consts';

// css
import classes from './signup.module.css';

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
        <div className={classes.section}>
            <GlassBox>
                <h1 className={classes.title}>DoogFood</h1>
                <h2 className={classes.subtitle}>
                    Впервые у нас?
                </h2>
                <p className={classes.text}>
                    Зарегистрируйте новый аккаунт и получите доступ к нашему каталогу.
                </p>
                <Form 
                    onSubmit={ formik.handleSubmit }
                >
                    <FormBox>
                        <FormControl
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
                            Отправить
                        </Button>
                    </FormBox>
                    <NavLink 
                        className={classes.resetPass}
                        to="/password-reset"
                    >
                        Забыли пароль
                    </NavLink>
                    <p className={classes.noPass}>
                        {'Есть аккаунта? '}
                        <NavLink 
                            className={classes.signin} 
                            to="/signin"
                        >
                            { "Войдите" }
                        </NavLink>
                    </p>
                </Form>
            </GlassBox>
        </div>
    );
}

export {
    SignUp, 
}