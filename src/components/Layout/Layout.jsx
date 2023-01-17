// react router dom
import { Outlet } from 'react-router-dom';

// my comps
import { Header } from '../Header/Header';
import { NavBar } from '../NavBar/NavBar';
import { Search } from '../Search/Search';

function Layout() {
    return (
        <>
            <Header>
                <Search />
                <NavBar />
            </Header>
            <Outlet />
        </>
    );
}

export {
    Layout, 
}