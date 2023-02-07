// react router dom
import { Outlet } from 'react-router-dom';

// css
import classes from './Template.module.css';

function Template() {
    const cn = [classes.template, "container"].join(' ');

    return (
        <div className={cn}>
            <Outlet />
        </div>
    )
}

export {
    Template, 
}