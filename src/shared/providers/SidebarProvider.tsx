import { createContext, PropsWithChildren, useState } from 'react'

export const SidebarProviderContext = createContext({
	toggleSidebar: () => {},
	state: false
})

export function SidebarProvider({ children }: PropsWithChildren) {
	const [state, setState] = useState(false)

	const value = {
		toggleSidebar: () => setState(!state),
		state
	}

	return (
		<SidebarProviderContext.Provider value={value}>
			{children}
		</SidebarProviderContext.Provider>
	)
}
