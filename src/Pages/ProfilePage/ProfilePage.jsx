// react
import React from 'react';

// redux
import { useDispatch } from 'react-redux';
import { removeToken } from '../../RTK/slices/tokenSlice/tokenSlice';

// react router dom
import { Link } from 'react-router-dom';

// my comps
import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Inner } from '../../components/Inner/Inner';
import { Header } from '../../components/Header/Header';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { GlassBox } from '../../components/GlassBox/GlassBox';

// my hooks
import { useUser } from '../../hooks/useUser';

// css
import classes from './ProfilePage.module.css';

function ProfilePage() {
    const dispatch = useDispatch();
    const { data: user, error, isLoading, isError } = useUser();

    // handlers
    const handleLogout = () => {
        dispatch(removeToken());
    }

    if ( isLoading ) return (
        <div className="container">
            <p>
                Загрузка данных...
            </p>
        </div>
    );

    if ( isError ) return (
        <div className="container">
            <p>
               { error.message }
            </p>
        </div>
    );

    return (
        <Wrapper className={classes.wrapper}>
            <Inner>
                <Header />
                <div className={classes.layout}>
                    <GlassBox>
                        <Avatar 
                            className={classes.avatar}
                            link={ user.avatar }
                        />
                        <h4 className={classes.title}>
                            { user.name }
                        </h4>
                        <p className={classes.text}>
                            { user.email }
                        </p>
                        <h4 className={classes.title}>ID пользователя</h4>
                        <p className={classes.text}>
                            { user._id }
                        </p>
                        <h4 className={classes.title}>Группа</h4>
                        <p className={classes.text}>
                            { user.group }
                        </p>
                    </GlassBox>
                    <GlassBox>
                        <h4 className={classes.title}>О себе</h4>
                        <p className={classes.text}>
                            { user.about }
                        </p>
                    </GlassBox>
                    <GlassBox>
                        <Link 
                            className={classes.edit}
                            to="/add_product"
                        >
                            Добавить новый товар
                        </Link>
                    </GlassBox>
                    <GlassBox className={ classes.btnWrap}>
                        <Link 
                            className={classes.edit}
                            to="/profile/edit-user"
                        >
                            Редактировать
                        </Link>
                        <Button
                            className={classes.logout}
                            onClick={ handleLogout }
                        >
                            Выйти
                        </Button>
                    </GlassBox>
                </div>
            </Inner>
        </Wrapper>
    );
}

export {
    ProfilePage, 
}