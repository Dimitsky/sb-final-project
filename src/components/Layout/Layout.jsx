import { Outlet } from 'react-router-dom';

import { Container } from '../Container/Container';
// import { Header } from '../Header/Header';
// import { NavBar } from '../NavBar/NavBar';

function Layout() {
    return (
        <>
            <Container>
                {/* <Header>
                    <NavBar />
                </Header> */}
            </Container>
            <Outlet />
        </>
    );
}

export {
    Layout
}