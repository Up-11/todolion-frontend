import React from 'react'
import { Navigate, Outlet } from 'react-router'

import { ROUTES } from '../../config/routes'
import { useAuth } from '../../shared/hooks/useAuth'

export const AuthorizedPages: React.FC = () => {
	const { user } = useAuth()
	return user ? <Outlet /> : <Navigate to={ROUTES.AUTH.LOGIN} />
}

export const UnAuthorizedPages: React.FC = () => {
	const { user } = useAuth()
	return !user ? <Outlet /> : <Navigate to={ROUTES.INDEX} />
}
