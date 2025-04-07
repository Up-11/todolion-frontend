import { createContext, PropsWithChildren, useEffect, useState } from 'react'

export const SidebarProviderContext = createContext({
	toggleSidebar: () => {},
	isExpanded: true
})

export function SidebarProvider({ children }: PropsWithChildren) {
	const [state, setState] = useState(true)

	const toggleSidebar = () => {
		setState(!state)
		localStorage.setItem('sidebar', JSON.stringify(!state))
	}

	useEffect(() => {
		if (localStorage.getItem('sidebar')) {
			setState(JSON.parse(localStorage.getItem('sidebar') as string))
		}
	}, [])

	const value = {
		toggleSidebar,
		isExpanded: state
	}

	return (
		<SidebarProviderContext.Provider value={value}>
			{children}
		</SidebarProviderContext.Provider>
	)
}
