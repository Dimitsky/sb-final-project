// redux
import classes from './FavoritesPage.module.css';

// react router dom
import { Link } from 'react-router-dom';

// my comps
import { Placeholder } from '../../components/Placeholder/Placeholder';

// css 
import { useSelector } from 'react-redux';

// Данные для плейсхолдера на случай, если список избранного пуст 
const placeholderTitle = "Ваш список избранного пуст";
const placeholderText = (
    <>
        <span>
            Добавьте товар в избранное в нашем    
            <Link 
                className={classes.link}
                to="/" 
            >
                каталоге
            </Link>
        </span>
    </>
)

function FavoritesPage({ className, ...restProps }) {
    const cn = className ? [classes.favorites, className].join(' ') : classes.favorites;

    const favoritesIds = useSelector(state => state.favorites);
    const { data: favorites, status, error } = useFavorites(favoritesIds);

    // Идет загрузка 
    if (status === 'loading') {
        return (
            <p>
                Идет загрузка
            </p>
        )
    }

    // Возникла ошибка 
    if (status === 'error') {
        return (
            <p>
                {error.message}
            </p>
        )
    }

    // Данные успешно получены 
    if (status === 'success') {
        return (
            <>
                {
                    !favorites.length ? (
                        <Placeholder 
                            title={placeholderTitle}
                            text={placeholderText}
                        />
                    ) : (
                        <ul 
                            className={cn}
                            {...restProps}
                        >
                            {
                                favorites.map((product) => {
                                    return (
                                        <Card></Card>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </>
        )
    }
}

export {
    FavoritesPage, 
}