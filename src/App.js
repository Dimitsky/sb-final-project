// react router dom
import { Routes, Route } from 'react-router-dom';

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// pages
import { Layout } from './components/Layout/Layout';
import { Home } from './Pages/Home/Home';
import { ProductPage } from './Pages/ProductPage/ProductPage';
import { Profile } from './Pages/Profile/Profile';
import { EditUser } from './Pages/EditUser/EditUser';
import { SignIn } from './Pages/SignIn/SignIn';
import { SignUp } from './Pages/SignUp/SignUp';
import { Cart } from './Pages/Cart/Cart';
import { NotFound } from './Pages/NotFound';

// HOCs
import { RequireAuth } from './HOCs/RequireAuth';
import { RequireUnauth } from './HOCs/RequireUnauth';

// TEST PAGE
import { Test } from './components/Test/Test';

// TenStack Query
const queryClient = new QueryClient();

function App() {
	return (
	<>
		<QueryClientProvider client={ queryClient }>
			<ReactQueryDevtools initialIsOpen={false} />
			<Routes>
				<Route path="/" element={ <Layout /> }>
					<Route index element={ 
						<RequireAuth>
							<Home /> 
						</RequireAuth>
					} />
					<Route path="/cart" element={
						<RequireAuth>
							<Cart />
						</RequireAuth>
					} />
					<Route path="profile" element={ 
						<RequireAuth>
							<Profile />
						</RequireAuth>
					} />
					<Route path="profile/edit-user" element={ 
						<RequireAuth>
							<EditUser />
						</RequireAuth>
					} />
					<Route path="products/:id" element={ 
						<RequireAuth>
							<ProductPage />
						</RequireAuth>
					} />
					<Route path="*" element={ <NotFound /> } />
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
				
				{/* TEST ROUTE */}
				<Route path="/test" element={ <Test ratings={[ 5, 3, 5, 1, 4, 1 ]} starColor="yellow" /> } />
			</Routes>
		</QueryClientProvider>
	</>
	);
}

export default App;