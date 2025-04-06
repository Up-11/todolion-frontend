import { User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../shared/components/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../../../shared/components/dropdown-menu'
import { useAuth } from '../../../shared/hooks/useAuth'
import LanguageSwitcher from '../../../shared/ui/LanguageSwitcher'
import { ThemeSwitcher } from '../../../shared/ui/ThemeSwitcher'

export function ProfileMenu() {
	const { t } = useTranslation()
	const { user, logout } = useAuth()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					<User /> {t('profile.button')}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='mt-4 mr-4 w-65'>
				<DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
				{/* <EditProfileDialog>
						<button className='relative w-full flex cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-md outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent '>
							{t('profile.edit')}
						</button>
					</EditProfileDialog> */}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={e => e.preventDefault()}
					className='flex justify-between'
				>
					{t('profile.language')} <LanguageSwitcher />
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={e => e.preventDefault()}
					className='flex justify-between'
				>
					{t('profile.theme')} <ThemeSwitcher />
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logout()}>
					{t('profile.logout')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
