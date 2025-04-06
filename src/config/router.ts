import { createBrowserRouter } from 'react-router'

import ErrorPage from '../404'
import App from '../App'
import { AuthLayout } from '../layouts/Auth'
import { RootLayout } from '../layouts/Root'
import { AuthorizedPages } from '../modules/Auth'
import { UnAuthorizedPages } from '../modules/Auth/Protected'
import { IndexPage } from '../pages/Index'
import { LoginPage } from '../pages/Login'
import { RegisterPage } from '../pages/Register'

import { ROUTES } from './routes'

export const router = createBrowserRouter([
	{
		Component: App,
		children: [
			{
				Component: AuthorizedPages,
				children: [
					{
						Component: RootLayout,
						children: [
							{
								index: true,
								path: ROUTES.INDEX,
								Component: IndexPage
							}
						]
					}
				]
			},
			{
				Component: UnAuthorizedPages,
				children: [
					{
						Component: AuthLayout,
						children: [
							{
								path: ROUTES.AUTH.LOGIN,
								Component: LoginPage
							},
							{
								path: ROUTES.AUTH.REGISTER,
								Component: RegisterPage
							}
						]
					}
				]
			}
		]
	},
	{
		path: '*',
		Component: ErrorPage
	}
])
