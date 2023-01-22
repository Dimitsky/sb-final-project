// redux
import { useSelector } from 'react-redux';

// my comps
import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Inner } from '../../components/Inner/Inner';
import { Header } from '../../components/Header/Header';
import { Categories, CategoriesLink, getFilteredProducts } from '../../components/Categories/Categories';
import { Search } from '../../components/Search/Search';
import { ProductPreview } from '../../components/ProductPreview/ProductPreview';
import { FILTERS } from '../../RTK/slices/visibilityFilterSlice/visibilityFilterSlice';

// my hooks
import { useProducts } from '../../hooks/useProducts';
import { useUser } from '../../hooks/useUser';

// css
import classes from './home.module.css';
import { GlassBox } from '../../components/GlassBox/GlassBox';

function Home() {
    const filter = useSelector(state => state.visibilityFilter);
    const { data: products, error, status: productsStatus } = useProducts();
    const { data: user } = useUser();
    
    if (productsStatus === 'loading') return (
        <div className='container'>
            <p>
                Идет загрузка...
            </p>
        </div>
    ); 

    if (productsStatus === 'error') return (
        <div className='container'>
            {error.message}
        </div>
    ); 
    
    return ( 
        <Wrapper className={classes.wrapper}>
            <Inner className={classes.inner}>
                <Header>
                    <Search 
                        className={classes.Search}
                    />
                </Header>
                <GlassBox className={classes.categoriesWrap}>
                    <Categories>
                        <CategoriesLink 
                            filter={FILTERS.ALL}
                        >
                            Все
                        </CategoriesLink>
                        <CategoriesLink 
                            filter={FILTERS.DISCOUNT}
                        >
                            Скидка
                        </CategoriesLink>
                        <CategoriesLink 
                            filter={FILTERS.NEW}
                        >
                            Новые
                        </CategoriesLink>
                        <CategoriesLink 
                            filter={FILTERS.FAVOURITES}
                        >
                            Избранное
                        </CategoriesLink>
                    </Categories>
                </GlassBox>
                <ul className={classes.list}>
                    {
                        getFilteredProducts(products, filter, user._id).map(product => {
                            return (
                                <li 
                                    className={classes.item}
                                    key={ product._id }
                                >
                                    <ProductPreview data={product} user={user} />
                                </li>
                            );
                        })
                    }
                </ul>
            </Inner>
        </Wrapper>
    );
}

export {
    Home, 
}