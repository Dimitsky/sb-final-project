// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// my comps
import { Header } from '../../components/Header/Header';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartLink } from '../../components/CartLink/CartLink';
import { Logo } from '../../components/Logo/Logo';
import { ProductForm } from '../../components/ProductForm/ProductForm';

import { Button } from '../../components/Button/Button';

// my hooks
import { useAddProduct } from '../../hooks/useAddProduct';

// css 
import classes from './AddProductPage.module.css';

function AddProductPage({}) {
    const addProductMutation = useAddProduct();

    return (
        <>
            <Header>
                <BackButton text="Назад" />
                <Logo />
                <CartLink />
            </Header>
            <div className={classes.wrapper}>
                <h2 className={classes.title}>
                    Добавьте новый товар в магазин 
                </h2>
                <ProductForm 
                    mutation={addProductMutation}
                />
            </div>
        </>
    )
}

export {
    AddProductPage, 
}