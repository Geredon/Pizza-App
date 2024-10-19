import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { LoginForm } from './pages/Login/LoginForm.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { RegisterForm } from './pages/Regitster/Register.tsx';


const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));


const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout /></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Загрузка ...</>}>
					<Menu />
				</Suspense>
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/product/:id',
				element: <Product/>,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return defer({
						data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
					});
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout/>,
		children: [
			{
				path: 'login',
				element: <LoginForm/>
			},
			{
				path: 'register',
				element: <RegisterForm/>
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</React.StrictMode>
);
