// redux
import { useSelector } from 'react-redux';

// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// my comps
import { Avatar } from '../Avatar/Avatar';
import { FiveStarRating } from '../../components/FiveStarRating/FiveStarRating';
import { Form, FormBox, FormTextarea, FormFiveStarRating } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Api } from '../Api/Api';
import { BASE_SERVER_URL, SERVER_GROUP_NAME } from '../consts/consts';

// css 
import classes from './Comments.module.css';

// 
const placeholderTemplate = (
    <div className={classes.placeholder}>
        Нет отзывов
    </div>
);

function Comments({ data, placeholder, ...restProps }) {
    const ph = placeholder ? placeholder : placeholderTemplate;

    return (
        <>
            {
                !data.length ? 
                    ph : 
                    <ul 
                        className={classes.list}
                        {...restProps}
                    >
                        {
                            data.map(comment => (
                                <li
                                    className={classes.item}
                                    key={comment._id}
                                >
                                    <div className={classes.body}>
                                        <div className={classes.header}>
                                            <Avatar 
                                                className={classes.avatar}
                                                link={comment.author.avatar}
                                            />
                                            <div className={classes.infoWrap}>
                                                <span className={classes.name}>
                                                    {comment.author.name}
                                                </span>
                                                <span className={classes.data}>
                                                    {comment.updated_at}
                                                </span>
                                            </div>
                                        </div>
                                        <FiveStarRating rating={comment.rating} />
                                        <p className={classes.text}>
                                            {comment.text}
                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>          
            }
        </>
    )
}

function CommentsForm({ className, handler, productId, ...restProps }) {
    const cn = className ? [classes.form, className].join(' ') : classes.form;

    const token = useSelector(state => state.token);
    // handlers
    // 

    // 
    const handleSubmit = (values) => {
        const api = new Api({
            baseUrl: BASE_SERVER_URL, 
            groupId: SERVER_GROUP_NAME, 
            headers: {
                'Content-Type': 'application/json', 
                'authorization': `Bearer ${token}`, 
            }
        }); 
        const body = {
            text: values.msg, 
            rating: values.rating, 
        }

        api.addRewiev(body, productId)
            .then((result) => console.log(result))
            .catch((error) => alert(error.message))
    }

    const formik = useFormik({
        initialValues: { 
            msg: "", 
            rating: "1", 
        },
        validationSchema: Yup.object().shape({
            msg: Yup.string().required('Необходимо заполнить'), 
        }), 
        onSubmit: handleSubmit, 
    });

    return (
        <Form 
            className={cn}
            onSubmit={formik.handleSubmit}
            {...restProps}
        >
            <FormBox>
                <FormTextarea
                    className={classes.input}
                    id="msg"
                    name="msg"
                    placeholder="Введите текст сообщения"
                    onChange={formik.handleChange}
                    value={formik.values.msg}
                ></FormTextarea>
                {formik.errors.msg ? <div className={classes.error}>{ formik.errors.msg }</div> : null}
            </FormBox>
            <FormBox className={classes.ratingWrap}>
                <span className={classes.ratingText}>Рейтинг</span>
                <FormFiveStarRating 
                    value={formik.values.rating}
                    handler={formik.handleChange}
                />
                <Button
                    className={classes.submit}
                    type="submit"
                >
                    Отправить
                </Button>
            </FormBox>
        </Form>
    )
}

export {
    Comments, 
    CommentsForm, 
}