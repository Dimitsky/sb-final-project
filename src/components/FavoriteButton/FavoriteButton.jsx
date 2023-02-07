// redux
import { useDispatch } from 'react-redux';
import { addFavorites, removeFavorites } from '../../RTK/slices/favoritesSlice/favoritesSlice';

// my comps
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { IconStar } from '../Icon/Icon';

// css 
import classes from './FavoriteButton.module.css';

function FavoriteButton({ className, isFavorite, productId, showText = false, ...restProps }) {
    const cn = className ? [classes.button, className] : [classes.button];
    const dispatch = useDispatch();

    // handlers
    // 

    // 
    const handleOnClick = () => {
        // 
        if (isFavorite) dispatch(removeFavorites(productId));
        // 
        else dispatch(addFavorites(productId));
    }

    return (
        <ButtonIcon
            className={isFavorite ? [...cn, classes.active].join(' ') : [...cn].join(' ')}
            {...restProps}
            onClick={handleOnClick}
        >
            <IconStar />
            {
                showText ? (
                    isFavorite ? (
                        <span className={classes.text}>Из избранного</span>
                    ) : (
                        <span className={classes.text}>В избранное</span>
                    )
                ) : (
                    null
                )
            }
        </ButtonIcon>
    )
}

export {
    FavoriteButton, 
}