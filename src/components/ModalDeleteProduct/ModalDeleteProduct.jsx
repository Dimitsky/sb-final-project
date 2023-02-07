// react
import { createPortal } from 'react-dom';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { IconClose } from '../Icon/Icon';
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";

// react router dom
import { useNavigate } from 'react-router-dom';

// my hooks
import { useDeleteProduct } from '../../hooks/useDeleteProduct';

// css
import classes from './ModalDeleteProduct.module.css';

function ModalDeleteProduct({ className, isOpen, closeHandler, cancelHandler, confirmHandler, productId, ...restProps }) {
    const cn = className ? [classes.modal, className].join(' ') : classes.modal;

    const mutation = useDeleteProduct(productId);
    const navigate = useNavigate();

    // handlers
    // 

    // 
    const handleClose = () => {
        if (closeHandler && typeof closeHandler === 'function') closeHandler();
    }

    // 
    const handleCancelDelete = () => {
        if (cancelHandler && typeof cancelHandler === 'function') cancelHandler();
    }

    // 
    const handleConfirmDelete = () => {
        mutation.mutate();
        navigate('/');

        if (confirmHandler && typeof confirmHandler === 'function') confirmHandler();
    }

    const component = (
        <>
            {
                !isOpen ? (
                    null
                ) : (
                    <div className={classes.overlay}>
                        <div 
                            className={cn}
                            {...restProps}
                        >
                            <header className={classes.header}>
                                <h2 className={classes.title}>
                                    Удаление продукта
                                </h2>
                                <ButtonIcon
                                    className={classes.close}
                                    onClick={handleClose}
                                >
                                    <IconClose />
                                </ButtonIcon>
                            </header>
                            <div className={classes.body}>
                                <ConfirmDialog 
                                    text="Вы уверены, что хотите удалить товар? Действие нельзя будет отменить."
                                    cancelHandler={handleCancelDelete}
                                    confirmHandler={handleConfirmDelete}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );

    return createPortal(component, window.document.body);
}

export {
    ModalDeleteProduct, 
}