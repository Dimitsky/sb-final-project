// react router dom
import { useNavigate} from 'react-router-dom';

// my comps
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { IconArrowLeft } from '../Icon/Icon';

// css
import classes from './BackButton.module.css';

function BackButton( { className, handler, text, to = -1 } ) {
    const navigate = useNavigate();

    const cn = className ? [ classes.back, className ].join( ' ' ) : classes.back;

    const go = () => navigate(to);
    const handleClick = () => {
        go();

        if ( handler && typeof handler === 'function' ) handler();
    }

    return (
        <ButtonIcon 
            className={ cn }
            onClick={ handleClick }
        >
            <IconArrowLeft className={classes.icon}/>
            {text ? text : null}
        </ButtonIcon>
    );
}


export {
    BackButton, 
}