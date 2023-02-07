// my comps
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { IconCancelSquare, IconCheckSquare } from '../Icon/Icon';

// css
import classes from './ConfirmDialog.module.css';

function ConfirmDialog({ className, confirmHandler, cancelHandler, text, ...restProps }) {
    const cn = className ? [classes.confirm, className].join(' ') : classes.confirm;

    // handlers
    // 

    // Управляет отменой 
    const handleCancel = () => {
        if (cancelHandler && typeof cancelHandler === 'function') cancelHandler();
    }
    
    // Управляет подтверждением  
    const handleConfirm = () => {
        if (confirmHandler && typeof confirmHandler === 'function') confirmHandler();
    }

    return (
        <div className={cn}>
            <p className={classes.text}>
                {
                    text || null
                }
            </p>
            <ButtonIcon
                className={[classes.button, classes.cancelButton].join(' ')}
                onClick={handleCancel}
                >
                <IconCancelSquare className={classes.cancelIcon} />
                Отмена
            </ButtonIcon>
            <ButtonIcon
                className={[classes.button, classes.confirmButton].join(' ')}
                onClick={handleConfirm}
            >
                <IconCheckSquare className={classes.confirmIcon} />
                Подтвердить
            </ButtonIcon>
        </div>
    )
}

export {
    ConfirmDialog, 
}