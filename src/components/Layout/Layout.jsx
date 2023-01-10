// react router dom
import { Outlet } from 'react-router-dom';

// my comps
import { Header } from '../Header/Header';
import { NavBar } from '../NavBar/NavBar';
import { Search } from '../Search/Search';

function debounce(fn, ms) {
    let isCoolDown = false;

    return function () {
        if (isCoolDown) return

        fn.apply(this, arguments);
        isCoolDown = true;
        setTimeout(() => isCoolDown = false, ms);
    }
}

function Layout() {
    // handlers
    const handleSearch = promise => {
        // promise.then(result => console.log(result))
    }
    const debouncedHandleSearch = debounce(handleSearch, 500);

    return (
        <>
            <div className="container">
                <Header>
                    <Search 
                        handler={debouncedHandleSearch}
                    />
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