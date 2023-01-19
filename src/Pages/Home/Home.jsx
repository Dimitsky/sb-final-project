// my comps
import { Wrapper } from '../../components/Wrapper/Wrapper';
import { Inner } from '../../components/Inner/Inner';
import { Search } from '../../components/Search/Search';
import { ProductPreview } from '../../components/ProductPreview/ProductPreview';

// my hooks
import { useProducts } from '../../hooks/useProducts';
import { useUser } from '../../hooks/useUser';

// css
import classes from './home.module.css';
import { Header } from '../../components/Header/Header';

function Home() {
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
                <ul className={classes.list}>
                    {
                        products.map(product => {
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