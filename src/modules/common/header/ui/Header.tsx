import React from 'react'
import { ProfileMenu } from '../../../profile'

export const Header: React.FC = () => {
	return (
		<header className='fixed inset-x-0 top-0 m-4 flex h-16 items-center justify-between rounded-3xl bg-[var(--root)] px-4'>
			<h1 className='cursor-default text-2xl font-bold'>TodoLion</h1>
			<ProfileMenu />
		</header>
	)
}
