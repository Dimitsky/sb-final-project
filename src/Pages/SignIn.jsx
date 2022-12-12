import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Api } from '../components/Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../components/consts/consts';
import { useAuth } from '../components/Auth/Auth';
import { PageTitle } from '../components/PageTitle/PageTitle';

function SignIn( { needSignUp } ) {
    const { login } = useAuth();
    const navigate = useNavigate();

    const api = new Api( {
        baseUrl: BASE_SERVER_URL,
        groupId: SERVER_GROUP_NAME, 
        headers: {
            'Content-Type': 'application/json', 
        }
    } )

    const handleSubmitSignIn = values => {
        api.signIn( values.email, values.password )
            .then( result => {
                login( result );
                navigate('/');
            } )
            .catch( error => {
                alert( error.message );
            })
    }

    const handleSubmitSignUp = values => {
        api.signUp( values.email, values.password )
            .then( () => {
                return api.signIn( values.email, values.password );
            } )
            .then( result => {
                login( result );
                navigate('/');
            } )
            .catch( error => {
                alert( error.message );
            })
    }

    const formik = useFormik( {
        initialValues: { 
            email: "", 
            password: "", 
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().min(3, 'Слишком короткий!').required('Необходимо заполнить'),
            email: Yup.string().email('Неправильный адрес!').required('Необходимо заполнить'),
        }), 
        onSubmit: needSignUp ? handleSubmitSignUp : handleSubmitSignIn, 
    } );

    return (
        <div className="container-fluid">
            <PageTitle title={ needSignUp ? "Регистрация" : "Вход" } />
                <form 
                    onSubmit={ formik.handleSubmit }
                >
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                            className="form-control"
                            id="email"
                            name="email"
                            type="email"
                            onChange={ formik.handleChange }
                            value={ formik.values.email }
                        />
                        { formik.errors.email ? <div style={ { color: 'red' } }>{ formik.errors.email }</div> : null }
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            type="password"
                            onChange={ formik.handleChange }
                            value={ formik.values.password } 
                        />
                        { formik.errors.password ? <div style={ { color: 'red' } }>{ formik.errors.password }</div> : null }
                    </div>
                    <div className="">
                        <button 
                            className="btn btn-dark"
                            type="submit"
                        >Отправить</button>
                    </div>
                </form>
        </div>
    );
}

export {
    SignIn, 
}