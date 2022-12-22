import { useQuery } from '@tanstack/react-query';

import { Container } from '../../components/Container/Container';
import { ProductPreview } from '../../components/ProductPreview/ProductPreview';
import classes from './Home.module.css';
import { useAuth } from '../../components/Auth/Auth';
import { Api } from '../../components/Api/Api';
import { SERVER_GROUP_NAME, BASE_SERVER_URL } from '../../components/consts/consts';

function Home() {
    const { auth } = useAuth();

    const api = new Api( {
                baseUrl: BASE_SERVER_URL, 
                groupId: SERVER_GROUP_NAME, 
                headers: {
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${auth}`, 
                }
    } );

    // TanStack Query
    const { isLoading, isError, data, error } = useQuery( { queryKey: [ 'products' ], queryFn: () => api.getProducts() } );
    
    if ( isError ) return (
        <Container>
            { error.message }
        </Container>
    );
    
    if ( isLoading ) return (
        <Container>
            <p>
                Идет загрузка...
            </p>
        </Container>
    ); 
    
    return (
        <Container>
            <ul className={ classes.list }>
                {
                    data.products.map( product => {
                        return (
                            <li key={ product._id }>
                                <ProductPreview data={ product } />
                            </li>
                        );
                    } )
                }
            </ul>
        </Container>
    );
}

export {
    Home, 
}