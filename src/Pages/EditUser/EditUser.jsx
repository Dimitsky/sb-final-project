// react-router-dom
import { useNavigate } from 'react-router-dom';

// formik
import { useFormik } from 'formik';

// my comps
import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Header } from '../../components/Header/Header';
import { Form, FormControl, FormBox, FormTextarea } from '../../components/Form/Form';
import { GlassBox } from '../../components/GlassBox/GlassBox';
import { Button } from '../../components/Button/Button';

// my hooks
import { useUser } from '../../hooks/useUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';

// css
import classes from './edituser.module.css';

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
        <Wrapper className={classes.wrapper}>
            {/* <Header /> */}
            <GlassBox className={classes.glassBox}>
                <h2 className={classes.title}>Отредактируйте ваши данные</h2>
                <EditUserForm user={user}/>
            </GlassBox>
        </Wrapper>
    );
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
        onSubmit: variables => {
            mutation.mutate(variables)
        },
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
            </FormBox>
            <FormBox>
                <label className={classes.label}>О вас</label>
                <FormTextarea 
                    name="about" 
                    placeholder="Напишите о себе"
                    onChange={ formik.handleChange }
                    value={ formik.values.about }
                />
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
    EditUser, 
}