// react
import { useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// my comps
import { getFilteredProducts } from '../../components/Categories/Categories';
import { ProductPreview } from '../../components/ProductPreview/ProductPreview';
import { Placeholder } from '../../components/Placeholder/Placeholder';
import { Categories } from '../../components/Categories/Categories';
import { Header } from '../../components/Header/Header';
import  { NavBar } from '../../components/NavBar/NavBar';
import { Logo } from '../../components/Logo/Logo';
import { CartLink } from '../../components/CartLink/CartLink';
import { Search } from '../../components/Search/Search';
import { SortMenu, getSortedProducts } from '../../components/SortMenu/SortMenu';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { IconFilter } from '../../components/Icon/Icon';

// my hooks
import { useProducts } from '../../hooks/useProducts';
import { useUser } from '../../hooks/useUser';

// css
import classes from './HomePage.module.css';

const placeholderTitle = 'Товары не найдены';
const placeholderContent = 'Попробуйте изменить фильтр, либо перезагрузите страницу!';

function HomePage() {
    const filter = useSelector(state => state.visibilityFilter);
    const sort = useSelector(state => state.sort);
    const { data: products, error: productsError, status: productsStatus } = useProducts();
    const { data: user, error: userError, status: userStatus } = useUser();
    const [ isOpenFilterMenu, setIsOpenFilterMenu ] = useState(false);

    // handlers
    // 

    // 
    const handleOnClickFIlterButton = () => {
        setIsOpenFilterMenu(!isOpenFilterMenu);
    }

    if (productsStatus === 'success' && userStatus === 'success') {
        var filteredProducts = getFilteredProducts(products, filter, user._id);
        var sortedProducts = getSortedProducts(filteredProducts, sort);
    }
    
    // Идет загрузка
    if (productsStatus === 'loading') return (
        <div className='container'>
            <p>
                Идет загрузка...
            </p>
        </div>
    ); 

    // Возникла ошибка
    if (productsStatus === 'error') return (
        <div className='container'>
            {productsError.message}
        </div>
    ); 
    
    // Данные успешно получены
    if (productsStatus === 'success' && userStatus === 'success') {
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
                <ButtonIcon 
                    className={classes.filterButton}
                    onClick={handleOnClickFIlterButton}
                >
                    <IconFilter />
                </ButtonIcon>
                <div 
                    className={classes.filtersWrap}
                    aria-expanded={isOpenFilterMenu}
                >
                    <div className={classes.filtersInner}>
                        <Categories className={classes.filters}/>
                        <SortMenu className={classes.sorts} />
                    </div>
                </div>
                <ul className={classes.list}>
                    {
                        // Если продуктов не найдено (сервер вернул пустой массив, либо нет продуктов подходящих под текущий фильтр), 
                        // то отобразить заглушку.
                        !sortedProducts.length ? (
                            <Placeholder 
                                title={placeholderTitle} 
                                text={placeholderContent} 
                            />
                        ) : (
                            sortedProducts.map(product => {
                                return (
                                    <li 
                                        className={classes.item}
                                        key={ product._id }
                                    >
                                        <ProductPreview data={product} />
                                    </li>
                                );
                            })
                        )
                    }
                </ul>
            </>
        );
    }
}

export {
    HomePage, 
}