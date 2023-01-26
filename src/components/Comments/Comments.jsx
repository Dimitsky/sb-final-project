// my comps
import { Avatar } from '../Avatar/Avatar';

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
                                            <span className={classes.name}>
                                                {comment.author.name}
                                            </span>
                                            <span className={classes.data}>
                                                {comment.created_at}
                                            </span>
                                            <span className={classes.data}>
                                                {comment.updated_at}
                                            </span>
                                        </div>
                                        <span className={classes.rating}>
                                            рейтинг {comment.rating}
                                        </span>
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

export {
    Comments, 
}