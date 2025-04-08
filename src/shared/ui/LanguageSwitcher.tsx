'use client'

import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '../components/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../components/dropdown-menu'

export default function LanguageSwitcher() {
	const { i18n, t } = useTranslation()

	const changeLanguage = async (lang: 'en' | 'ru') => {
		await i18n.changeLanguage(lang)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<Languages className='absolute h-[1.2rem] w-[1.2rem]   transition-all' />
					<span className='sr-only'>{t('profile.changeLanguage')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => changeLanguage('ru')}>
					Русский
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => changeLanguage('en')}>
					English
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
