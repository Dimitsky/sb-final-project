import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';
import { NavBar } from '../NavBar/NavBar';

function Layout() {
    return (
        <>
            <div className="container">
                <Header>
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