import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { Home } from './Pages/Home';
import { Catalog } from './Pages/Catalog';
import { Cart } from './Pages/Cart';
import { Favourites } from './Pages/Favourites';
import { Profile } from './Pages/Profile';
import { SignIn } from './Pages/SignIn';
import { NotFound } from './Pages/NotFound';

import { AuthProvider } from './components/Auth/Auth';
import { RequireAuth } from './hoc/RequireAuth';
import { RequireUnauth } from './hoc/RequireUnauth';

function App() {
	return (
	<>
		<AuthProvider>
			<Routes>
				<Route path="/" element={ <Layout /> }>
					<Route index element={ 
						<RequireAuth>
							<Home /> 
						</RequireAuth>
					} />
					<Route path="catalog" element={ 
						<RequireAuth>
							<Catalog /> 
						</RequireAuth>
					} />
					<Route path="cart" element={ 
						<RequireAuth>
							<Cart /> 
						</RequireAuth>
					} />
					<Route path="favourites" element={ 
						<RequireAuth>
							<Favourites />
						</RequireAuth>
					} />
					<Route path="profile" element={ 
						<RequireAuth>
							<Profile />
						</RequireAuth>
					} />
					<Route path="signup" element={ 
						<RequireUnauth>
							<SignIn needSignUp={ true } /> 
						</RequireUnauth>
					} />
					<Route path="signin" element={ 
						<RequireUnauth>
							<SignIn /> 
						</RequireUnauth>
					} />
					<Route path="*" element={ <NotFound /> } />
				</Route>
			</Routes>
		</AuthProvider>
	</>
	);
}

export default App;