import { useContext } from 'react'

import { SidebarProviderContext } from '../providers/SidebarProvider'

export const useSidebar = () => {
	const context = useContext(SidebarProviderContext)

	return context
}
