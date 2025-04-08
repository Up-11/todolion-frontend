import { RefreshCcw } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobalLoading } from '../../../../shared/hooks/useGlobalLoading'
import { useNotes } from '../../../../shared/hooks/useNotes'
import { AppTooltip } from '../../../../shared/ui/AppTooltip'
import { Loader } from '../../../../shared/ui/Loader'
import { Logo } from '../../../../shared/ui/Logo'
import { ProfileMenu } from '../../../Profile'

export const Header: React.FC = () => {
	const { t } = useTranslation()
	const { isGlobalLoading } = useGlobalLoading()
	const { getNotes } = useNotes()
	return (
		<header className='fixed inset-x-0 m-4  top-0 z-50'>
			<div className='bg-background fixed inset-x-0 top-0 h-20' />
			<div className='flex relative z-20 h-16 w-full  items-center rounded-2xl bg-[var(--root)] px-4 shadow-sm'>
				<div className='flex items-center gap-4'>
					<Logo />
				</div>

				<div className='flex-1 ml-6'>
					{/*
			<Input
				placeholder={t('header.searchbar')}
				className='w-full h-10 text-lg'
				maxWidth='max-w-lg'
			/>
			*/}
				</div>

				<div className='flex items-center gap-4'>
					{isGlobalLoading ? (
						<Loader />
					) : (
						<AppTooltip text={t('header.refresh')}>
							<RefreshCcw
								onClick={getNotes}
								size={30}
								className='cursor-pointer p-1'
							/>
						</AppTooltip>
					)}

					<ProfileMenu />
				</div>
			</div>
		</header>
	)
}
