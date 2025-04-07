import { AlignJustify, Grid, RefreshCcw } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useSidebar } from '../../../../shared/hooks/useSidebar'
import { AppTooltip } from '../../../../shared/ui/AppTooltip'
import { Logo } from '../../../../shared/ui/Logo'
import { ProfileMenu } from '../../../Profile'

export const Header: React.FC = () => {
	const { t } = useTranslation()
	const { toggleSidebar } = useSidebar()
	return (
		<header className='fixed inset-x-0 top-0 m-4 flex h-16 items-center justify-between rounded-3xl bg-[var(--root)] px-4'>
			<div className='flex items-center gap-3'>
				<AppTooltip text={t('header.toggleSidebar')}>
					<AlignJustify
						onClick={() => toggleSidebar()}
						size={30}
						className='cursor-pointer p-1'
					/>
				</AppTooltip>
				<Logo />
			</div>
			<div className='flex-1 flex justify-start mx-8'>
				{/* <Input
					placeholder={t('header.searchbar')}
					className='max-w-140 w-full h-11 text-2xl '
				/> */}
			</div>
			<div className='flex items-center gap-3'>
				{/* <AppTooltip text={t('header.alignment')}>
					<Grid size={30} className='cursor-pointer p-1' />
				</AppTooltip> */}

				<AppTooltip text={t('header.refresh')}>
					<RefreshCcw size={30} className='cursor-pointer p-1' />
				</AppTooltip>
				<ProfileMenu />
			</div>
		</header>
	)
}
