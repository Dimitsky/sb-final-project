// react router dom
import { Link } from 'react-router-dom';

// my comps
import { Placeholder } from '../../components/Placeholder/Placeholder';
import { Card, CardBody, CardImg, CardTitle } from '../../components/Card/Card';

// my hooks 
import { useFavorites } from '../../hooks/useFavorites';

// css 
import classes from './FavoritesPage.module.css';

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

    const { data: favorites, status, error } = useFavorites();

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
                                        <li 
                                            key={product._id}
                                        >
                                            <Card>
                                                <CardImg 
                                                    src={product.pictures}
                                                />
                                                <CardBody>
                                                    <CardTitle 
                                                        text={product.name}
                                                    />
                                                </CardBody>
                                            </Card>
                                        </li>
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