import { I18nextProvider } from 'react-i18next'
import { Header } from './modules/common/header'
import { ThemeProvider } from './shared/providers/ThemeProvider'
import i18n from './i18n/i18n'

function App() {
	return (
		<ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
			<I18nextProvider i18n={i18n}>
				<Header />
				<main className='mt-20 mx-4'>123</main>
			</I18nextProvider>
		</ThemeProvider>
	)
}

export default App
