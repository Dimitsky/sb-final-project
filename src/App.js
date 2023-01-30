// react router dom
import { Routes, Route } from 'react-router-dom';

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// pages
import { Home } from './Pages/Home/Home';
import { DetailProductPage } from './Pages/DetailProductPage/DetailProductPage';
import { Profile } from './Pages/Profile/Profile';
import { EditUser } from './Pages/EditUser/EditUser';
import { SignIn } from './Pages/SignIn/SignIn';
import { SignUp } from './Pages/SignUp/SignUp';
import { Cart } from './Pages/Cart/Cart';
import { FavoritesPage } from './Pages/FavoritesPage/FavoritesPage';
import { NotFound } from './Pages/NotFound';

// HOCs
import { RequireAuth } from './HOCs/RequireAuth';
import { RequireUnauth } from './HOCs/RequireUnauth';

// TenStack Query
const queryClient = new QueryClient();

function App() {
	return (
	<>
		<QueryClientProvider client={ queryClient }>
			<ReactQueryDevtools initialIsOpen={false} />
			<Routes>
				<Route path="/" element={ 
						<RequireAuth>
							<Home /> 
						</RequireAuth>
				} />
				<Route path="/:id" element={ 
						<RequireAuth>
							<DetailProductPage />
						</RequireAuth>
				} />
				<Route path="/cart" element={
						<RequireAuth>
							<Cart />
						</RequireAuth>
				} />
				<Route path="/profile/edit-user" element={ 
						<RequireAuth>
							<EditUser />
						</RequireAuth>
				} />
				<Route path="/profile" element={ 
						<RequireAuth>
							<Profile />
						</RequireAuth>
				} />
				<Route path="/signin" element={ 
					<RequireUnauth>
						<SignIn /> 
					</RequireUnauth>
				} />
				<Route path="/signup" element={ 
					<RequireUnauth>
						<SignUp /> 
					</RequireUnauth>
				} />
				<Route path="/favorites" element={
					<RequireAuth>
						<FavoritesPage />
					</RequireAuth>
				} />
				<Route path="*" element={ <NotFound /> } />
			</Routes>
		</QueryClientProvider>
	</>
	);
}

export default App;