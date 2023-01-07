import Container from 'react-bootstrap/Container';
import { ProductPreview } from '../../components/ProductPreview/ProductPreview';
import { useProducts } from '../../hooks/useProducts';
// import { useUser } from '../../hooks/useUser';

import './home.css';

function Home() {
    const { data: products, error, status: productsStatus } = useProducts();
    // const { data: user, status: userstatus } = useUser();
    const user = {};
    
    if (productsStatus === 'loading') return (
        <Container>
            <p>
                Идет загрузка...
            </p>
        </Container>
    ); 

    if (productsStatus === 'error') return (
        <Container>
            {error.message}
        </Container>
    ); 
    
    return ( 
        <section className="home">
            <Container 
                className=""
                fluid
            >
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
            </Container>
        </section>
    );
}

export {
    Home, 
}