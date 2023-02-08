// react
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

// my comps
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { IconClose } from '../Icon/Icon';
import { ProductForm } from '../ProductForm/ProductForm';

// my hooks
import { useEditProduct } from '../../hooks/useEditProduct';

// css
import classes from './ModalEditProduct.module.css';

function ModalEditProduct({ className, isOpen, data, closeHandler }) {
    const cn = className ? [classes.modal, className].join(' ') : classes.modal;

    const editProductMutation = useEditProduct(data._id);
    const initialValues = { 
        available: data.available || false, 
        pictures: data.pictures || "", 
        name: data.name || "", 
        price: data.price || "", 
        discount: data.discount || 0, 
        stock: data.stock || "", 
        wight: data.wight || "", 
        description: data.description || "", 
    }

    // handlers
    // 

    // Сюда нужно передать колбэк, который будет закрывать модальное окно 
    const handleClose = () => {
        if (closeHandler && typeof closeHandler === 'function') closeHandler();
    }

    // Закрывает модальное окно при нажатии на пустое пространство вокруг него 
    useEffect(() => {
        if (!isOpen) return

        const handler = (e) => {
            if (e.target.hasAttribute('data-overlay')) handleClose();
        }

        window.document.documentElement.addEventListener('click', handler);

        return () => {
            window.document.documentElement.removeEventListener('click', handler);
        }
    }, [isOpen])

    const component = (
        <>
            {
                !isOpen ? (
                    null
                ) : (
                    <div 
                        className={classes.overlay}
                        data-overlay
                    >
                        <div className={cn}>
                            <header className={classes.header}>
                                Редактирование продукта
                                <ButtonIcon
                                    className={classes.close}
                                    onClick={handleClose}
                                >
                                    <IconClose />
                                </ButtonIcon>
                            </header>
                            <div className={classes.body}>
                                <ProductForm 
                                    mutation={editProductMutation}
                                    initialValues={initialValues}
                                    onSubmit={handleClose}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )

    return createPortal(component, window.document.body);
}

export {
    ModalEditProduct, 
}