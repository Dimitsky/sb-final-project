// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// my comps
import { Header } from '../../components/Header/Header';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartLink } from '../../components/CartLink/CartLink';
import { Logo } from '../../components/Logo/Logo';

import { Button } from '../../components/Button/Button';

// my hooks
import { useAddProduct } from '../../hooks/useAddProduct';

// css 
import classes from './AddProductPage.module.css';

function AddProductPage({}) {
    const addProductMutation = useAddProduct();
    const formik = useFormik( {
        initialValues: { 
            available: true, 
            pictures: "", 
            name: "", 
            price: "", 
            discount: 0, 
            stock: "", 
            wight: "", 
            description: "", 
        },
        validationSchema: Yup.object().shape({
            pictures: Yup.string().url('Неверный формат url!').required('Необходимо заполнить'), 
            name: Yup.string().max(100, 'Максимальная длина – 100 символов').required('Необходимо заполнить'), 
            price: Yup.number().min(1, 'Не меньше одного').required('Необходимо заполнить'), 
            discount: Yup.number().min(0, 'Не меньше нуля').required('Необходимо заполнить'), 
            stock: Yup.number().min(0, 'Не меньше нуля').required('Необходимо заполнить'), 
            wight: Yup.string().required('Необходимо заполнить'), 
            description: Yup.string().required('Необходимо заполнить'), 
        }), 
        onSubmit: addProductMutation.mutate, 
    } );

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
                <form 
                    className={classes.form}
                    onSubmit={formik.handleSubmit}
                >
                    <div className={classes.box}>
                        <label 
                            className={classes.label}
                            htmlFor="available"
                        >
                            Товар в наличии
                        </label>
                        <input 
                            className={classes.checkbox}
                            type="checkbox"
                            name="available"
                            id="available"
                            checked={formik.values.available}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={classes.box}>
                        <label 
                            className={classes.label}
                            htmlFor="pictures"
                        >
                            Изображение <span className={classes.danger}>*</span>
                        </label>
                        <input 
                            className={classes.input}
                            type="url"
                            name="pictures"
                            id="pictures"
                            placeholder="url адрес изображения"
                            value={formik.values.pictures}
                            onChange={formik.handleChange}
                        />
                        { formik.errors.pictures ? <div className={[classes.error, 'error'].join(' ')}>{ formik.errors.pictures }</div> : null }
                    </div>
                    <div className={classes.box}>
                        <label 
                            className={classes.label}
                            htmlFor="name"
                        >
                            Наименование <span className={classes.danger}>*</span>
                        </label>
                        <input 
                            className={classes.input}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Наименование товара"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        { formik.errors.name ? <div className={[classes.error, 'error'].join(' ')}>{ formik.errors.name }</div> : null }
                    </div>
                    <div className={classes.box}>
                        <label 
                            className={classes.label}
                            htmlFor="price"
                        >
                            Цена <span className={classes.danger}>*</span>
                        </label>
                        <input 
                            className={classes.input}
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Стоимость товара"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                        />
                        { formik.errors.price ? <div className={[classes.error, 'error'].join(' ')}>{ formik.errors.price }</div> : null }
                    </div>
                    <div className={classes.box}>
                        <label 
                            className={classes.label}
                            htmlFor="discount"
                        >
                            Скидка
                        </label>
                        <input 
                            className={classes.input}
                            type="number"
                            name="discount"
                            id="discount"
                            placeholder="Скидка в процентах"
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                        />
                        { formik.errors.discount ? <div className={[classes.error, 'error'].join(' ')}>{ formik.errors.discount }</div> : null }
                    </div>
                    <div className={classes.box}>
                        <label 
                            className={classes.label}
                            htmlFor="stock"
                        >
                            Количество <span className={classes.danger}>*</span>
                        </label>
                        <input 
                            className={classes.input}
                            type="number"
                            name="stock"
                            id="stock"
                            placeholder="Доступное количество товара"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                        />
                        { formik.errors.stock ? <div className={[classes.error, 'error'].join(' ')}>{ formik.errors.stock }</div> : null }
                    </div>
                    <div className={classes.box}>
                        <label 
                            className={classes.label}
                            htmlFor="wight"
                        >
                            Вес / штук <span className={classes.danger}>*</span>
                        </label>
                        <input 
                            className={classes.input}
                            type="text"
                            name="wight"
                            id="wight"
                            placeholder="Вес / количество в упаковке"
                            value={formik.values.wight}
                            onChange={formik.handleChange}
                        />
                        { formik.errors.wight ? <div className={[classes.error, 'error'].join(' ')}>{ formik.errors.wight }</div> : null }
                    </div>
                    <div className={classes.box}>
                        <label 
                            className={classes.label}
                            htmlFor="description"
                        >
                            Описание <span className={classes.danger}>*</span>
                        </label>
                        <textarea
                            className={classes.input}
                            name="description"
                            id="description"
                            placeholder="Доступное количество товара"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        >
                        </textarea>
                        { formik.errors.description ? <div className={[classes.error, 'error'].join(' ')}>{ formik.errors.description }</div> : null }
                    </div>
                    <div className={classes.box}>
                        <Button 
                            className={classes.submit}
                            type="submit"
                        >
                            Отправить
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export {
    AddProductPage, 
}