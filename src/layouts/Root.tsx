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
			{/* <Sidebar /> */}
			<motion.div className={cn('mt-23 mx-4')}>
				<Outlet />
			</motion.div>
		</div>
	)
}
