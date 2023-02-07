// css 
import { FiveStarRating } from '../FiveStarRating/FiveStarRating';
import classes from './ReviewsInfo.module.css';

// Вычисляет среднюю оценку 
const averageRating = (reviews, fixed = 1) => {
    return +(reviews.reduce((acc, review) => acc += review.rating, 0) / reviews.length).toFixed(fixed)
}

// Возвращает количество оценок равное указанной 
const getRatingCount = (reviews, ratingValue) => {
    return reviews.filter((review) => review.rating === ratingValue).length;
}

// Определяет ширину цветной шкалы 
const getScaleWidth = (reviews, ratingValue) => {
    const count = getRatingCount(reviews, ratingValue);

    // Возвращает процент оценок с рейтингом ratingValue 
    return (100 / reviews.length * count).toFixed(0);
}

function ReviewsInfo({ className, reviews, ...restProps }) {
    const cn = className ? [classes.info, className].join(' ') : classes.info;

    return (
        <div
            className={cn}
            {...restProps}
        >
            <h2 className={classes.title}>Отзывы покупателей</h2>
            {
                !reviews.length ? (
                    <p className={classes.placeholderText}>
                        Отзывов пока нет
                    </p>
                ) : (
                    <>
                        {/* Средняя оценка */}
                        <span className={classes.total}>
                            {averageRating(reviews)}
                        </span>
                        <FiveStarRating
                            className={classes.stars}
                            rating={averageRating(reviews, 0)}
                        />
                        {/* Количество отзывов */}
                        <span className={classes.based}>
                            {`${reviews.length} отзывов`}
                        </span>
                        <ul className={classes.list}>
                            {/* 5 звезд */}
                            <li className={classes.item}>
                                <span className={classes.rating}>
                                    5
                                </span>
                                <div className={classes.box}>
                                    <span className={[classes.boxInner, classes.five].join(' ')} style={{width: `${getScaleWidth(reviews, 5)}%`}}></span>
                                </div>
                                <span className={classes.percent}>
                                    {`${getScaleWidth(reviews, 5)}%`}
                                </span>
                                <span className={classes.count}>
                                    {getRatingCount(reviews, 5)}
                                </span>
                            </li>
                            {/* 4 звезды */}
                            <li className={classes.item}>
                                <span className={classes.rating}>
                                    4
                                </span>
                                <div className={classes.box}>
                                    <span className={[classes.boxInner, classes.four].join(' ')} style={{width: `${getScaleWidth(reviews, 4)}%`}}></span>
                                </div>
                                <span className={classes.percent}>
                                    {`${getScaleWidth(reviews, 4)}%`}
                                </span>
                                <span className={classes.count}>
                                    {getRatingCount(reviews, 4)}
                                </span>
                            </li>
                            {/* 3 звезды */}
                            <li className={classes.item}>
                                <span className={classes.rating}>
                                    3
                                </span>
                                <div className={classes.box}>
                                    <span className={[classes.boxInner, classes.three].join(' ')} style={{width: `${getScaleWidth(reviews, 3)}%`}}></span>
                                </div>
                                <span className={classes.percent}>
                                    {`${getScaleWidth(reviews, 3)}%`}
                                </span>
                                <span className={classes.count}>
                                    {getRatingCount(reviews, 3)}
                                </span>
                            </li>
                            {/* 2 звезды */}
                            <li className={classes.item}>
                                <span className={classes.rating}>
                                    2
                                </span>
                                <div className={classes.box}>
                                    <span className={[classes.boxInner, classes.two].join(' ')} style={{width: `${getScaleWidth(reviews, 2)}%`}}></span>
                                </div>
                                <span className={classes.percent}>
                                    {`${getScaleWidth(reviews, 2)}%`}
                                </span>
                                <span className={classes.count}>
                                    {getRatingCount(reviews, 2)}
                                </span>
                            </li>
                            {/* 1 звезда */}
                            <li className={classes.item}>
                                <span className={classes.rating}>
                                    1
                                </span>
                                <div className={classes.box}>
                                    <span className={[classes.boxInner, classes.one].join(' ')} style={{width: `${getScaleWidth(reviews, 1)}%`}}></span>
                                </div>
                                <span className={classes.percent}>
                                    {`${getScaleWidth(reviews, 1)}%`}
                                </span>
                                <span className={classes.count}>
                                    {getRatingCount(reviews, 1)}
                                </span>
                            </li>
                        </ul>
                    </>
                )
            }
        </div>
    )
}

export {
    ReviewsInfo, 
}