// react
import { createPortal } from 'react-dom';

// my comps
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { IconClose } from '../Icon/Icon';

// css
import classes from './Modal.module.css';

function Modal({ className, children, isOpen, handleClose, header, ...restProps}) {
    const cn = className ? [classes.modal, className].join(' ') : classes.modal;

    const modal = (
        <>
            {
                !isOpen ? (
                    null
                ) : (
                    <div 
                        className={classes.overlay}
                        {...restProps}
                    >
                        <div className={cn}>
                            <header className={classes.header}>
                                <h2 className={classes.title}>
                                    {header}
                                </h2>
                                <ButtonIcon 
                                    className={classes.close}
                                    onClick={handleClose}
                                >
                                    <IconClose className={classes.icon} />
                                </ButtonIcon>
                            </header>
                            <div className={classes.body}>
                                {children}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );

    return createPortal(modal, window.document.body)
}

export {
    Modal, 
}