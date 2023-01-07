// react bootstrap
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

// my ui components
import { BackButton } from '../../components/BackButton/BackButton';
import { LikeButton } from '../../components/LikeBotton/LikeButton';
import { Price } from '../../components/Price/Price';

// custom hooks
import { useProduct } from '../../hooks/useProduct';
import { useUser } from '../../hooks/useUser';

// css
import './productpage.css';

function ProductPage() {
    const { data: product, error, status } = useProduct();
    const { data: user } = useUser();

    // handlers
    const handleLike = () => {}

    if ( status === 'loading') {
        return (
            <Container>
                Загрузка...
            </Container>
        );
    }

    if ( status === 'error' ) {
        return (
            <Container>
                { error.message }
            </Container>
        );
    }
    
    return (
        <Container>
            <Card className="detailed-card">
                <Card.Header className="detailed-card__header">
                    <BackButton />
                    <LikeButton 
                        className="detailed-card__like-btn"
                        isLiked={product.likes.find(id => id === user._id)}
                        handler={handleLike}
                    />
                </Card.Header>
                <Card.Img 
                    className="detailed-card__img"
                    variant="top"
                    src={product.pictures}
                />
                <Card.Body className="detailed-card__body">
                    <Card.Title className="detailed-card__title">
                        {product.name}
                    </Card.Title>
                </Card.Body>
            </Card>
        </Container>
    );
}

export {
    ProductPage, 
}