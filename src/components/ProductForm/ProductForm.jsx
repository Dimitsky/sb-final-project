// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// css 
import classes from './ProductForm.module.css';

function ProductForm({ className, mutation, onSubmit, initialValues = {
    available: true, 
    pictures: "", 
    name: "", 
    price: "", 
    discount: 0, 
    stock: "", 
    wight: "", 
    description: "", 
} }) {
    const cn = className ? [classes.form, className].join(' ') : classes.form;

    const formik = useFormik( {
        initialValues,
        validationSchema: Yup.object().shape({
            pictures: Yup.string().url('Неверный формат url!').required('Необходимо заполнить'), 
            name: Yup.string().max(100, 'Максимальная длина – 100 символов').required('Необходимо заполнить'), 
            price: Yup.number().min(1, 'Не меньше одного').required('Необходимо заполнить'), 
            discount: Yup.number().min(0, 'Не меньше нуля').required('Необходимо заполнить'), 
            stock: Yup.number().min(0, 'Не меньше нуля').required('Необходимо заполнить'), 
            wight: Yup.string().required('Необходимо заполнить'), 
            description: Yup.string().required('Необходимо заполнить'), 
        }), 
        onSubmit: mutation.mutate, 
    } );

    // handlers
    // 

    // 
    const handleSubmit = (e) => {
        formik.handleSubmit(e);

        if (onSubmit && typeof onSubmit === 'function') onSubmit();
    }

    return (
        <form 
            className={cn}
            onSubmit={handleSubmit}
        >
            <label>
                <span>
                    Товар в наличии
                </span>
                <input 
                    className={classes.checkbox}
                    type="checkbox"
                    name="available"
                    id="available"
                    checked={formik.values.available}
                    onChange={formik.handleChange}
                />
            </label>
            <label>
                <span>
                    Изображение <span data-warning>*</span>
                </span>
                <input 
                    className={classes.input}
                    type="url"
                    name="pictures"
                    id="pictures"
                    placeholder="url адрес изображения"
                    value={formik.values.pictures}
                    onChange={formik.handleChange}
                />
                { formik.errors.pictures ? <div data-error>{ formik.errors.pictures }</div> : null }
            </label>
            <label>
                <span>
                    Наименование <span data-warning>*</span>
                </span>
                <input 
                    className={classes.input}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Наименование товара"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                { formik.errors.name ? <div data-error>{ formik.errors.name }</div> : null }
            </label>
            <label>
                <span>
                    Цена <span data-warning>*</span>
                </span>
                <input 
                    className={classes.input}
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Стоимость товара"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                />
                { formik.errors.price ? <div data-error>{ formik.errors.price }</div> : null }
            </label>
            <label>
                <span>
                    Скидка
                </span>
                <input 
                    className={classes.input}
                    type="number"
                    name="discount"
                    id="discount"
                    placeholder="Скидка в процентах"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                />
                { formik.errors.discount ? <div data-error>{ formik.errors.discount }</div> : null }
            </label>
            <label>
                <span>
                    Количество <span data-warning>*</span>
                </span>
                <input 
                    className={classes.input}
                    type="number"
                    name="stock"
                    id="stock"
                    placeholder="Доступное количество товара"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                />
                { formik.errors.stock ? <div data-error>{ formik.errors.stock }</div> : null }
            </label>
            <label>
                <span>
                    Вес / штук <span data-warning>*</span>
                </span>
                <input 
                    className={classes.input}
                    type="text"
                    name="wight"
                    id="wight"
                    placeholder="Вес / количество в упаковке"
                    value={formik.values.wight}
                    onChange={formik.handleChange}
                />
                { formik.errors.wight ? <div data-error>{ formik.errors.wight }</div> : null }
            </label>
            <label>
                <span>
                    Описание <span data-warning>*</span>
                </span>
                <textarea
                    className={classes.input}
                    name="description"
                    id="description"
                    placeholder="Доступное количество товара"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                >
                </textarea>
                { formik.errors.description ? <div data-error>{ formik.errors.description }</div> : null }
            </label>
            <div className={classes.submitWrap}>
                <button 
                    className={classes.submit}
                    type="submit"
                >
                    Отправить
                </button>
            </div>
        </form>
    )
}

export {
    ProductForm, 
}