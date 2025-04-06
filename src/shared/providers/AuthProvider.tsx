import {
	EmailAuthCredential,
	getAuth,
	onAuthStateChanged,
	signOut,
	User
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { ROUTES } from '../../config/routes'
import { FullscreenLoader } from '../../modules/Common/Loader/FullscreenLoader'

type AuthProviderState = {
	user: User | null
	setUser: (user: User) => void
	isAuthenticatedLoading: boolean
	logout: () => void
	error: string | null
	credentials: EmailAuthCredential | null
	setCredentials: (credentials: EmailAuthCredential) => void
}

const initialState: AuthProviderState = {
	user: null,
	setUser: () => null,
	isAuthenticatedLoading: true,
	logout: () => null,
	error: null,
	credentials: null,
	setCredentials: () => null
}

export const AuthProviderContext =
	createContext<AuthProviderState>(initialState)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const auth = getAuth()
	const navigate = useNavigate()

	const [state, setState] = useState<AuthProviderState>({
		...initialState,
		user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
		credentials: JSON.parse(localStorage.getItem('credentials') || 'null')
	})

	useEffect(() => {
		localStorage.getItem('credentials')
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				localStorage.setItem('user', JSON.stringify(user))
				setState(prev => ({ ...prev, user, isAuthenticatedLoading: false }))
			} else {
				localStorage.removeItem('user')
				setState(prev => ({
					...prev,
					user: null,
					isAuthenticatedLoading: false
				}))
			}
		})
		console.log(state.user)

		return () => unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const logout = async () => {
		try {
			await signOut(auth)
			localStorage.removeItem('user')
			localStorage.removeItem('credentials')
			setState(prev => ({
				...prev,
				user: null,
				error: null,
				credentials: null
			}))
			toast.success('Выход из системы выполнен успешно!')
			navigate(ROUTES.AUTH.LOGIN)
		} catch (error) {
			toast.error(`Ошибка выхода: ${error}`)
			setState(prev => ({ ...prev, error: 'Ошибка выхода из системы' }))
		}
	}

	const setUser = (user: User) => {
		localStorage.setItem('user', JSON.stringify(user))
		setState(prev => ({ ...prev, user, error: null }))
	}

	const setCredentials = (credentials: EmailAuthCredential) => {
		localStorage.setItem('credentials', JSON.stringify(credentials))
		setState(prev => ({ ...prev, credentials }))
	}

	if (state.isAuthenticatedLoading) {
		return <FullscreenLoader />
	}

	return (
		<AuthProviderContext.Provider
			value={{ ...state, setUser, logout, setCredentials }}
		>
			{children}
		</AuthProviderContext.Provider>
	)
}
