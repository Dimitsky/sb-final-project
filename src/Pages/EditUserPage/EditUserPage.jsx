// react-router-dom
import { useNavigate } from 'react-router-dom';

// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// my comps
import { Header } from '../../components/Header/Header';
import { CartLink } from '../../components/CartLink/CartLink';
import { Logo } from '../../components/Logo/Logo';
import { Form, FormControl, FormBox, FormTextarea } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { BackButton } from '../../components/BackButton/BackButton';

// my hooks
import { useUser } from '../../hooks/useUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';

// css
import classes from './EditUserPage.module.css';

function EditUserPage() {
    const { data: user, error, status } = useUser();

    // // Идет загрузка
     if ( status === 'loading' ) return (
        <p>
            Загрузка...
        </p>
    );

    // Возникла ошибка
    if ( status === error ) return (
        <p>
            { error.message }
        </p>
    );

    // Данные успешно получены
    if (status === 'success') {
        return (
            <>
                <Header>
                    <BackButton text="Назад" />
                    <Logo />
                    <CartLink />
                </Header>
                <div className={classes.edit}>
                    <h2 className={classes.title}>
                        Отредактируйте ваши данные
                    </h2>
                    <EditUserForm user={user}/>
                </div>
            </>
        );
    }

}

function EditUserForm({ user }) {
    const navigate = useNavigate();    
    const mutation = useUpdateUser();
    const formik = useFormik({
        initialValues: {
            avatar: user.avatar,
            name: user.name, 
            about: user.about, 
        },
        validationSchema: Yup.object().shape({
            avatar: Yup.string().required('Необходимо заполнить'),
            name: Yup.string().required('Необходимо заполнить').max(100, 'Максимальная длина 100 символов'),
            about: Yup.string().required('Необходимо заполнить').max(300, 'Максимальная длина 300 символов').min(2, 'Нужно минимум 2 символа'),
        }),
        onSubmit: mutation.mutate,
    });

    return (
        <Form 
            method="PATCH" 
            onSubmit={ formik.handleSubmit }
        >
            <FormBox>
                <label className={classes.label}>Ссылка на аватар</label>
                <FormControl 
                    variant="avatar"
                    name="avatar" 
                    type="text" 
                    placeholder="Введите url аватара"
                    onChange={ formik.handleChange }
                    value={ formik.values.avatar }
                />
                {formik.errors.avatar ? <div className={classes.error}>{ formik.errors.avatar }</div> : null}
            </FormBox>
            <FormBox>
                <label className={classes.label}>Ваше Имя</label>
                <FormControl 
                    variant="name"
                    name="name" 
                    type="text" 
                    placeholder="Введите ваше имя" 
                    onChange={ formik.handleChange } 
                    value={ formik.values.name } 
                />
                {formik.errors.name ? <div className={classes.error}>{ formik.errors.name }</div> : null}
            </FormBox>
            <FormBox className={classes.boxMb}>
                <label className={classes.label}>О вас</label>
                <FormTextarea 
                    name="about" 
                    placeholder="Напишите о себе"
                    onChange={ formik.handleChange }
                    value={ formik.values.about }
                />
                {formik.errors.about ? <div className={classes.error}>{ formik.errors.about }</div> : null}
            </FormBox>
            <FormBox className={classes.btnWrap}>
                <Button 
                    variant="outline"
                    type="button"
                    onClick={ () => navigate( '/profile' ) }
                >
                    Отменить
                </Button>
                <Button type="submit">
                    Применить
                </Button>
            </FormBox>
        </Form>
    );
}

export {
    EditUserPage, 
}