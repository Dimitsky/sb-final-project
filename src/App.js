// react router dom
import { Routes, Route } from 'react-router-dom';

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// pages
import { Template } from './components/Template/Template';
import { HomePage } from './Pages/HomePage/HomePage';
import { DetailProductPage } from './Pages/DetailProductPage/DetailProductPage';
import { ProfilePage } from './Pages/ProfilePage/ProfilePage';
import { EditUserPage } from './Pages/EditUserPage/EditUserPage';
import { SignIn } from './Pages/SignIn/SignIn';
import { SignUp } from './Pages/SignUp/SignUp';
import { CartPage } from './Pages/CartPage/CartPage';
import { FavoritesPage } from './Pages/FavoritesPage/FavoritesPage';
import { AddProductPage } from './Pages/AddProductPage/AddProductPage';
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
					<Template />
				}>
					<Route path="/" element={ 
						<RequireAuth>
							<HomePage /> 
						</RequireAuth>
					} />
					<Route path="/favorites" element={
						<RequireAuth>
							<FavoritesPage />
						</RequireAuth>
					} />
					<Route path="/profile" element={ 
							<RequireAuth>
								<ProfilePage />
							</RequireAuth>
					} />
					<Route path="/profile/edit-user" element={ 
						<RequireAuth>
							<EditUserPage />
						</RequireAuth>
					} />
					<Route path="/cart" element={
						<RequireAuth>
								<CartPage />
							</RequireAuth>
					} />
					<Route path="/:id" element={ 
						<RequireAuth>
								<DetailProductPage />
							</RequireAuth>
					} />
					<Route path="/add_product" element={
						<RequireAuth>
							<AddProductPage />
						</RequireAuth>
					} />
				</Route>
				
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
				<Route path="*" element={ <NotFound /> } />
			</Routes>
		</QueryClientProvider>
	</>
	);
}

export default App;