import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'

import { useSidebar } from '../../../../shared/hooks/useSidebar'
import { cn } from '../../../../shared/lib/css'
import { ISideBarItem } from '../../../../types/common'

import { SidebarItem } from './SidebarItem'

export const Sidebar: React.FC = () => {
	const { t } = useTranslation()
	const location = useLocation()
	const { isExpanded } = useSidebar()

	const items: ISideBarItem[] = [
		{
			text: t('sidebar.notes'),
			icon: <Lightbulb />,
			link: '/'
		}
	]

	return (
		<motion.aside
			initial={{ width: '80px' }}
			animate={{ width: isExpanded ? '300px' : '80px' }}
			transition={{ duration: 0.2 }}
			className={cn(
				'fixed inset-y-0 bg-root mt-22 rounded-3xl ml-4 mb-4 p-4 overflow-hidden'
			)}
		>
			<motion.div
				className='flex flex-col gap-1'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
			>
				{items.map(item => (
					<motion.div
						key={item.link}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.2 }}
					>
						<SidebarItem
							{...item}
							isActive={location.pathname.includes(item.link)}
							isExpanded={isExpanded}
						/>
					</motion.div>
				))}
			</motion.div>
		</motion.aside>
	)
}
