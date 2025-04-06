import { Lightbulb } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'

import { ISideBarItem } from '../../../../types/common'

import { SidebarItem } from './SidebarItem'

export const Sidebar: React.FC = () => {
	const { t } = useTranslation()
	const location = useLocation()

	const items: ISideBarItem[] = [
		{
			text: t('sidebar.notes'),
			icon: <Lightbulb />,
			link: '/'
		}
	]
	return (
		<aside className='w-[300px] fixed inset-y-0 bg-root mt-22 rounded-3xl ml-4 mb-4 p-4'>
			<div className='flex flex-col gap-1'>
				{items.map(item => (
					<SidebarItem
						{...item}
						key={item.link}
						isActive={location.pathname.includes(item.link)}
					/>
				))}
			</div>
		</aside>
	)
}
