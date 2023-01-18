// my comps
import { Logo } from '../Logo/Logo';
import { GlassBox } from '../GlassBox/GlassBox';
import { NavBar } from '../NavBar/NavBar';

// css module
import classes from './Header.module.css';

function Header({ children }) {
    return (
        <GlassBox className={classes.wrap}>
            <header className={classes.header}>
                <Logo />
                {children}
                <NavBar />
            </header>
        </GlassBox>
    );
}

export {
    Header, 
}