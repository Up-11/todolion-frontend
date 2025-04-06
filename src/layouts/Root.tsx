import React from 'react'
import { Outlet } from 'react-router'

import { Header } from '../modules/Common/Header'
import { Sidebar } from '../modules/Common/Sidebar/ui/Sidebar'

export const RootLayout: React.FC = () => {
	return (
		<div>
			<Header />
			<Sidebar />
			<div className='mt-23 ml-[330px] mx-4'>
				<Outlet />
			</div>
		</div>
	)
}
