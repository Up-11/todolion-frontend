import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Outlet, useNavigation } from 'react-router'

import i18n from './i18n/i18n'
import { FullscreenLoader } from './modules/Common/Loader/FullscreenLoader'
import { Toaster } from './shared/components/sonner'
import { TooltipProvider } from './shared/components/tooltip'
import { AuthProvider } from './shared/providers/AuthProvider'
import { GlobalLoaderProvider } from './shared/providers/GlobalLoaderProvider'
import { NotesProvider } from './shared/providers/NotesProvider'
import { SidebarProvider } from './shared/providers/SidebarProvider'
import { ThemeProvider } from './shared/providers/ThemeProvider'
import { PagesListTest } from './shared/utils/PagesList.test'

function App() {
	const navigation = useNavigation()
	const isNavigating = Boolean(navigation.location)
	const [isAppLoaded, setIsAppLoaded] = useState(false)

	useEffect(() => {
		const loadApp = async () => {
			setIsAppLoaded(true)
		}

		loadApp()
	}, [])

	if (!isAppLoaded) {
		return <FullscreenLoader />
	}

	return (
		<ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
			<I18nextProvider i18n={i18n}>
				<TooltipProvider>
					<AuthProvider>
						<SidebarProvider>
							<GlobalLoaderProvider>
								<NotesProvider>
									{isNavigating && <FullscreenLoader />}
									<Outlet />
								</NotesProvider>
							</GlobalLoaderProvider>
						</SidebarProvider>
					</AuthProvider>
					<Toaster position='bottom-center' richColors />
				</TooltipProvider>
			</I18nextProvider>
		</ThemeProvider>
	)
}
export default App
