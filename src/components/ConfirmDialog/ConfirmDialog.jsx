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
            <button
                className={[classes.button, classes.cancelButton].join(' ')}
                onClick={handleCancel}
                >
                Отмена
            </button>
            <button
                className={[classes.button, classes.confirmButton].join(' ')}
                onClick={handleConfirm}
            >
                Подтвердить
            </button>
        </div>
    )
}

export {
    ConfirmDialog, 
}