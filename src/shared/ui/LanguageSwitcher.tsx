'use client'

import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
	const { i18n } = useTranslation()

	const changeLanguage = async (lang: 'en' | 'ru') => {
		await i18n.changeLanguage(lang)
	}

	return (
		<div className='mt-4 space-x-2'>
			<button
				onClick={() => changeLanguage('en')}
				className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none'
			>
				EN
			</button>

			<button
				onClick={() => changeLanguage('ru')}
				className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none'
			>
				RU
			</button>
		</div>
	)
}
