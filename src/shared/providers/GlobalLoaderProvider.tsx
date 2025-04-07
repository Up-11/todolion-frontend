import { createContext, PropsWithChildren, useState } from 'react'

interface GlobalLoaderContextState {
	isGlobalLoading: boolean
	setGlobalLoading: (newState: boolean) => void
}

const initialState = {
	isGlobalLoading: true,
	setGlobalLoading: () => null
}

export const GlobalLoaderContext =
	createContext<GlobalLoaderContextState>(initialState)

export function GlobalLoaderProvider({ children }: PropsWithChildren) {
	const [isGlobalLoading, setGlobalLoading] = useState(false)

	return (
		<GlobalLoaderContext.Provider value={{ isGlobalLoading, setGlobalLoading }}>
			{children}
		</GlobalLoaderContext.Provider>
	)
}
