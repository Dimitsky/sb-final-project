import { ProductPreview } from '../../components/ProductPreview/ProductPreview';
import { useProducts } from '../../hooks/useProducts';
import { useUser } from '../../hooks/useUser';

import './home.css';

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
        <section className="home">
            <div className="container">
                <ul className="row list home__list">
                    {
                        products.map(product => {
                            return (
                                <li 
                                    className="col-6 col-md-4 col-lg-3 d-flex home__item"
                                    key={ product._id }
                                >
                                    <ProductPreview data={product} user={user} />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}

export {
    Home, 
}