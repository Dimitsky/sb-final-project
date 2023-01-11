// react router dom
import { Outlet } from 'react-router-dom';

// my comps
import { Header } from '../Header/Header';
import { NavBar } from '../NavBar/NavBar';
import { Search } from '../Search/Search';

function Layout() {
    return (
        <>
            <div className="container">
                <Header>
                    <Search />
                    <NavBar />
                </Header>
            </div>
            <Outlet />
        </>
    );
}

export {
    Layout
}