// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// my comps
import { Avatar } from '../Avatar/Avatar';
import { FiveStarRating } from '../FiveStarRating/FiveStarRating';
import { Form, FormBox, FormTextarea, FormFiveStarRating } from '../Form/Form';
import { Button } from '../Button/Button';

// my hooks
import { useUser } from '../../hooks/useUser';

// css 
import classes from './Reviews.module.css';
import { useAddReview } from '../../hooks/useAddReview';
import { useDeleteReview } from '../../hooks/useDeleteReview';

// 
const placeholderTemplate = (
    <div className={classes.placeholder}>
        Нет отзывов
    </div>
);

function Reviews({ data, placeholder, ...restProps }) {
    const ph = placeholder ? placeholder : placeholderTemplate;
    const { data: userData, status: userStatus } = useUser();
    const deleteReviewMutation = useDeleteReview();

    // render functions
    // 

    // 
    const renderDeleteButton = (productId, reviewId, authorId) => {
        if (userStatus === 'success') {
            if (userData._id === authorId) {
                return (
                    <Button 
                        className={classes.delete}
                        variant="link"
                        onClick={() => deleteReviewMutation.mutate({productId, reviewId})}
                    >
                        Удалить
                    </Button>
                )
            } else return null
        } else return null
    }

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
                            data.map(review => (
                                <li
                                    className={classes.item}
                                    key={review._id}
                                >
                                    <div className={classes.body}>
                                        <Avatar 
                                            className={classes.avatar}
                                            link={review.author.avatar}
                                        />
                                        <span className={classes.name}>
                                            {review.author.name}
                                        </span>
                                        <FiveStarRating rating={review.rating} />
                                        <p className={classes.text}>
                                            {review.text}
                                        </p>
                                        <div className={classes.footer}>
                                            <span className={classes.data}>
                                                {review.updated_at}
                                            </span>
                                            {
                                                renderDeleteButton(review.product, review._id, review.author._id)
                                            }
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>          
            }
        </>
    )
}

function ReviewsForm({ className, handler, productId, ...restProps }) {
    const cn = className ? [classes.form, className].join(' ') : classes.form;
    const mutation = useAddReview();

    const formik = useFormik({
        initialValues: { 
            msg: "", 
            rating: "1", 
        },
        validationSchema: Yup.object().shape({
            msg: Yup.string().required('Необходимо заполнить'), 
        }), 
        onSubmit: mutation.mutate, 
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
    Reviews, 
    ReviewsForm, 
}