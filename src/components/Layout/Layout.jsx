import { Outlet } from "react-router-dom";

import { Nav } from '../Nav/Nav';

function Layout() {
    return (
        <>
            <header>
                <div className="container-fluid">
                    <Nav />
                </div>
            </header>
            <Outlet />
        </>
    );
}

export {
    Layout
}