import { useContext } from 'react'

import { AuthProviderContext } from '../providers/AuthProvider'

export const useAuth = () => {
	const context = useContext(AuthProviderContext)
	if (!context) {
		throw new Error('useAuth должен использоваться внутри AuthProvider')
	}
	return context
}
