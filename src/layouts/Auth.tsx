import React from 'react'
import { Outlet } from 'react-router'

import LanguageSwitcher from '../shared/ui/LanguageSwitcher'
import { ThemeSwitcher } from '../shared/ui/ThemeSwitcher'

export const AuthLayout: React.FC = () => {
	return (
		<div>
			<div className='flex gap-1 justify-center items-center fixed top-2 right-2'>
				<ThemeSwitcher />
				<LanguageSwitcher />
			</div>
			<Outlet />
		</div>
	)
}
