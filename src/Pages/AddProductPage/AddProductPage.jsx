// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// my comps
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
            discount: "", 
            stock: "", 
            wight: "", 
            description: "", 
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Необходимо заполнить'), 
            price: Yup.string().required('Необходимо заполнить').min(1, 'Не меньше одного'), 
            discount: Yup.string().min(1, 'Не меньше одного, Либо оставьте поле пустым'), 
            stock: Yup.string().min(0, 'Не меньше нуля'), 
            description: Yup.string().required('Необходимо заполнить'), 
        }), 
        onSubmit: addProductMutation.mutate, 
    } );

    return (
        <>
            <form 
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
                        Изображение
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
                </div>
                <div className={classes.box}>
                    <label 
                        className={classes.label}
                        htmlFor="name"
                    >
                        Наименование
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
                    { formik.errors.name ? <div className={classes.error}>{ formik.errors.name }</div> : null }
                </div>
                <div className={classes.box}>
                    <label 
                        className={classes.label}
                        htmlFor="price"
                    >
                        Цена
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
                    { formik.errors.price ? <div className={classes.error}>{ formik.errors.price }</div> : null }
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
                    { formik.errors.discount ? <div className={classes.error}>{ formik.errors.discount }</div> : null }
                </div>
                <div className={classes.box}>
                    <label 
                        className={classes.label}
                        htmlFor="stock"
                    >
                        Количество
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
                    { formik.errors.stock ? <div className={classes.error}>{ formik.errors.stock }</div> : null }
                </div>
                <div className={classes.box}>
                    <label 
                        className={classes.label}
                        htmlFor="wight"
                    >
                        Вес / штук
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
                </div>
                <div className={classes.box}>
                    <label 
                        className={classes.label}
                        htmlFor="description"
                    >
                        Описание
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
                    { formik.errors.stock ? <div className={classes.error}>{ formik.errors.stock }</div> : null }
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
        </>
    )
}

export {
    AddProductPage, 
}