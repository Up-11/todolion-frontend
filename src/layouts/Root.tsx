import { motion } from 'framer-motion'
import React from 'react'
import { Outlet } from 'react-router'

import { Header } from '../modules/Common/Header'
import { Sidebar } from '../modules/Common/Sidebar/ui/Sidebar'
import { useSidebar } from '../shared/hooks/useSidebar'
import { cn } from '../shared/lib/css'

export const RootLayout: React.FC = () => {
	const { isExpanded } = useSidebar()

	return (
		<div>
			<Header />
			<Sidebar />
			<motion.div
				initial={{ marginLeft: '100px' }}
				animate={{ marginLeft: isExpanded ? '330px' : '100px' }}
				transition={{ duration: 0.2 }}
				className={cn('mt-23 mx-4')}
			>
				<Outlet />
			</motion.div>
		</div>
	)
}
