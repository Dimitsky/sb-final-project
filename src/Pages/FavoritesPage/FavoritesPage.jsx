// react router dom
import { Link } from 'react-router-dom';

// my comps
import { Header } from '../../components/Header/Header';
import { Logo } from '../../components/Logo/Logo';
import { NavBar } from '../../components/NavBar/NavBar';
import { CartLink } from '../../components/CartLink/CartLink';
import { Search } from '../../components/Search/Search';
import { Placeholder } from '../../components/Placeholder/Placeholder';
import { ProductPreview } from '../../components/ProductPreview/ProductPreview';

// my hooks 
import { useFavorites } from '../../hooks/useFavorites';

// css 
import classes from './FavoritesPage.module.css';

// Данные для плейсхолдера на случай, если список избранного пуст 
const placeholderTitle = "Ваш список избранного пуст";
const placeholderText = (
    <>
        <span>
            {"Добавьте товар в избранное в нашем "}    
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
                <Header>
                    <NavBar />
                    <Logo className={classes.logo} />
                    <div className={classes.box}>
                        <Search />
                        <CartLink className={classes.cart} />
                    </div>
                </Header>
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
                                            <ProductPreview data={product} />
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