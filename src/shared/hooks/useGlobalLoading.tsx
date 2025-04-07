import { useContext } from 'react'

import { GlobalLoaderContext } from '../providers/GlobalLoaderProvider'

export const useGlobalLoading = () => {
	const context = useContext(GlobalLoaderContext)
	return context
}
